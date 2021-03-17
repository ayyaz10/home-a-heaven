const { getAllProducts } = require('../../db/queries');
const cartController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      res.render('cart', {
        products
      })
    },
    async update(req, res) {
        // let cart = {
        //   items: {
        //     productId : { item: productObject, qty: 0},
        //   },
        //   totalQty: 0,
        //   totalPrice:0
        // }

      // for the first time creating cart and adding basic object structure
      if(!req.session.cart) {
        req.session.cart = {
          items: {},
          totalQty: 0,
          totalPrice: 0,
        }
      }

      // check if item does not exist in the cart
      let cart = req.session.cart;
      if(!cart.items[req.body.product.product_id]) {
        cart.items[req.body.product.product_id] = { 
          item: req.body,
          qty: 1,
        }
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.product.price;
          console.log(cart.totalPrice)
      } else {
        cart.items[req.body.product.product_id].qty = cart.items[req.body.product.product_id].qty + 1;
        cart.totalQty  = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.product.price;
        // console.log(cart.totalPrice)
      }
      console.log(cart)
      return res.json(  {totalQty: req.session.cart.totalQty})
    }
  }
}

module.exports = cartController;

