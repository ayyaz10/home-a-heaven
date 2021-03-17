const updateCartController = require('../controller/customer/addToCartController');
const addToCartController = require('../controller/customer/addToCartController');
const cartController = require('../controller/customer/cartController');
const adminPanelController = require('../controller/admin/adminPanelController');
const productsController = require('../controller/customer/productsController');
const homeController = require('../controller/homeController');
const express = require('express');
const router = express.Router();

router.get('/', homeController().index);
// customer controllers
router.get('/products', productsController().index);
router.get('/cart', cartController().index);
router.post('/updateCart', cartController().update);
// router.get('/addToCart', addToCartController().index);

// admin controllers
router.get('/adminPanel', adminPanelController().index);
router.post('/product', adminPanelController().product);


router.get('/getSessionData', cartController().getSessionData);


module.exports = router;
