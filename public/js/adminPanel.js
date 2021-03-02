/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************************!*\
  !*** ./resources/js/adminPanel.js ***!
  \************************************/
var adminPanelForm = document.querySelector('#adminPanelForm');
var adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
var adminPanelAddCategoryInput = document.querySelector('#adminPanelForm p input');
var categoryAddedMsg = document.querySelector('.category_added_message');
var categoryName = adminPanelFormData[0];
var categoryThumbnail = adminPanelFormData[1];
adminPanelAddCategoryInput.addEventListener('n', function () {
  categoryAddedMsg.classList.remove('success_response');
  adminPanelAddCategoryInput.value = "";
});
adminPanelForm.addEventListener('submit', function (e) {
  e.preventDefault();
  fetch('http://localhost:5500/category', {
    method: "post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      categoryname: categoryName.value // thumbnail: categoryThumbnail.value

    })
  }).then(function (response) {
    return response.json();
  }).then(function (isValid) {
    if (isValid) {
      categoryAddedMsg.classList.add('success_response');
    }
  })["catch"](function (err) {
    return console.log(err);
  });
});
/******/ })()
;