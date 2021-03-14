const db = require('../db/db');

const homeController = () => {
  return {
    index (req, res) {
      db.select().table('product_category')
      .then(categories => {
        res.render('index', {
        category: categories,
       })
      })
    }
  }
}

module.exports = homeController;
