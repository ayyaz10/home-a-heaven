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
        return validEmail
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
            const { firstName, lastName } = req.body;
            const { email } = req.body;
            const { currentPassword } = req.body;
            console.log(currentPassword)
            const userId = JSON.parse(req.signedCookies.user_info).user_id;
            // creating object to check user data validity
            const nameObj = { firstName, lastName }
            const emailObj = { email }
            try {
                if(currentPassword) {
                    console.log('helo')
                    const user = await getOneById(userId)
                    // console.log(user.password)
                    bcrypt.compare(currentPassword, user.password, function(err, bcRes) {
                        res.json({
                            isMatched: bcRes,
                        })
                    });
                }
            } catch (error) {
                console.log(error)
            }


            // code for firstName and lastName update
            if(isValidUser(nameObj)) {
                const userData = {
                    firstName,
                    lastName,
                    userId
                }
                const user = await updateProfile(userData)
                res.json({
                    isUpdated: true,
                    message: "Account Updated",
                    user: {
                        firstName: user.first_name,
                        lastName: user.last_name
                    }
                })
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
                        console.log(error)
                    }
                    // console.log(user)
                } else {
                    res.json({
                        isUpdate: false,
                        message: "Email already exists",
                        user: {
                            email
                        }
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