const { getAllProducts } = require('../../db/queries');

const productsController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      res.render('products', {
        products
      })
    }
  }
}

module.exports = productsController;