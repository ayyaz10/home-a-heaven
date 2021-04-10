const {
    getPlacedOrders,
    getAllCategories,
    updateProfile,
    getOneByEmail,
    getOneById,
    getOneByPassword,
    getfirstName,
    getLastName,
    getPlacedOrdersItems,
    updateStatus,
    getOrders,
} = require('../../db/queries');
const bcrypt = require('bcryptjs');

function isValidUser(obj) {
    if(obj.firstName && obj.lastName) {
        const validFirstName = typeof obj.firstName == 'string' && obj.firstName.trim() != '';
        const validLastName = typeof obj.lastName == 'string' && obj.lastName.trim() != '';
        return validFirstName && validLastName;
    }

    if(obj.email) {
        const validEmail = typeof obj.email == 'string' && obj.email.trim() != '';
        return validEmail;
    }

    if(obj.newPassword) {
        const validPassword = typeof obj.newPassword == 'string' && obj.newPassword.trim() != '' && obj.newPassword.trim().length >= 6;
        return validPassword;
    }
    
    if(obj.newPhone) {
        const validPhone = typeof obj.newPhone == 'string' && obj.newPhone.trim() != '';
        return validPhone;
    }
}

const accountController = () => {
    return {
        async index (req, res) {
            const categories = await getAllCategories();
            const userId = JSON.parse(req.signedCookies.user_info).user_id;
            const user = await getOneById(userId)
            res.render('user-account', {
                categories,
                user
            })
        },
        async editProfile (req, res, next) {
            const { firstName, lastName, email, currentPassword, newPassword, newPhone } = req.body;
            const userId = JSON.parse(req.signedCookies.user_info).user_id;
            // creating object to check user data validity
            const nameObj = { firstName, lastName }
            const emailObj = { email }
            const phoneObj = { newPhone }
            // validating phone
            if(isValidUser(phoneObj)) {
                const userData = { newPhone, userId }
                try {
                    const user = await updateProfile(userData);
                    res.json({
                        isUpdated: true,
                        message: "Profile Updated",
                    })
                } catch(error) {
                    console.error(error)
                }
            }
            // validating password
            const passwordObj = { newPassword }
            if(isValidUser(passwordObj)) {
                // hashing new password first
                bcrypt.genSalt(10, async (err, salt) => {
                    bcrypt.hash(newPassword, salt, async (err, hash) => {
                        // storing new password hash into the database
                        const userData = { hash, userId }
                        try {
                            const user = await updateProfile(userData);
                            res.json({
                                isUpdated: true,
                                message: "Profile Updated",
                                user: {
                                    first_name: user.first_name
                                }
                            })
                        } catch(error) {
                            console.error(error);
                            res.json({
                                isUpdated: false,
                                message: "Unable to update",
                            })
                        }

                    } )
                })
            }

            // checking whether current password is correct or not
            try {
                if(currentPassword) {
                    const user = await getOneById(userId)
                    // console.log(user.password)
                    bcrypt.compare(currentPassword, user.password, function(err, bcRes) {
                        res.json({
                            isMatched: bcRes,
                        })
                    });
                }
            } catch (error) {
                console.error(error);
            }


            // code for firstName and lastName update
            if(isValidUser(nameObj)) {
                const userData = {
                    firstName,
                    lastName,
                    userId
                } 
                try {
                    const user = await updateProfile(userData)
                    res.json({
                        isUpdated: true,
                        message: "Account Updated",
                        user: {
                            firstName: user.first_name,
                            lastName: user.last_name
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            }

            // code for email update
            if(isValidUser(emailObj)) {
                const existingEmail = await getOneByEmail(email)
                // console.log(existingEmail)
                if(!existingEmail) {
                    const userData = { email, userId }
                    try {
                        const user = await updateProfile(userData);
                        res.json({
                            isUpdated: true,
                            message: "Profile Updated",
                            user: {
                                email: user.email
                            }
                        })
                    } catch (error) {
                        console.error(error);
                    }
                    // console.log(user)
                } else {
                    res.json({
                        isUpdate: false,
                        message: "Email already exists",
                    })
                }
            }
        },
        // async editEmail (req, res) {
        //     const { email } = req.body;
        //     if(isValidUser(email)) {
        //         const userId = JSON.parse(req.signedCookies.user_info).user_id;
        //         const userData = {
        //             email,
        //             userId
        //         }
        //         const email = await updateEmail(userData);
        //         res.json({
        //             isUpdated: true,
        //             message: "Email Updated",
        //             user: {
        //                 email
        //             }
        //         })
        //     }
        // }
    }
}

module.exports = accountController;
