const {
        getPlacedOrders,
        getAllCategories,
        getPlacedOrdersItems,
        updateStatus,
        getOrders
    } = require('../../db/queries');
const moment = require('moment');
// const { getPlacedOrders } = require('../../db/queries')

const adminOrderController = () => {
    return {
        async index(req, res) {
            const orders = await getPlacedOrders();
            const allItems = await getPlacedOrdersItems();

            // console.log(placedOrders)
            // const products = await getAllProducts();
            // for(let i = 0; i < allItems.length; i++) {
            //     if(allItems[i].order_id === orders[i].order_id) {
            //         console.log(true)
            //     }
            // }
            
            const categories = await getAllCategories();
            const placedOrders = await getOrders();
            // console.log(allItems)
            res.render('admin-orders', {
                categories,
                placedOrders,
                moment
              });
        },
        async orderStatus (req, res){
            const orderId = req.body.clientStatus.order_id;
            const status = req.body.clientStatus.status;
            const dbStatus = await updateStatus(orderId, status)
            res.json({
                dbStatus
            })
        },
    }
}


module.exports = adminOrderController;