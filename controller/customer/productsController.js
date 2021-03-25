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

        console.log(req.session.sortProduct)
        
        let products;
        if(req.session.categorySession.isQueried) {
          const whichProduct = req.session.categorySession.categoryName;
          const whichSort = req.session.sortProduct.reqQuery.sortObj.order;
          const whichColumn = req.session.sortProduct.reqQuery.toBeSorted.column;
          products = await getAllBySort(whichProduct, whichSort, whichColumn)
          req.session.sortProduct.isQueried = false
        } else {
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
      console.log(req.session.sortProduct)
      // console.log(req.session.categoryname)
      // console.log(requiredCategory + "helo")
      if(!req.session.categoryname) {
        req.session.categorySession = {
          categoryName: {},
          isQueried: ""
        }
      }
      let categorySession = req.session.categorySession;
      categorySession.categoryName = requiredCategory;
      categorySession.isQueried = false
      res.json({
        message: 'category added added'
      })
    },
    async reqBySort (req, res) {
      // const sortReq = req.body.price;
      // getAllBySort (sortReq)
      
      if(!req.session.sortProduct) {
        req.session.sortProduct = {
          reqQuery: {},
        }

      // res.render('products', {
      //   categories,
      //   products
      // })
      }
      let sortProduct = req.session.sortProduct;
      sortProduct.reqQuery = req.body;
      req.session.categorySession.isQueried = true
      console.log(req.session)
      res.json({
        isSet: true,
      })
      // console.log(req.session)
    },
    // async getSorted (req, res) {
    //   res.render('products', {
    //     categories,
    //     products
    //   })
    // }
  }
}

module.exports = productsController;