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
            console.log(req.session)
            // console.log(req.body)
            const customerId = req.signedCookies.user_id;
            const products = await getAllProducts();
            const categories = await getAllCategories();
            let customerOrders;
            if(customerId) {
                customerOrders = await orders(customerId);
            } else {
                next();
            }
            const customerOrdersItems = await getCustOrdersItems(customerId);
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
           
            const cart = req.session.cart;
            let parsedItems = Object.keys(cart.items);
            let productID;
            let itemName;
            let price;
            let quantity;
            let itemId;
            let productIdArr = [];
            let itemIdArr = [];
            const customerId = req.signedCookies.user_id;
            const totalQty = cart.totalQty;
            const totalPrice = cart.totalPrice;
            let result;
           
            if(req.signedCookies.user_id){
            const order = {
                customer_id: customerId,
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
            res.json({
                message: "Product Added",
                customer: true,
                result
            })
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
            res.json({
                message: "Guest product Added",
                customer: false,
                result
            })
            }
    if(req.signedCookies.user_id){
        for(let i = 0; i < parsedItems.length; i++) {
            const orderId = result[0].order_id;
            productID = cart.items[parseInt(parsedItems[i])].item.product.item.product_id;
            itemName = cart.items[parseInt(parsedItems[i])].item.product.item.product_name;
            price = cart.items[parseInt(parsedItems[i])].price;
            quantity = cart.items[parseInt(parsedItems[i])].qty;
            const itemObj = {
            order_id: orderId,
            customer_id: customerId,
            // product_id: productID,
            // order_id: result.order_id,
            item_name: itemName,
            price: price,
            qty: quantity,
            created_at: new Date()
            }
            itemId = await createItem(itemObj);
        }
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
        }
        // destroying cart session
        req.session.destroy()
        },
    }
}

module.exports = orderController;