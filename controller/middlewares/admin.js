const { getAllUsers } = require('../../db/queries');

const admin = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        // console.log(users.length)
        // users.forEach(user => {

            for(let i = 0; i < users.length; i++) {
                const userId = JSON.parse(req.signedCookies.user_info).user_id;
                const userRole = JSON.parse(req.signedCookies.user_info).role;
                if(userId != users[i].user_id && userRole != 'admin') {
                    return res.redirect('/')
                } else {
                    return next();
                }

            }
        // })
    } catch (error) {
        console.error(error)
    }
}

module.exports = admin;