const {
        getAllCategories,
        updateStatus,
        getOrders
    } = require('../../db/queries');
const moment = require('moment');

const adminOrderController = () => {
    return {
        async index(req, res) {
            const categories = await getAllCategories();
            const placedOrders = await getOrders();
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