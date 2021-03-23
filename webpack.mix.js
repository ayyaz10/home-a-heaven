const mix = require('laravel-mix');

mix.js('resources/js/header.js', 'public/js/header.js');
mix.js('resources/js/index.js', 'public/js/index.js');
mix.js('resources/js/collections.js', 'public/js/collections.js');
mix.js('resources/js/products.js', 'public/js/products.js');
mix.js('resources/js/add-to-cart.js', 'public/js/add-to-cart.js');
mix.js('resources/js/cart.js', 'public/js/cart.js');
mix.js('resources/js/checkout.js', 'public/js/checkout.js');
mix.js('resources/js/orders.js', 'public/js/orders.js');
mix.js('resources/js/admin-panel.js', 'public/js/admin-panel.js');
mix.js('resources/js/signup-login.js', 'public/js/signup-login.js');
// mix.css('resources/css/adminPanel.css', 'public/css/adminPanel.css');
// mix.css('resources/css/styles.css', 'public/css/styles.css');
// mix.css('resources/css/styles.css', 'public/css/style.css');
// mix.css('resources/css/index.css', 'public/css/index.css');
// mix.css('resources/css/signup-login.css', 'public/css/signup-login.css');