const db = require('../db/db');
const { getAllProducts } = require('../db/queries');

const homeController = () => {
  return {
    async index (req, res) {
      // res.clearCookie('user_id');
      // console.log(req.signedCookies.user_id)
      const products = await getAllProducts();
      res.render('index', {
        products
      })
    }
  }
}

module.exports = homeController;
