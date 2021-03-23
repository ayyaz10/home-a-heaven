const { createProduct, getAllCategories } = require('../../db/queries');

const adminPanelController = () => {
  return {
    async index (req, res) {
      const categories = await getAllCategories();
      res.render('admin-panel', {
        categories
      });
    },
    async product (req, res) {
      const { productname, productprice, stockcount, categoryname, description } = req.body;
      const productObj = {
        product_name: productname,
        price: productprice,
        inStock: stockcount,
        category_name: categoryname,
        image: 'product.png',
        discount: '0',
        product_description: description,
        created_at: new Date()
      }
      const productCategoryObj = {
        category_name: categoryname,
        image: 'product.png',
        created_at: new Date()
      }
      const status = await createProduct(productObj, productCategoryObj)
      return status;
    }
  }
}

module.exports = adminPanelController;