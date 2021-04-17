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
    async upload (req, res) {
      if(!req.session.fileName) {
        req.session.fileSession = {
          fileName: {},
        }
      }
      let fileSession = req.session.fileSession
      fileSession.fileName = req.file.filename
      console.log(fileSession)
      return res.json ({ status: "ok"})
    },
    async product (req, res) {
      // const { productname, productprice, stockcount, categoryname, description } = req.body;
      const { productObj, subCategory } = req.body;
      const imageName = req.session.fileSession;
      // console.log(imageName.fileName)
      // const { imageName } =;
      // console.log( req.file.)
      if(subCategory.subcategoryname) {
        const productObjs = {
          product_name: productObj.productname,
          price: productObj.productprice,
          inStock: productObj.stockcount,
          category_name: productObj.categoryname,
          sub_cat_name: productObj.subcategoryname,
          image: imageName.fileName,
          discount: '0',
          product_description: productObj.description,
          subcat_id: 0,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: imageName.fileName,
          created_at: new Date()
        }
        const subCategoryObj = {
          sub_cat_name: subCategory.subcategoryname,
        }
        const status = await createProduct(productObjs, productCategoryObj, subCategoryObj)
        // console.log
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
          image: imageName.fileName,
          discount: '0',
          product_description: productObj.description,
          created_at: new Date()
        }
        const productCategoryObj = {
          category_name: productObj.categoryname,
          image: imageName.fileName,
          created_at: new Date()
        }
        const status = await createProduct(productObjs, productCategoryObj);
        // console.log(status)
        res.json({
          isUpdated: true,
          status
        })
      }
    }
  }
}

module.exports = adminPanelController;