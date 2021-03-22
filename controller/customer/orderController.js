const { getAllProducts, createItem, createOrder, orders, getItem, getCustOrdersItems } = require('../../db/queries');
const moment = require('moment');
// const { createItem, createOrder } = require('../../db/queries');
const db = require('../../db/db');
const { raw } = require('../../db/db');
const orderController = () => {
  return {
        async checkout (req, res) {
            const products = await getAllProducts();
            res.render('checkout', {
            products
            })
        },
        async index (req, res) {
            const customerId = req.signedCookies.user_id;
            const products = await getAllProducts();
            const customerOrders = await orders(customerId);
            const   customerOrdersItems = await getCustOrdersItems(customerId);
            res.render('orders', {
                products,
                customerOrdersItems,
                customerOrders,
                moment
            })
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
            // console.log(result[0])
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
            // console.log(itemId)
            // itemIdArr.push(itemId)
            // productIdArr.push(productID)
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
            
            // console.log(itemId)
            // itemIdArr.push(itemId)
            // productIdArr.push(productID)
            }
        }
        // destroying cart session
        req.session.destroy()
        },
    }
}

module.exports = orderController;