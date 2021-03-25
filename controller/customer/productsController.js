const { getAllProducts, getAllCategories, getAllByCategory, getAllBySort } = require('../../db/queries');


const productsController = () => {
  return {
    async index(req, res) {
      const categories = await getAllCategories();
      // console.log(categories)
      console.log(req.session)
      res.render('collections', {
        categories
      })
    },
    async collectionOfProducts(req, res) {
      try {
        const categoryQuery = req.session.categorySession.categoryName;
        // console.log(categorySession.isQueried = false)
        // console.log(req.session.to)
        let products;
        if(req.session.categorySession.isSortQueried) {
          const whichProduct = req.session.categorySession.categoryName;
          const whichSort = req.session.sortProduct.reqQuery.sortObj.order;
          const whichColumn = req.session.sortProduct.reqQuery.toBeSorted.column;
          products = await getAllBySort(whichProduct, whichSort, whichColumn)

          req.session.categorySession.isSortQueried = false
        } else if(req.session.categorySession.isFilterQueried){
          products = await getAllByCategory(req.session.sortProduct.reqQuery.toBeFiltered.filterCategory)
          req.session.categorySession.isFilterQueried = false
        }else {
          products = await getAllByCategory(categoryQuery);
        }
        const categories = await getAllCategories();
        res.render('products', {
          categories,
          products
        })
      } catch (error) {
        res.redirect('/collections')
        console.log(error)
      }

    },
    async reqByCategory (req, res) {

      const requiredCategory = req.body.categoryName;
      // console.log(req.session.sortProduct)
      // console.log(req.session.categoryname)
      // console.log(requiredCategory + "helo")
      if(!req.session.categoryname) {
        req.session.categorySession = {
          categoryName: {},
          isSortQueried: "",
          isFilterQueried: ""
        }
      }
      let categorySession = req.session.categorySession;
      categorySession.categoryName = requiredCategory;
      categorySession.isSortQueried = false;
      categorySession.isFilterQueried = false
      res.json({
        message: 'category added added'
      })
    },
    async reqBySort (req, res) {
      // console.log(req.body.toBeFiltered)
      if(!req.session.sortProduct) {
        req.session.sortProduct = {
          reqQuery: {},
        }
      }
      let sortProduct = req.session.sortProduct;
      sortProduct.reqQuery = req.body;
      if(req.body.filter) {
        req.session.categorySession.categoryName = req.body.toBeFiltered.filterCategory;
        req.session.categorySession.isFilterQueried = true
      } else {
        req.session.categorySession.isSortQueried = true
      }
      
      // console.log(req.session)
      res.json({
        isSet: true,
      })
    },


  }
}

module.exports = productsController;