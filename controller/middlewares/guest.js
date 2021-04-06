const { signedCookies } = require("cookie-parser");

function guest(req, res, next) {
    // console.log(req.signedCookies.user_id)
    // const userId = JSON.parse(req.signedCookies.user_info).user_id;
    // console.log(req.signedCookies.user_id)
    // const userId = JSON.parse(req.signedCookies.user_info).user_id;
    console.log(req.signedCookies.user_info)
    if(req.signedCookies.user_info) {
        // const userId = JSON.parse(req.signedCookies.user_info).user_id;
        return res.redirect('/')
        // console.log(userId)
    } else {
        console.log(req.signedCookies)
        return next();

    }
    }

module.exports = guest;