const updateCartController = require('../controller/customer/addToCartController');
const addToCartController = require('../controller/customer/addToCartController');
const cartController = require('../controller/customer/cartController');
const adminPanelController = require('../controller/admin/adminPanelController');
const productsController = require('../controller/customer/productsController');
const homeController = require('../controller/homeController');
const authController = require('../controller/auth/authController');
const express = require('express');
const router = express.Router();

router.get('/', homeController().index);

// auth controllers
router.get('/signup-login', authController().registerLogin)

// customer controllers
router.get('/products', productsController().index);
router.get('/cart', cartController().index);
router.post('/updateCart', cartController().update);
router.get('/addInCart', cartController().addInCart);
router.get('/getProductDetail', cartController().getProductDetail);
router.post('/addToCart', cartController().addToCart);


// admin controllers
router.get('/adminPanel', adminPanelController().index);
router.post('/product', adminPanelController().product);


router.get('/getSessionData', cartController().getSessionData);
router.post('/editCartValues', cartController().editCartValues);
router.post('/removeCartItem', cartController().removeCartItem);


module.exports = router;
