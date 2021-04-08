const {
    getPlacedOrders,
    getAllCategories,
    updateName,
    getOneById,
    getPlacedOrdersItems,
    updateStatus,
    getOrders
} = require('../../db/queries');

function isValidUser(firstName, lastName) {
    const validFirstName = typeof firstName == 'string' && firstName.trim() != '';
    const validLastName = typeof lastName == 'string' && lastName.trim() != '';

    return validFirstName && validLastName;
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
        async editProfile (req, res) {
            const { firstName, lastName } = req.body;
            if(isValidUser(firstName, lastName)) {
                const userId = JSON.parse(req.signedCookies.user_info).user_id;
                const userData = {
                    firstName,
                    lastName,
                    userId
                }
                const user = await updateName(userData)
                res.json({
                    isUpdated: true,
                    message: "Account Updated",
                    user: {
                        firstName: user.first_name,
                        lastName: user.last_name
                    }
                })
            }
        }
    }
}

module.exports = accountController;