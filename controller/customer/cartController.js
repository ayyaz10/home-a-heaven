const { getAllProducts, createItem, createOrder } = require('../../db/queries');
// const { createItem, createOrder } = require('../../db/queries');
const db = require('../../db/db');
const cartController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      res.render('cart', {
        products
      })
    },
    async addInCart (req, res) {
      const products = await getAllProducts();
      res.render('add-to-cart', {
        products
      })
  },
    async update(req, res) {
      console.log(req.body)
      // console.log(req.body)
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

      // // for the first time creating cart and adding basic object structure
      // if(!req.session.cart) {
      //   req.session.cart = {
      //     items: {},
      //   }
      // }
      // // check if item does not exist in the cart
      // let cart = req.session.cart;
      // console.log(req.body.product.product_id)
      // if(!cart.items[req.body.product.product_id]) {
      //   cart.items[req.body.product.product_id] = {
      //     item: req.body,
      //   }
      //   productid = req.body.product.product_id;
      // } else {
      //   productid = req.body.product.product_id;
      // }
      // cart.productid = req.body.product.product_id
      // console.log(req.session)

      // return res.json("success")
      
    },

    async getSessionData(req, res) {
      const sessions = await db.select('*').from('sessions');
      console.log(sessions)
      sessions.forEach(session => {
        // res.json( {sessionData: session.sess.cart })
      })
      // console.log(session[0].sess.cart)
    },
    async addToCart(req, res) {
      // console.log(req.body)
      // console.log(req.session.cart)

              // let cart = {
        //   items: {
        //     productId : { item: productObject, qty: 0},
        //   },
        //   totalQty: 0,
        //   totalPrice:0
        // }
      // for the first time creating cart and adding basic object structure
      // console.log('helo')
      console.log(req.session)
      if(!req.session.cart) {
        req.session.cart = {
          items: {},
          // productId: 0,
          totalQty: 0,
          totalPrice: 0,
        }
      }
      // check if item does not exist in the cart
      let cart = req.session.cart;
      if(!cart.items[req.body.product.item.product_id]) {
        cart.items[req.body.product.item.product_id] = {
          item: req.body,
          price: req.body.product.item.price,
          qty: 1,
        }
          // cart.productId =  req.body.productid;
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + req.body.product.item.price;
      } else {
        cart.items[req.body.product.item.product_id].qty = cart.items[req.body.product.item.product_id].qty + 1;
        cart.items[req.body.product.item.product_id].price = cart.items[req.body.product.item.product_id].price + req.body.product.item.price;
        // cart.productId =  req.body.productid;
        cart.totalQty  = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + req.body.product.item.price;
      }
      
      return res.json(  {totalQty: req.session.cart.totalQty})


    },

    async removeCartItem(req, res) {
        const { productid, counterval, price, cartqty, subtotal, total } = await req.body;
        let cart = req.session.cart;

        console.log(cart.items[productid])
        // delete cart.items[productid]
        // cart.items[productid].qty = cart.items[productid].qty - counterval;
        // cart.totalQty = cart.totalQty - counterval;
        const session = req.session;
        // console.log(cart.totalPrice)
        cart.totalPrice = cart.totalPrice - cart.items[productid].price;
        cart.totalQty = cart.totalQty - cart.items[productid].qty;
        delete cart.items[productid];
            // delete cart.totalPrice;
            // console.log(cart)
            return res.json({
              totalQty: req.session.cart.totalQty,
              totalPrice: req.session.cart.totalPrice
            })
    },
    async getProductDetail(req, res) {
      const productDetail = req.session.cart;
      res.json(productDetail)
    },

    async editCartValues(req, res) {
      const { productid, counterval, price, cartqty, subtotal, total } = await req.body;
      console.log(req.body)
      let cart = req.session.cart;
      // console.log(cart)
      console.log(counterval)
      console.log(productid)
      cart.items[productid].price = price;
      cart.items[productid].qty = counterval;
      let arrayOfQty= [];
      for(let prop of Object.values(cart.items)) {
        arrayOfQty.push(prop.qty)
      }
      const sumOfTotalQty = arrayOfQty.reduce((a , b) => a + b , 0)
      cart.totalQty = sumOfTotalQty;
      cart.totalPrice = total;
      return res.json(  {totalPrice: req.session.cart.totalPrice})
    },
    async checkout (req, res) {
      const products = await getAllProducts();
      res.render('checkout', {
        products
      })
    },
    async shipping (req, res) {
      const { fullname, email, address, city, phone } = req.body;
      if(!fullname || !email || !address || !city || !phone) {
        res.json({
          message: "All fields are required",
          isError: true
        })
      }


      let itemsName = "";
      const cart = req.session.cart;
      let parsedItems = Object.keys(cart.items);
      for(let i = 0; i < parsedItems.length; i++) {
  
        // console.log(cart.items[parseInt(parsedItems[i])].item.product.item.product_name)
        // itemsName = cart.items[parseInt(parsedItems[i])].item.product.item.product_name + ",";
        console.log(cart.items[parseInt(parsedItems[i])])
 
      console.log(req.signedCookies.user_id)
      if(req.signedCookies.user_id){
        const productID = cart.items[parseInt(parsedItems[i])];
        const price = cart.items[parseInt(parsedItems[i])].price;
        const quantity = cart.items[parseInt(parsedItems[i])].qty;
        console.log(quantity)
        const itemObj = {
          product_id: productID,
          price,
          qty: quantity,
          created_on: new Date()
        }
        // console.log(cart.items[parseInt(parsedItems[i])].price)

        // const customerId = req.signedCookies.user_id;
        const items = req.session.cart.items;
        createItem(itemObj);
        // console.log(items)
        // const order = {
        //   customer_id: req.signedCookies.user_id,
        //   product_id: cart.items[parseInt(parsedItems[i])],
        //   items: itemsName,
        //   // qty: ,
        //   address,
        //   city,
        //   phone,
        //   paymentType: 'COD',
        //   order_status: 'order_placed',
        // }

      } else {
        // console.log(req.signedCookies.user_id)
        const order = {
          full_name: fullname,
          email,
          items: itemsName,
          // qty: cart.items[parseInt(parsedItems[i])],
          address,
          city,
          phone,
          paymentType: 'COD',
          order_status: 'order_placed',

        }
      }
    }

      // createOrder();
    },
  }
}

module.exports = cartController;






