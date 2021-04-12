const { getAllProducts, getAllCategories, getAllSubCategories, getAllByCategory, getAllBySort, searchProduct } = require('../../db/queries');


const productsController = () => {
  return {
    async index(req, res) {
      const categories = await getAllCategories();
      res.render('collections', {
        categories
      })
    },
    async collectionOfProducts(req, res) {
      try {
        // A little fix for session.sortProduct.reqSortQuery = undefined value
        if(!req.session.categorySession.isFilterQueried) {
          if(!req.session.filterProduct) {
            req.session.filterProduct = {
              reqFilterQuery: {},
            }
          }
          let filterProduct = req.session.filterProduct;
          filterProduct.reqFilterQuery = req.body.toBeFiltered;
        }
      // ___________ fix end

        const categoryQuery = req.session.categorySession.categoryName;
        let products;  console.log(req.session)
        if(req.session.categorySession.isSortQueried) {
          const whichProduct = req.session.categorySession.categoryName;
          const whichSort = req.session.sortProduct.reqSortQuery.order;
          const whichColumn = req.session.sortProduct.reqSortQuery.column;
          products = await getAllBySort(whichProduct, whichSort, whichColumn)

          req.session.categorySession.isSortQueried = false
        } else if(req.session.categorySession.isFilterQueried){
          console.log(req.session)
          products = await getAllSubCategories(req.session.filterProduct.reqFilterQuery)
          req.session.categorySession.isFilterQueried = false
        }else {
          products = await getAllByCategory(categoryQuery);
        }
        const categories = await getAllCategories();
        const subCategories = await getAllSubCategories();
        const category = categories.filter(category => {
          if(category.category_name === req.session.categorySession.categoryName) {
            return category
          }
        })
        const currentCategory = category[0];
        res.render('products', {
          categories,
          subCategories,
          currentCategory,
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
        message: 'category added added',
        isAdded: true
      })
    },

    async reqBySort (req, res) {
      if(req.body.toBeFiltered) {
        if(!req.session.filterProduct) {
          req.session.filterProduct = {
            reqFilterQuery: {},
          }
        }
        console.log('hleo')
        let filterProduct = req.session.filterProduct;
        filterProduct.reqFilterQuery = req.body.toBeFiltered;
        req.session.categorySession.isFilterQueried = true
      } else {
        if(!req.session.sortProduct) {
          req.session.sortProduct = {
            reqSortQuery: {},
          }
        }
        let sortProduct = req.session.sortProduct;
        sortProduct.reqSortQuery = req.body.selectedSort;
        req.session.categorySession.isSortQueried = true
      }
      res.json({
        isSet: true,
      })
    },
    async searchQuery(req, res) {
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