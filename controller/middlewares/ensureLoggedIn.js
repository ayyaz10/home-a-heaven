const { signedCookies } = require("cookie-parser");
const { getAllProducts, getAllCategories } = require('../../db/queries');

async function ensureLoggedIn(req, res, next) {
    if(!req.signedCookies.user_id) {
              // const products = await getAllProducts();
      const categories = await getAllCategories();
      res.render('404', {
        // products,
        categories
      })
        // res.status(401);
        // next(new Error('Un-Authorized'))
    } else {
        next();
    }
}

module.exports = ensureLoggedIn;