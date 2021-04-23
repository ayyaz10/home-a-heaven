const { getAllProducts, getAllCategories, createItem, createOrder } = require('../../db/queries');
// const { createItem, createOrder } = require('../../db/queries');
const db = require('../../db/db');
const cartController = () => {
  return {
    async index (req, res) {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      console.log(req.session)
      res.render('cart', {
        products,
        categories
      })
    },
    async addInCart (req, res) {
      const products = await getAllProducts();
      const categories = await getAllCategories();
      res.render('add-to-cart', {
        products,
        categories
      })
    },
    async addToCart(req, res) {
       // let cart = {
        //   items: {
        //     productId : { item: productObject, qty: 0},
        //   },
        //   totalQty: 0,
        //   totalPrice:0
        // }
      // for the first time creating cart and adding basic object structure
      // console.log('helo')
      // console.log(req.body)
      const discountPrice = req.body.product.item.discount;
      const price = req.body.product.item.price;
      let itemPrice;
      if(discountPrice.length > 0) {
        itemPrice = parseInt(discountPrice)
      } else {
        itemPrice = parseInt(price);
      }
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
          price: itemPrice,
          qty: 1,
        }
          // cart.productId =  req.body.productid;
          cart.totalQty = cart.totalQty + 1;
          cart.totalPrice = cart.totalPrice + itemPrice;
      } else {
        cart.items[req.body.product.item.product_id].qty = cart.items[req.body.product.item.product_id].qty + 1;
        cart.items[req.body.product.item.product_id].price = cart.items[req.body.product.item.product_id].price + itemPrice;
        // cart.productId =  req.body.productid;
        cart.totalQty  = cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice + itemPrice;
      }
      return res.json(  {totalQty: req.session.cart.totalQty})


    },

    async removeCartItem(req, res) {
        const { productid, counterval, price, cartqty, subtotal, total } = await req.body;
        let cart = req.session.cart;
        const session = req.session;
        cart.totalPrice = cart.totalPrice - cart.items[productid].price;
        cart.totalQty = cart.totalQty - cart.items[productid].qty;
        delete cart.items[productid];
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
      let cart = req.session.cart;
      console.log(total)
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
  }
}

module.exports = cartController;






