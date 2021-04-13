const { getAllCategories, getAllProducts, getOneProductById, deleteProduct } = require('../../db/queries');

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
        const productId = req.body.productId
        if(productId) {
          const product = await getOneProductById(productId);
          res.json({
            product,
            haveProduct: true
          })
        }
      }
  }
}

module.exports = adminManageProduct;