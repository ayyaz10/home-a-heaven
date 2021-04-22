const { getAllCategories, getAllCategoriesById, getAllSubCategories, getAllProducts, getOneProductById, getOneCategoryById, getOneSubCategoryById, getProductsByCatName, updateProduct, updateCategory, updateSubCategory, deleteProduct, deleteCategory, deleteSubCategory, deleteProductByCatName, getProductsByName } = require('../../db/queries');
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
      async productCategoryIndex (req, res) {
        const categories = await getAllCategories();
        console.log(categories)
        res.render('manage-categories', {
          categories
        })
      },
      async productSubCategoryIndex (req, res) {
        const subCategories = await getAllSubCategories();
        const categoryArray = [];
        for(let i = 0; i < subCategories.length; i++) {
          categoryArray.push(await getAllCategoriesById(subCategories[i].cat_id))
        }
        const categories = await getAllCategories();
        res.render('manage-sub-categories', {
          categories,
          subCategories,
          categoryArray
        })
      },
      async deleteCategory (req, res) {
        const categoryId = req.body.categoryId

        // getting arrays of products images that need to be deleted from directory
        const category = await getOneCategoryById(categoryId)
        const products = await getProductsByCatName(category.category_name);
        let productsImageArray = [];
        products.forEach(product => {
          productsImageArray.push(product.image)
        })
        function deleteFiles(files, callback){
          var i = files.length;
          console.log(files  + "files")
          files.forEach(function(filepath){
            fs.unlink(`public/assets/uploads/${filepath}`, function(err) {
              i--;
              if (err) {
                callback(err);
                return;
              } else if (i <= 0) {
                callback(null);
              }
            });
          });
        }
        deleteFiles(productsImageArray, (err) => {
          if(err) {
            console.error(err)
          } else {
            console.log('all files are removed')
          }
        });
        const dbDelProductResponse = await deleteProductByCatName(category.category_name);
        // if(dbDelProductResponse.isDeleted) {
        //   console.log(dbDelProductResponse)
        //   fs.unlink(`public/assets/uploads/${category.image}`, (err) => {
        //     if(err) {
        //       console.error(err)
        //     } else {
        //       console.log('file deleted')
        //     }
        // })

        try {
          // const dbDelProductResponse = await deleteProduct(category.category_name);
          const dbDelCatResponse = await deleteCategory(categoryId);
          res.json({
            dbDelCatResponse 
          })
        } catch (error) {
          console.error(error)
          res.json({
            // dbDelCatResponse,
            status: res.status(400)
          })
        }
        // implement following code later
        //   fs.unlink(`public/assets/uploads/${dbDelProductResponse.image}`, (err) => {
        //     if(err) {
        //       console.error(err)
        //     } else {
        //       console.log('file deleted')
        //     }
        // })
        // }
      },
      async deleteSubCategory(req, res) {
        console.log(req.body.subCategoryId)
        const subCategoryId = req.body.subCategoryId;
        try {
          const dbDelSubCatResponse = await deleteSubCategory(subCategoryId);
          res.json({
            dbDelSubCatResponse
          })
        } catch (error) {
          console.error(error)
          res.json({
            // dbDelCatResponse,
            status: res.status(400)
          })
        }

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
        const formData = JSON.parse(JSON.stringify(req.body));

        const editModalProductId = req.body.editModalProductId;
        if(editModalProductId) {
          const product = await getOneProductById(editModalProductId);
          return res.json({
            product,
            haveProduct: true
          })
        }
        if(!formData.editModalProductId) {
          const productId = formData.productId;
          const subCatId = formData.subCatId;
          const oldProduct = await getOneProductById(productId)
          console.log(oldProduct)
          if(req.files.length) {
            fs.stat(`public/assets/uploads/${oldProduct.image}`, function (err, stats) {
              console.log(stats);//here we got all information of file in stats variable
              if (err) {
                  return console.error(err);
              }
              if(typeof stats !== 'undefind') {
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
            // console.log('helo')
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
      },
      async editCategory (req, res) {
        const formData = JSON.parse(JSON.stringify(req.body));
        const editModalCategoryId = req.body.editModalCategoryId;
        if(editModalCategoryId) {
          const category = await getOneCategoryById(editModalCategoryId);
          console.log(category)
          return res.json({
            category,
            haveProduct: true
          })
        }
        if(!formData.editModalProductId) {
          const categoryId = formData.categoryId;
          if(req.files.length) {
              const categoryObj = {
                category_name: formData.prodCategory,
                image:  req.files[0].filename,
              }
              const dbResponse = await updateCategory(categoryObj, categoryId);
                return res.json({
                  dbResponse
                })
            } else {
              const categoryObj = {
                category_name: formData.prodCategory,
                // image:  req.files[0].filename,
              }
              const dbResponse = await updateCategory(categoryObj, categoryId);
                return res.json({
                  dbResponse
                })
            }
        }
      },
      async editSubCategory (req, res) {
        const formData = JSON.parse(JSON.stringify(req.body));
        const editModalSubCategoryId = req.body.editModalSubCategoryId;
        if(editModalSubCategoryId) {
          const subCategory = await getOneSubCategoryById(editModalSubCategoryId);
          return res.json({
            subCategory,
            haveProduct: true
          })
        }
        if(!formData.editModalSubCategoryId) {
          const subCategoryId = formData.subCategoryId;
              const subCategoryObj = {
                sub_cat_name: formData.prodSubCategory,
              }
              const dbResponse = await updateSubCategory(subCategoryObj, subCategoryId);
              return res.json({
                dbResponse
              })

        }
      }
  }
}

module.exports = adminManageProduct;