const { getAllProducts, getAllCategories } = require('../../db/queries');


const productsController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      res.render('products', {
        products,
        categories
      })
    }
  }
}

module.exports = productsController;