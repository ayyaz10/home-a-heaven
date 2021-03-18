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
          price: req.body.product.price,
          qty: 1,
        }
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.product.price;
          // console.log(cart.totalPrice)
      } else {
        cart.items[req.body.product.product_id].qty = cart.items[req.body.product.product_id].qty + 1;
        cart.items[req.body.product.product_id].price = cart.items[req.body.product.product_id].price + req.body.product.price;
        cart.totalQty  = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.product.price;
        // console.log(cart.totalPrice)
      }
      // console.log(cart)
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
    async removeCartItem(req, res) {
      // console.log(req.body)
    },

    async editCartValues(req, res) {
      const { productid, counterval, price, cartqty, subtotal, total } = req.body;
      let cart = req.session.cart;
      // cart.totalQty
      cart.items[productid].price = price;
      cart.items[productid].qty = counterval;
      cart.totalQty = cartqty;
      cart.totalPrice = total;
      return res.json(  {totalPrice: req.session.cart.totalPrice})



      
    }
    
  }
}

module.exports = cartController;


