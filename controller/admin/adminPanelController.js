const { createProduct, getAllCategories } = require('../../db/queries');

const adminPanelController = () => {
  return {
    async index (req, res) {
      const categories = await getAllCategories();
      // console.log(products)
      res.render('admin-panel', {
        categories
      });
    },
    async product (req, res) {
      const { productname, productprice, stockcount, productcategory, description } = req.body;
      const productObj = {
        product_name: productname,
        price: productprice,
        inStock: stockcount,
        image: 'product.png',
        discount: '0',
        product_description: description,
        created_at: new Date()
      }
      const productCategoryObj = {
        product_category: productcategory,
        image: 'product.png',
        created_at: new Date()
      }
      const dbProduct = await createProduct(productObj, productCategoryObj)
    }
  }
}

module.exports = adminPanelController;