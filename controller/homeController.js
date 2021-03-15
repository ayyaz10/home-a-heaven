const db = require('../db/db');
const { getAllProducts } = require('../db/queries');

const homeController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      res.render('index', {
        products
      })
    }
  }
}

module.exports = homeController;
