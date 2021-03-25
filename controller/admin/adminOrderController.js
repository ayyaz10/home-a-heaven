const { getAllProducts, getPlacedOrders, getAllCategories, getPlacedOrdersItems, createItem, createOrder, orders, getItem, getCustOrdersItems } = require('../../db/queries');
const moment = require('moment');
// const { getPlacedOrders } = require('../../db/queries')

const adminOrderController = () => {
    return {
        async index(req, res) {
            const orders = await getPlacedOrders();
            const allItems = await getPlacedOrdersItems();
            console.log(allItems.length)
            // const products = await getAllProducts();
            const categories = await getAllCategories();
            // console.log(allItems)
            res.render('admin-orders', {
                categories,
                allItems,
                orders,
                moment
              });
        }
    }
}


module.exports = adminOrderController;