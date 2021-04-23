const { signedCookies } = require("cookie-parser");

function guest(req, res, next) {
    if(req.signedCookies.user_info) {
        return res.redirect('/')
    } else {
        console.log(req.signedCookies)
        return next();

    }
    }

module.exports = guest;