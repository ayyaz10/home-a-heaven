/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************!*\
  !*** ./resources/js/checkout.js ***!
  \**********************************/
var shippingForm = document.querySelector("#shipping-form");
var shippingFormData = document.querySelectorAll("#shipping-form input");
var countryData = document.querySelectorAll(".form-control option");
shippingForm.addEventListener('submit', function (e) {
  e.preventDefault();
  var fullName = shippingFormData[0].value;
  var email = shippingFormData[1].value;
  var address = shippingFormData[2].value;
  var city = shippingFormData[3].value;
  var phone = shippingFormData[4].value;
  fetch('http://localhost:3333/shipping', {
    method: "post",
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      fullname: fullName,
      email: email,
      address: address,
      city: city,
      phone: phone
    })
  }).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data); // if(data.isError) {
    // }
  });
});
/******/ })()
;