const { getAllProducts } = require('../../db/queries');

const addToCartController = () => {
    return {
        async index (req, res) {
            const products = await getAllProducts();
            res.render('add-to-cart', {
              products
            })
        }
    }
}

module.exports = addToCartController;
