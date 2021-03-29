const { getAllUsers } = require('../../db/queries');

const admin = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        // users.forEach(user => {
            for(let i = 0; i < users.length; i++) {
                const userId = JSON.parse(req.signedCookies.user_info).user_id;
                const userRole = JSON.parse(req.signedCookies.user_info).role;
                if(userId === users[i].user_id && userRole === 'admin') {
                    return next();
                } else {
                    res.redirect('/')
                }

            }
        // })
    } catch (error) {
        console.log(res.error)
        // return res.redirect('/')
    }
    // console.log(user)
    // console.log(req.session)
}

module.exports = admin;