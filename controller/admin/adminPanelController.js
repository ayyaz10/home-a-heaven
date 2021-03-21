const db = require('../../db/db');
const { createProduct, getAllProducts } = require('../../db/queries');



const adminPanelController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      console.log(products.length)
      res.render('admin-panel', {
        products
      });
    },
    async product (req, res) {
      const { productname, productprice, stockcount, productcategory, description } = req.body;
      const product = {
        // user_id: 1,
        admin_id: 1,
        product_name: productname,
        price: productprice,
        inStock: stockcount,
        image: 'product.png',
        discount: '0',
        product_category: productcategory,
        product_description: description,
        created_on: new Date()
      }
      console.log(productcategory)
      // console.log(productcategory)
      // not workign
      // const productCategory = {
      //   // product_id: 1,
      //   product_category: productcategory,
      //   image: 'product.png',
      //   created_on: new Date()
      // }
      const dbProduct = await createProduct(product)
        // console.log(dbProduct)
    }
  }
}

module.exports = adminPanelController;