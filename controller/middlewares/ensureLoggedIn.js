const { signedCookies } = require("cookie-parser");
const { getAllProducts, getAllCategories } = require('../../db/queries');

async function ensureLoggedIn(req, res, next) {
  const userId = JSON.parse(req.signedCookies.user_info).user_id;
    if(!userId) {
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