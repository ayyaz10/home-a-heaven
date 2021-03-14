const db = require('../../db/db');
const { createProduct } = require('../../db/queries');


const adminPanelController = () => {
  return {
    index (req, res) {
      res.render('admin-panel');
    },
    product (req, res) {
      const { productname, productprice, stockcount, categoryname, description } = req.body;
      const product = {
          product_name: productname,
          price: productprice,
          inStock: stockcount,
          image: 'none',
          discount: '0',
          product_category: categoryname,
          product_description: description,
          created_on: new Date()
      }
      createProduct(product)
      .then(result => {
          console.log(result)
      })
    }
  }
}

module.exports = adminPanelController;