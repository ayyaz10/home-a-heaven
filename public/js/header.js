/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/header.js ***!
  \********************************/
var logoutHeader = document.querySelector('#logout');
var loginHeader = document.querySelector('#login'); // const registerHeader  = document.querySelector('#register');

var userId = JSON.parse(localStorage.getItem('user_id'));
var logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', function () {
  function logout() {
    localStorage.removeItem('user_id');
    fetch('http://localhost:3333/logout').then(function (res) {
      return res.json();
    }).then(function (result) {
      window.location.reload();
      console.log('signout');
      console.log(result);
    });
  }

  logout();
});

if (userId) {
  loginHeader.style.display = "none"; // registerHeader.style.display = "none";

  logoutHeader.style.display = "block";
} else {
  logoutHeader.style.display = "none";
}
/******/ })()
;