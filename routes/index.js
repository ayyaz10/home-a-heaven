const uuid = require('uuid').v4;
const multer = require('multer');
const adminManageProduct = require('../controller/admin/adminManageProduct');
const adminOrderController = require('../controller/admin/adminOrderController');
const orderController = require('../controller/customer/orderController');
const ensureLoggedIn = require('../controller/middlewares/ensureLoggedIn');
const admin = require('../controller/middlewares/admin');
const guest = require('../controller/middlewares/guest');
const accountController = require('../controller/customer/accountController');
const cartController = require('../controller/customer/cartController');
const adminPanelController = require('../controller/admin/adminPanelController');
const productsController = require('../controller/customer/productsController');
const homeController = require('../controller/homeController');
const authController = require('../controller/auth/authController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/uploads');
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        cb(null, `${uuid()}-${originalname}`);
    }
})
const upload = multer({ storage });
const express = require('express');
const router = express.Router();

router.get('/', homeController().index);

// auth controllers
router.get('/signup-login', guest, authController().registerLogin);
router.post('/register', authController().register);
router.post('/login', authController().login);
router.get('/logout', authController().logout);

// admin auth
router.get('/admin-login', authController().adminLogin);


//product controllers
router.get('/collections', productsController().index)
router.get('/collections/products', productsController().collectionOfProducts);
router.post('/req-by-category', productsController().reqByCategory);
router.post('/sort', productsController().reqBySort);
router.get ('/search', productsController().searchQuery);

// customer controllers
router.get('/cart', cartController().index);
router.get('/addInCart', cartController().addInCart);
router.get('/getProductDetail', cartController().getProductDetail);
router.post('/addToCart', cartController().addToCart);

// admin routes
router.get('/adminOrders', admin, adminOrderController().index)
router.post('/order-status', adminOrderController().orderStatus);
router.get('/adminPanel', admin, adminPanelController().index);
router.get('/manage-product', admin, adminManageProduct().index);
router.post('/edit-product', upload.any(), adminManageProduct().editProduct);
router.post('/delete-product', adminManageProduct().deleteProduct);
router.post('/product', upload.any(), adminPanelController().product);

// remove and update cart products routes
router.post('/editCartValues', cartController().editCartValues);
router.post('/removeCartItem', cartController().removeCartItem);

// customer router
router.get('/orders', ensureLoggedIn, orderController().index);
router.get('/checkout', orderController().checkout);
router.post('/order', orderController().order);
router.get('/account', ensureLoggedIn, accountController().index);
router.post('/edit-profile', accountController().editProfile);


module.exports = router;
