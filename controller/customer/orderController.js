const { getAllProducts, getAllCategories, createItem, createOrder, orders, getItem, getCustOrdersItems } = require('../../db/queries');
const moment = require('moment');
// const { createItem, createOrder } = require('../../db/queries');
const db = require('../../db/db');
const { raw } = require('../../db/db');
const orderController = () => {
  return {
        async checkout (req, res) {
            console.log(req.session.cart)
            const products = await getAllProducts();
            const categories = await getAllCategories();
            res.render('checkout', {
            products,
            categories
            })
        },
        async index (req, res, next) {
            const userId = JSON.parse(req.signedCookies.user_info).user_id;
            const products = await getAllProducts();
            const categories = await getAllCategories();
            let customerOrders;
            if(userId) {
                customerOrders = await orders(userId);
            } else {
                next();
            }
            const customerOrdersItems = await getCustOrdersItems(userId);
            // console.log(customerOrdersItems)
        
            res.render('orders', {
                products,
                categories,
                customerOrdersItems,
                customerOrders,
                moment
            });
        },
        async order (req, res) {
            const { fullname, email, address, city, phone } = req.body;
            if(!fullname || !email || !address || !city || !phone) {
            res.json({
                message: "All fields are required",
                isError: true
            })
            }
        //    if(req.signedCookies)
        let userId;
        let parsedItems;
        let productID;
        let itemName;
        let price;
        let quantity;
        let itemId;
        let productIdArr = [];
        let itemIdArr = [];
        let result;
        let cart;
        let totalQty;
        let totalPrice;
        cart = req.session.cart;
        parsedItems = Object.keys(cart.items);
        totalQty = cart.totalQty;
        totalPrice = cart.totalPrice;
        if(req.signedCookies.user_info) {
            userId = JSON.parse(req.signedCookies.user_info).user_id;
            if(userId){
            const order = {
                customer_id: userId,
                // product_id: productIdArr,
                // item_id: itemIdArr,
                full_name: fullname,
                email,
                qty: totalQty,
                total_price: totalPrice,
                address,
                city,
                phone: "2392193",
                paymentType: 'COD',
                order_status: 'order_placed',
                created_at: new Date()
            }
            result = await createOrder(order);
            // res.json({
            //     message: "Order created",
            //     customer: true,
            //     result
            // })
        }
            } else {
               
            const order = {
                customer_id: null,
                // product_id: productID,
                full_name: fullname,
                email,
                // item_id: itemIdArr,
                qty: totalQty,
                total_price: totalPrice,
                address,
                city,
                phone,
                paymentType: 'COD',
                order_status: 'order_placed',
                created_at: new Date()
            }
            result = await createOrder(order);
            // res.json({
            //     message: "Guest order created",
            //     customer: false,
            //     result
            // })
            }
    if(userId){
        for(let i = 0; i < parsedItems.length; i++) {
            const orderId = result[0].order_id;
            productID = cart.items[parseInt(parsedItems[i])].item.product.item.product_id;
            itemName = cart.items[parseInt(parsedItems[i])].item.product.item.product_name;
            price = cart.items[parseInt(parsedItems[i])].price;
            quantity = cart.items[parseInt(parsedItems[i])].qty;
            const itemObj = {
            order_id: orderId,
            customer_id: userId,
            // product_id: productID,
            // order_id: result.order_id,
            item_name: itemName,
            price: price,
            qty: quantity,
            created_at: new Date()
            }
            itemId = await createItem(itemObj);
        }

        req.session.destroy(function(err){
            if(err){
               console.log(err);
            }else{
                res.json({
                message: "Order created",
                customer: true,
                result
                })
            }
         });
    } else {
        for(let i = 0; i < parsedItems.length; i++) {
        const orderId = result[0].order_id;
            productID = cart.items[parseInt(parsedItems[i])].item.product.item.product_id;
            itemName = cart.items[parseInt(parsedItems[i])].item.product.item.product_name;
            price = cart.items[parseInt(parsedItems[i])].price;
            quantity = cart.items[parseInt(parsedItems[i])].qty;
            const itemObj = {
                order_id: orderId,
                customer_id: null,
            // product_id: productID,
            // order_id: result.order_id,
            item_name: itemName,
            price: price,
            qty: quantity,
            created_at: new Date()
            }
            itemId = await createItem(itemObj);
            }
            req.session.destroy(function(err){
                if(err){
                   console.log(err);
                }else{
                    // console.log(session.email);
                    res.json({
                        message: "Guest order created",
                        customer: false,
                        result
                    })
                }
             });
        }
        // destroying cart session
        // req.session.destroy()
        console.log(req.session)
        // req.session.destroy()
        },
    }
}

module.exports = orderController;