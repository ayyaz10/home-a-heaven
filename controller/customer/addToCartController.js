const addToCartController = () => {
    return {
        index (req, res) {
            res.render('add-to-cart')
        }
    }
}

module.exports = addToCartController;
