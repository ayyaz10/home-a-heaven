const { getAllProducts, getAllCategories, getAllByCategory, getAllBySort, searchProduct } = require('../../db/queries');


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
        console.log(req.session)
        const categoryQuery = req.session.categorySession.categoryName;
        let products;
        if(req.session.categorySession.isSortQueried) {
          const whichProduct = req.session.categorySession.categoryName;
          const whichSort = req.session.sortProduct.reqQuery.order;
          const whichColumn = req.session.sortProduct.reqQuery.column;
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
      // console.log(req.body)
      // console.log(req.body.toBeFiltered)
      if(!req.session.sortProduct) {
        req.session.sortProduct = {
          reqQuery: {},
        }
      }
      let sortProduct = req.session.sortProduct;
      sortProduct.reqQuery = req.body.selectedSort;
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
    async searchQuery(req, res) {
      console.log(req.query)
      const { product } = req.query;
      const isValidText = () => {
        const validSearchText = typeof product == 'string' && product.trim() != '';
        return validSearchText;
      }

      if(isValidText()) {
        const products = await searchProduct(product);
        const categories = await getAllCategories();
        // console.log(product)
        res.render('product-search', {
          product,
          products,
          categories
        })
      } else {
        return res.json({
          message: "Grabage query",
          success: false
        })
      }
    }


  }
}

module.exports = productsController;