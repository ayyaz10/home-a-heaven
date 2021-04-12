const { createProduct, getAllCategories } = require('../../db/queries');

const adminPanelController = () => {
  return {
    async index (req, res) {
      const categories = await getAllCategories();
      res.render('admin-panel', {
        categories
      });
    },
    async manageProduct (req, res) {
      const categories = await getAllCategories();
      res.render('admin-panel', {
        categories
      });
    },
    async product (req, res) {
      // const { productname, productprice, stockcount, categoryname, description } = req.body;
      const { productObj, subCategory } = req.body;
      if(subCategory.subcategoryname) {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          sub_cat_name: productObj.subcategoryname,
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
        const status = await createProduct(productObjs, productCategoryObj, subCategoryObj)
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
        const status = await createProduct(productObjs, productCategoryObj);
        res.json({
          isUpdated: true,
          status
        })
      }
    }
  }
}

module.exports = adminPanelController;