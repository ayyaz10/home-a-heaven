const { createProduct, getAllCategories } = require('../../db/queries');

const adminPanelController = () => {
  return {
    async index (req, res) {
      // console.log(req.session.fileSession)
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
    // async upload (req, res) {
    
    //   if(!req.session.fileName) {
    //     // req.session.fileSession = "";
    //     req.session.fileSession = {
    //       fileName: {},
    //     }
    //   }
    //   // req.session.fileSession = "";
    //   let fileSession = req.session.fileSession
    //   fileSession.fileName = req.file.filename
    //   // console.log(fileSession)
    //   return res.json ({ status: "ok"})
    // },
    async product (req, res) {
      // const { productname, productprice, stockcount, categoryname, description } = req.body;
      // const { productObj, subCategory } = req.body;
      // console.log(req.file.filename)
      const productObj = JSON.parse(JSON.stringify(req.body));
      const productImage = req.files[0].filename;
      console.log(productObj)
      
      // const imageName = req.session.fileSession;
      // console.log(imageName)
      // console.log(imageName.fileName)
      // const { imageName } =;
      // console.log( req.file.)
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
        // console.log

        return res.json({
          isUpdated: true,
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
          isUpdated: true,
          status
        })
      }
    }
  }
}

module.exports = adminPanelController;