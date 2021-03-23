const db = require('../db/db');
const { getAllProducts, getAllCategories } = require('../db/queries');

const homeController = () => {
  return {
    async index (req, res) {
      // res.clearCookie('user_id');
      // console.log(req.signedCookies.user_id)
      const products = await getAllProducts();
      const categories = await getAllCategories();
      res.render('index', {
        products,
        categories
      })
    }
  }
}

module.exports = homeController;
