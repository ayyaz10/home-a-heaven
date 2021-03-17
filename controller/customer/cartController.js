const { getAllProducts } = require('../../db/queries');
const db = require('../../db/db');
const cartController = () => {
  return {
    async index (req, res) {
      // console.log(products)

      const products = await getAllProducts();
      // console.log(products)
      
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
        // let cart = {
        //   items:
                //  {
                      // item: productObject,
                      // qty: 0
              // },
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
      // console.log(req.body)
      return res.json(  {totalQty: req.session.cart.totalQty})
    },
    async getSessionData(req, res) {
      const sessions = await db.select('*').from('sessions');
      sessions.forEach(session => {
        // res.json( {sessionData: session.sess.cart })
      })
      // console.log(session[0].sess.cart)
    },
    async updates(req, res) {
      let cart = req.session.cart;
      
      // for(let product of Object.values(cart)) {

        // await console.log(product)
        cart.totalQty = cart.totalQty - 1;
      // }
      console.log(cart.items)
      
      // cart.totalQty  = cart.totalQty - 1;
      // cart.totalPrice = cart.totalPrice + req.body.product.price;
    }
    
  }
}

module.exports = cartController;