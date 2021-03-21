const { getAllProducts, createItem, createOrder, orders, getItem } = require('../../db/queries');
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
            const customerOrders = await orders(customerId);
            // customer
            // customerOrders.forEach(each => {
                
            //     for(const key of Object.entries(each)) {
            //         console.log(key) 
            //     }
            // })
            for (const enry of Object.entries(customerOrders)) {

                console.log(customerOrders[enry])
            }
            // console.log(customerOrders)
            // console.log(customerOrders)
            // let rawProductId;
            let rawItemId = [];
            customerOrders.forEach(order => {
                // console.log(order.item_id)
                // rawProductId = order.product_id.split(',').join("");
                rawItemId.push(order.item_id.split(',').join(""));
            })
            let itemIdsArr = [];
            for(let i = 0; i < rawItemId.length; i++ ) {

                // console.log(rawItemId[i].split('"'))
            const convertRawToIntArr = async (rawData) => {
                let resultArray = rawData.split('"').map(function(strVale){return Number(strVale);});
                const convertedData = resultArray.filter((arr) => {
                    if(!(isNaN(arr) && arr === 0)) {
                        return arr;
                    }
                })
                return convertedData;
            }
            itemIdsArr.push(await convertRawToIntArr(rawItemId[i]))
        }
        // itemIdsArr[0].split('')
        // const helo = itemIdsArr.map(id => {
        //     return id.split(',')
        // })
        // const c = itemIdsArr
        // console.log(itemIdsArr[1])
        const products = await getAllProducts();
        let item = [];
        for(let i = 0; i < itemIdsArr.length; i++) {
            for(let j = 0; j < itemIdsArr.length; j++) {
                // console.log(itemIdsArr[i][j])
                 item.push(await getItem(itemIdsArr[i][j]))
            }
        }
        // console.log(item)
            // const productIds = await convertRawToIntArr(rawProductId)

            // itemIdsArr.forEach( async itemId => {
            //     // console.log(items)
            // })


          
            res.render('orders', {
            products,
            customerOrders,
            moment,
            item
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


            for(let i = 0; i < parsedItems.length; i++) {
            productID = cart.items[parseInt(parsedItems[i])].item.product.item.product_id;
            itemName = cart.items[parseInt(parsedItems[i])].item.product.item.product_name;
            price = cart.items[parseInt(parsedItems[i])].price;
            quantity = cart.items[parseInt(parsedItems[i])].qty;
            const itemObj = {
            product_id: productID,
            item_name: itemName,
            price: price,
            qty: quantity,
            created_at: new Date()
            }
            itemId = await createItem(itemObj);
            itemIdArr.push(itemId)
            productIdArr.push(productID)
        }
            const customerId = req.signedCookies.user_id;
            const totalQty = cart.totalQty;
            const totalPrice = cart.totalPrice;
            if(req.signedCookies.user_id){
            const order = {
                customer_id: customerId,
                product_id: productIdArr,
                item_id: itemIdArr,
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
            const result = await createOrder(order);
            res.json({
                message: "Product Added",
                result
            })
            } else {
            const order = {
                product_id: productID,
                full_name: fullname,
                email,
                item_id: itemIdArr,
                qty: totalQty,
                total_price: totalPrice,
                address,
                city,
                phone,
                paymentType: 'COD',
                order_status: 'order_placed',
                created_at: new Date()
            }
            const result = await createOrder(order);
            res.json({
                message: "Product Added",
                result
            })
            }

        },
    }
}

module.exports = orderController;