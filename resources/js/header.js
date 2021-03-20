const logoutHeader  = document.querySelector('#logout');
const loginHeader = document.querySelector('#login');
const registerHeader  = document.querySelector('#register');
const userId = JSON.parse(localStorage.getItem('user_id'))
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', ()=>{
    function logout(){
        localStorage.removeItem('user_id')
        fetch('http://localhost:3333/logout')
        .then(res => {
            return res.json();
        })
        .then(result => {
            window.location.reload();
            console.log('signout')
            console.log(result)
        })
        }
    logout();
})
// console.log(userId)
if(userId) {
    loginHeader.style.display = "none";
    registerHeader.style.display = "none";
    logoutHeader.style.display = "block";
} else {
    logoutHeader.style.display = "none";
}
// console.log(loginHeader)


