const {
    getAllUsers
} = require('../../db/queries');

const admin = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        console.log(req.signedCookies.user_info)
        for (let i = 0; i < users.length; i++) {
            if ((typeof req.signedCookies.user_info !== "undefined")) {
                const userId = JSON.parse(req.signedCookies.user_info).user_id;
                const userRole = JSON.parse(req.signedCookies.user_info).role;
                if (userId != users[i].user_id && userRole != 'admin') {
                    return res.redirect('/')
                } else {
                    return next();
                }
            } else {
                return res.redirect('/')
            }

        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = admin;