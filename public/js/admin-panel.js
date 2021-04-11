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
var categories = document.querySelectorAll('.categories-container p input');
var clickedCategory;
categories.forEach(function (category) {
  category.addEventListener('change', function (e) {
    clickedCategory = e.target.value;
  });
});
adminPanelAddCategoryInput.addEventListener('n', function () {
  categoryAddedMsg.classList.remove('success_response');
  adminPanelAddCategoryInput.value = "";
});
adminPanelForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var productObj = {};
  var subCategory = {};

  if (clickedCategory) {
    // console.log(clickedCategory)
    productObj = {
      productname: productName.value,
      productprice: productPrice.value,
      // productimage: productImage.value,
      stockcount: stockCount.value,
      categoryname: clickedCategory,
      // subcategory: categoryName.value,
      description: description.value
    };
    subCategory = {
      subcategoryname: categoryName.value
    };
  } else {
    productObj = {
      productname: productName.value,
      productprice: productPrice.value,
      // productimage: productImage.value,
      stockcount: stockCount.value,
      categoryname: categoryName.value,
      description: description.value
    };
  }

  console.log(productObj);
  fetch('http://localhost:3333/product', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productObj: productObj,
      subCategory: subCategory
    })
  }).then(function (response) {
    return response.json();
  }).then(function (isValid) {
    if (isValid) {// categoryAddedMsg.classList.add('success_response');
    }
  })["catch"](function (err) {
    return console.log(err);
  });
}); // subcategory functionality

var addSubCatButton = document.querySelector('.category span');
var categoriesContainer = document.querySelector('.categories-container');
addSubCatButton.addEventListener('click', function () {
  categoriesContainer.classList.toggle('show');
});
/******/ })()
;