/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/orders.js ***!
  \********************************/
if (JSON.parse(localStorage.getItem('isOrdered'))) {
  var successAlertContainer = document.querySelector('.success-alert');
  var successMessage = document.createElement('p');
  successMessage.classList.add('success');
  successMessage.innerText = 'Order Placed';
  successAlertContainer.append(successMessage);
  localStorage.setItem('isOrdered', JSON.stringify(false));
}

setTimeout(function () {
  var successAlert = document.querySelector('.success');
  successAlert.style.display = "none";
}, 3000);
/******/ })()
;