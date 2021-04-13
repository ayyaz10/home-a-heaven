const { getAllCategories, getAllProducts, deleteProduct } = require('../../db/queries');

const adminManageProduct = () => {
    return {
        async index (req, res) {
            const categories = await getAllCategories();
            const allProducts = await getAllProducts();
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

    }
}

module.exports = adminManageProduct;