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
      // const { productname, productprice, stockcount, categoryname, description } = req.body;
      const { productObj, subCategory } = req.body;
      // console.log(subCategory)
      // console.log(req.body)
      // console.log(productname)
      // console.log(subCategory.subcategoryname)
      // console.log(subCategory)
      if(subCategory) {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          image: 'product.png',
          discount: '0',
          product_description: productObj.description,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: 'product.png',
          created_at: new Date()
        }
        const subCategoryObj = {
          sub_cat_name: subCategory.subcategoryname,
        }
        // console.log(subCategoryObj)
        const status = await createProduct(productObjs, productCategoryObj, subCategoryObj)
        // console.log(status)
        res.json({
          isUpdated: true,
          status
        })
      } else {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          image: 'product.png',
          discount: '0',
          product_description: productObj.description,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: 'product.png',
          created_at: new Date()
        }
        const status = await createProduct(productObjs, productCategoryObj)
        console.log(status)
        res.json({
          isUpdated: true,
          status
        })
      }
    }
  }
}

module.exports = adminPanelController;