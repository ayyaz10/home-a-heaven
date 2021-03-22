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
      // console.log(productcategory)
      // console.log(productcategory)
      // not workign
      // const productCategory = {
      //   // product_id: 1,
      //   product_category: productcategory,
      //   image: 'product.png',
      //   created_on: new Date()
      // }
      const dbProduct = await createProduct(productObj, productCategoryObj)
        // console.log(dbProduct)
    }
  }
}

module.exports = adminPanelController;