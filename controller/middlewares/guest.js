const { signedCookies } = require("cookie-parser");

function guest(req, res, next) {
    if(!req.signedCookies.user_id) {
        return next();
    }
    return res.redirect('/')
}

module.exports = guest