const { getAllProducts } = require('../../db/queries');
const cartController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      res.render('cart', {
        products
      })
    }
  }
}

module.exports = cartController;
