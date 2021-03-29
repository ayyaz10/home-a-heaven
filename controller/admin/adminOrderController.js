const { getAllProducts,
        getPlacedOrders,
        getAllCategories,
        getPlacedOrdersItems,
        updateStatus,
        createItem, 
        createOrder,
        orders, 
        getItem, 
        getCustOrdersItems 
    } = require('../../db/queries');
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
        },
        async orderStatus (req, res){
            // console.log(req.body)
            const orderId = req.body.clientStatus.order_id;
            const status = req.body.clientStatus.status;
            // console.log(orderId)
            const dbStatus = await updateStatus(orderId, status)
            res.json({
                dbStatus
            })
        },

    }
}


module.exports = adminOrderController;