const { getAllCategories } = require('../../db/queries');

const adminManageProduct = () => {
    return {
        async index (req, res) {
            const categories = await getAllCategories();
            res.render('manage-products', {
              categories
            });
          },

    }
}

module.exports = adminManageProduct;