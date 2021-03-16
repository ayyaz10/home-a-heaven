/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/js/products.js ***!
  \**********************************/
var addToCart = document.querySelectorAll('.add-to-cart');

var updateCart = function updateCart(product) {
  fetch('http://localhost:3333/updateCart', {
    method: "post",
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      product: product
    })
  }).then(function (data) {
    return data.json();
  }).then(function (result) {
    console.log(result);
  });
};

addToCart.forEach(function (cartBtn) {
  cartBtn.addEventListener('click', function (e) {
    var product = JSON.parse(cartBtn.dataset.product);
    updateCart(product);
    console.log(product);
  });
});
/******/ })()
;