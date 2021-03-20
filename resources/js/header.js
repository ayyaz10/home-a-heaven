const logoutHeader  = document.querySelector('#logout');
const loginHeader = document.querySelector('#login');
const registerHeader  = document.querySelector('#register');
const userId = JSON.parse(localStorage.getItem('user_id'))
// console.log(userId)
if(userId) {
    loginHeader.style.display = "none";
    registerHeader.style.display = "none";
    logoutHeader.style.display = "block";
} else {
    logoutHeader.style.display = "none";
}
// console.log(loginHeader)