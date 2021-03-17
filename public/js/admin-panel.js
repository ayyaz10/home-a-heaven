/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*************************************!*\
  !*** ./resources/js/admin-panel.js ***!
  \*************************************/
var adminPanelForm = document.querySelector('#adminPanelForm');
var adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
var adminPanelAddCategoryInput = document.querySelector('#adminPanelForm p input');
var categoryAddedMsg = document.querySelector('.category_added_message');
var productName = adminPanelFormData[0];
var productPrice = adminPanelFormData[1];
var productImage = adminPanelFormData[2];
var stockCount = adminPanelFormData[3];
var categoryName = adminPanelFormData[4];
var description = document.querySelector('.product-description');
console.log(description);
adminPanelAddCategoryInput.addEventListener('n', function () {
  categoryAddedMsg.classList.remove('success_response');
  adminPanelAddCategoryInput.value = "";
});
adminPanelForm.addEventListener('submit', function (e) {
  e.preventDefault();
  fetch('http://localhost:3333/product', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productname: productName.value,
      productprice: productPrice.value,
      // productimage: productImage.value,
      stockcount: stockCount.value,
      productcategory: categoryName.value,
      description: description.value
    })
  }).then(function (response) {
    return response.json();
  }).then(function (isValid) {
    if (isValid) {// categoryAddedMsg.classList.add('success_response');
    }
  })["catch"](function (err) {
    return console.log(err);
  });
});
/******/ })()
;