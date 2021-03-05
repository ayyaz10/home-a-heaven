const logoutButton = document.querySelector('.logout');

logoutButton.addEventListener('click', ()=>{
    function logout(){
        localStorage.removeItem('user_id')
        fetch('http://localhost:5500/auth/logout')
        .then(res => {
            return res.json();
        })
        .then(result => {
            window.location = '/signup-login'
        })
        }
    logout();
})

