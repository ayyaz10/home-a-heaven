const { getAllCategories, getAllProducts, getOneProductById, updateProduct, deleteProduct } = require('../../db/queries');

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
        const productId = req.body.productId;
        const product = req.body.productArray;
        const subCatId = req.body.subCatId;
        // console.log(subCatId)
        if(productId) {
          const product = await getOneProductById(productId);
          res.json({
            product,
            haveProduct: true
          })
        }
        if(product) {
          const productObj = {
            product_name: product[0],
            price: product[1],
            image: 'product.png',
            inStock: product[3],
            category_name: product[4],
            sub_cat_name: product[5],
            product_description: product[7]
          }
          const dbResponse = await updateProduct(productObj, productId, subCatId);

        }
      }
  }
}

module.exports = adminManageProduct;