const { getAllUsers } = require('../../db/queries');

const admin = async (req, res, next) => {
    try {
        const users = await getAllUsers();
        // console.log(users.length)
        // users.forEach(user => {

            for(let i = 0; i < users.length; i++) {
                // console.log(JSON.parse(req.signedCookies.user_info).user_id)
                // const userId = JSON.parse(req.signedCookies.user_info).user_id;
                // const userRole = JSON.parse(req.signedCookies.user_info).role;
                console.log(req.signedCookies.user_info)
                if((typeof req.signedCookies.user_info !== "undefined")) {
                    if(JSON.parse(req.signedCookies.user_info).user_id != users[i].user_id && JSON.parse(req.signedCookies.user_info).role != 'admin') {
                        return res.redirect('/')
                    } else {
                        return next();
                    }
                } else {
                    return res.redirect('/')
                }

            }
        // })
    } catch (error) {
        console.error(error)
    }
}

module.exports = admin;