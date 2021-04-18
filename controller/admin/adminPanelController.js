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
      const productObj = JSON.parse(JSON.stringify(req.body));
      const productImage = req.files[0].filename;
      if(productObj.subcategoryname) {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          sub_cat_name: productObj.subcategoryname,
          image: productImage,
          discount: '0',
          product_description: productObj.description,
          subcat_id: 0,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: productImage,
          created_at: new Date()
        }
        const subCategoryObj = {
          sub_cat_name: productObj.subcategoryname,
        }
        const status = await createProduct(productObjs, productCategoryObj, subCategoryObj)
        console.log(status)
        return res.json({
          isDbResponse: true,
          status
        })
      } else {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          image: productImage,
          discount: '0',
          product_description: productObj.description,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: productImage,
          created_at: new Date()
        }
        const status = await createProduct(productObjs, productCategoryObj);
        // console.log(status)
        return res.json({
          isDbResponse: true,
          status
        })
      }
    }
  }
}

module.exports = adminPanelController;