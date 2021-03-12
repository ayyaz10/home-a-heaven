/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************!*\
  !*** ./resources/js/index.js ***!
  \*******************************/
var logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', function () {
  function logout() {
    localStorage.removeItem('user_id');
    fetch('http://localhost:3333/auth/logout').then(function (res) {
      return res.json();
    }).then(function (result) {
      window.location = '/signup-login';
    });
  }

  logout();
});
/******/ })()
;