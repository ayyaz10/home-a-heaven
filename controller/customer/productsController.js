const { getAllProducts, getAllCategories, getAllByCategory } = require('../../db/queries');


const productsController = () => {
  return {
    async index(req, res) {
      const categories = await getAllCategories();
      // console.log(categories)
      res.render('collections', {
        categories
      })
    },
    async collectionOfProducts(req, res) {
      const categoryQuery = req.session.categorySession.categoryName;
      const products = await getAllByCategory(categoryQuery);
      const categories = await getAllCategories();
      res.render('products', {
        categories,
        products
      })
    },
    // async index (req, res) {
    //   console.log(req.body)
    //   // const products = await getAllByCategory();
    //   const reqCategories = await getAllByCategory()
    //   const categories = await getAllCategories();
    //   res.render('products', {
    //     // products,
    //     reqCategories,
    //     categories
    //   })
    // },
    async reqByCategory (req, res) {
      const requiredCategory = req.body.categoryName;

      // req.session.destroy()

      if(!req.session.categoryname) {
        req.session.categorySession = {
          categoryName: {}
        }
      }
      let categorySession = req.session.categorySession;
      categorySession.categoryName = requiredCategory;
      // console.log(categorySession)
      res.json({
        message: 'category added added'
      })
    }
  }
}

module.exports = productsController;