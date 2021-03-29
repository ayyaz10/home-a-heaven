const { signedCookies } = require("cookie-parser");

function guest(req, res, next) {
    // console.log(req.signedCookies.user_id)
    // const userId = JSON.parse(req.signedCookies.user_info).user_id;
    console.log(req.signedCookies.user_id)
    if(!req.signedCookies.user_id){
        return next();
    }
        return res.redirect('/')
    }

module.exports = guest;