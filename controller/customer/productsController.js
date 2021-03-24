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
      try {
        const categoryQuery = req.session.categorySession.categoryName;
        console.log(req.session.categorySession)
  
        const products = await getAllByCategory(categoryQuery);
        const categories = await getAllCategories();
        res.render('products', {
          categories,
          products
        })
      } catch (error) {
        res.redirect('/collections')
      }

    },
    async reqByCategory (req, res) {
      const requiredCategory = req.body.categoryName;
      // console.log(req.session.categoryname)
      console.log(requiredCategory + "helo")
      if(!req.session.categoryname) {
        req.session.categorySession = {
          categoryName: {}
        }
      }
      let categorySession = req.session.categorySession;
      categorySession.categoryName = requiredCategory;
      res.json({
        message: 'category added added'
      })
    }
  }
}

module.exports = productsController;