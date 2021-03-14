const addToCartController = require('../controller/customer/addToCartController');
const cartController = require('../controller/customer/cartController');
const adminPanelController = require('../controller/admin/adminPanelController');
const homeController = require('../controller/homeController');
const express = require('express');
const router = express.Router();

router.get('/', homeController().index);
// customer controllers
router.get('/cart', cartController().index);
router.get('/addToCart', addToCartController().index);

// admin controllers
router.get('/adminPanel', adminPanelController().index);
router.post('/product', adminPanelController().product);


module.exports = router;
