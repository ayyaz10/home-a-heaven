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
  fetch('http://localhost:3333/order', {
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
    if (data.customer) {
      document.querySelector('.cart').innerText = "";
      window.location = "http://localhost:3333/orders";
      localStorage.setItem('isOrdered', JSON.stringify(true));
    } else {
      localStorage.removeItem('productArray');
      document.querySelector('.cart').innerText = "";
      var userName = document.querySelector('.message span');
      userName.textContent = data.result[0].full_name + "!"; // Get the modal

      var modal = document.getElementById("myModal");
      var span = document.getElementsByClassName("close")[0];
      modal.style.display = "block";

      span.onclick = function () {
        modal.style.display = "none";
        window.location.reload();
      }; // When the user clicks anywhere outside of the modal, close it


      window.onclick = function (event) {
        if (event.target == modal) {
          window.location.reload();
        }
      };
    }
  });
});

var updateCheckoutPage = function updateCheckoutPage() {
  var products = JSON.parse(localStorage.getItem('productArray'));
  var subtotalText = document.querySelector('.subtotal-text');
  var subtotalAmount = document.querySelector('.subtotal-amount');
  var totalText = document.querySelector('.total-text');
  var totalAmount = document.querySelector('.total-amount');

  var createSummaryAreaHtml = function createSummaryAreaHtml(product) {
    var orderInforWrapper = document.querySelector('.order-info-wrapper');

    var createDiv = function createDiv() {
      return document.createElement('div');
    };

    var createH2 = function createH2() {
      return document.createElement('h2');
    };

    var createImage = function createImage() {
      return document.createElement('img');
    };

    var createSpan = function createSpan() {
      return document.createElement('span');
    };

    var order = createDiv();
    var productName = createH2();
    var price = createSpan();
    order.classList.add('order');
    productName.classList.add('product-name');
    price.classList.add('price');
    productName.innerText = product.productName;
    price.innerText = product.price; // image container section

    var imageContainer = createDiv();
    var image = createImage();
    imageContainer.classList.add('image');
    image.src = product.productImg;
    imageContainer.append(image);
    order.append(imageContainer);
    order.append(productName);
    order.append(price);
    orderInforWrapper.append(order);
  };

  products.forEach(function (product) {
    createSummaryAreaHtml(product);
  });

  for (var i = 0; i < products.length; i++) {
    subtotalText.innerText = 'Item Subtotal: ';
    subtotalAmount.innerText = products[i].totalAmount;
    totalText.innerText = 'Total: ';
    totalAmount.innerText = products[i].totalAmount;
  }
};

updateCheckoutPage();
/******/ })()
;