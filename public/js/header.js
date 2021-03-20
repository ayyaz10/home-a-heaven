/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************!*\
  !*** ./resources/js/header.js ***!
  \********************************/
var logoutHeader = document.querySelector('#logout');
var loginHeader = document.querySelector('#login');
var registerHeader = document.querySelector('#register');
var userId = JSON.parse(localStorage.getItem('user_id')); // console.log(userId)

if (userId) {
  loginHeader.style.display = "none";
  registerHeader.style.display = "none";
  logoutHeader.style.display = "block";
} else {
  logoutHeader.style.display = "none";
} // console.log(loginHeader)
/******/ })()
;