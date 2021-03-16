const mix = require('laravel-mix');

mix.js('resources/js/index.js', 'public/js/index.js');
mix.js('resources/js/products.js', 'public/js/products.js');
mix.js('resources/js/admin-panel.js', 'public/js/admin-panel.js');
mix.js('resources/js/signup-login.js', 'public/js/signup-login.js');
// mix.css('resources/css/adminPanel.css', 'public/css/adminPanel.css');
// mix.css('resources/css/styles.css', 'public/css/styles.css');
// mix.css('resources/css/styles.css', 'public/css/style.css');
// mix.css('resources/css/index.css', 'public/css/index.css');
// mix.css('resources/css/signup-login.css', 'public/css/signup-login.css');