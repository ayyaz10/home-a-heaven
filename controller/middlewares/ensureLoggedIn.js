const { signedCookies } = require("cookie-parser");
const { getAllProducts, getAllCategories } = require('../../db/queries');

async function ensureLoggedIn(req, res, next) {
    if(!req.signedCookies.user_info) {
      res.redirect('/')
    } else {
        next();
    }
}

module.exports = ensureLoggedIn;