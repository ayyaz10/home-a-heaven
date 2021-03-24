// const notFoundController = require('../controller/notFoundController');
// const reqByCategory = require('../controller/customer/reqByCategory');
const orderController = require('../controller/customer/orderController');
const ensureLoggedIn = require('../controller/middlewares/ensureLoggedIn');
const guest = require('../controller/middlewares/guest');
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
router.get('/signup-login', guest, authController().registerLogin);
router.post('/register', authController().register);
router.post('/login', authController().login);
// router.post('/add-data', authController().postData);
router.get('/logout', authController().logout);

//product controllers
router.get('/collections', productsController().index)

// customer controllers
// router.get('/products', productsController().index);
router.get('/collections/products', productsController().collectionOfProducts);
router.post('/req-by-category', productsController().reqByCategory);
router.get('/cart', cartController().index);
// router.post('/updateCart', cartController().update);
router.get('/addInCart', cartController().addInCart);
router.get('/getProductDetail', cartController().getProductDetail);
router.post('/addToCart', cartController().addToCart);

// admin controllers
router.get('/adminPanel', adminPanelController().index);
router.post('/product', adminPanelController().product);


router.post('/editCartValues', cartController().editCartValues);
router.post('/removeCartItem', cartController().removeCartItem);

// customer router
router.get('/orders', ensureLoggedIn, orderController().index);
router.get('/checkout', orderController().checkout);
router.post('/order', orderController().order);
// 404 router
// router.get('/404', notFoundController().index);


module.exports = router;
