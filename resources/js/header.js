// main menu getting products by category functionality
const headerMenu  = document.querySelectorAll('.main-menu li');
headerMenu.forEach(li => {
    li.addEventListener('click', (e) => {
        const categoryContainer = e.target.innerText;
    // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        localStorage.setItem('categoryArray', JSON.stringify(categoryContainer));
        reqByCategory(JSON.parse(localStorage.getItem('categoryArray')))
    })
})

async function reqByCategory(categoryName) {
    console.log(categoryName)
    const response = await fetch('http://localhost:3333/req-by-category', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryName
        })
    })
    const result = await response.json();
}


const logoutHeader  = document.querySelector('#logout');
const loginHeader = document.querySelector('#login');
const userId = JSON.parse(localStorage.getItem('user_id'))
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    function logout(){
        localStorage.removeItem('user_id')
        fetch('http://localhost:3333/logout')
        .then(res => {
            return res.json();
        })
        .then(result => {
            window.location.reload()
            window.location.reload()
            console.log('signout')
            console.log(result)
        })
        }
        // const result = await response.json();

    logout();
})
if(userId) {
    loginHeader.style.display = "none";
    logoutHeader.style.display = "block";
} else {
    logoutHeader.style.display = "none";
}

