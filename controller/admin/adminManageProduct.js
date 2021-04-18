const { getAllCategories, getAllProducts, getOneProductById, updateProduct, deleteProduct } = require('../../db/queries');
const fs = require('fs');
const adminManageProduct = () => {
    return {
      async index (req, res) {
          const categories = await getAllCategories();
          const allProducts = await getAllProducts();
          console.log(req.session)
          res.render('manage-products', {
            categories,
            allProducts
          });
        },
      async deleteProduct (req, res) {
        const productId = req.body.productId
        const product = await getOneProductById(productId)
        fs.unlink(`public/assets/uploads/${product.image}`, (err) => {
            if(err) {
              console.error(err)
            } else {
              console.log('file deleted')
            }
        })
        try {
          const dbResponse = await deleteProduct(productId);
          res.json({
            dbResponse
          })
        } catch (error) {
          console.error(error)
          res.json({
            dbResponse,
            status: res.status(400)
          })
        }
      },
      async editProduct(req, res) {
                // console.log(req.files)
        // console.log(req.body)
        const formData = JSON.parse(JSON.stringify(req.body));
        // console.log(formData)

        const editModalProductId = req.body.editModalProductId;
        // const product = req.body.productArray;
        // const subCatId = formData.subCatId;
        if(editModalProductId) {
          const product = await getOneProductById(editModalProductId);
           res.json({
            product,
            haveProduct: true
          })
        }
        // console.log(formData)
        if(!formData.editModalProductId) {
          const productId = formData.productId;
          const subCatId = formData.subCatId;
          const oldProduct = await getOneProductById(productId)
          // if()
          // console.log(oldProduct)
console.log('helo')     
          


          // let imageFile = req.files[0].filename;
          // console.log(req.files)
          if(req.files.length) {
            fs.stat(`public/assets/uploads/${oldProduct.image}`, function (err, stats) {
              console.log(stats);//here we got all information of file in stats variable
              // if (err) {
              //     return console.error(err);
              // }
              if(typeof stats === 'undefind') {
                fs.unlink(`public/assets/uploads/${oldProduct.image}`, (err) => {
                    if(err) {
                      console.error(err)
                    } else {
                      console.log('file deleted')
                    }
                })
              } else {
                console.log('no file to delete')
              }
          });
            //  image = null
            const productObj = {
              product_name: formData.prodName,
              price: formData.prodPrice,
              image:  req.files[0].filename,
              inStock: formData.prodInStock,
              category_name: formData.prodCategory,
              sub_cat_name: formData.prodSubCategory,
              product_description: formData.prodDescription
            }
            const dbResponse = await updateProduct(productObj, productId, subCatId);
            return res.json({
              dbResponse
            })
          } else {
            const productObj = {
              product_name: formData.prodName,
              price: formData.prodPrice,
              // image:  req.files[0].filename,
              inStock: formData.prodInStock,
              category_name: formData.prodCategory,
              sub_cat_name: formData.prodSubCategory,
              product_description: formData.prodDescription
            }
            const dbResponse = await updateProduct(productObj, productId, subCatId);
            return res.json({
              dbResponse
            })
            //  image =
          }


        }
      }
  }
}

module.exports = adminManageProduct;