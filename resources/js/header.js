// main menu getting products by category functionality
const headerMenu  = document.querySelectorAll('.main-menu li');
headerMenu.forEach(li => {
    li.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryContainer = e.target.innerText;
        const categoryName = document.querySelector('.category-name')
    // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        localStorage.setItem('categoryArray', JSON.stringify(categoryContainer));
        reqByCategory(e.target.innerText)
    })
})

async function reqByCategory(categoryName) {
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
    if(result.isAdded) {
        localStorage.removeItem('selectIndex')
        window.location = '/collections/products'
    }
}

const logoutHeader  = document.querySelector('#logout');
const loginHeader = document.querySelector('#login');
const userId = JSON.parse(localStorage.getItem('user_id'))
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    function logout(){
        localStorage.removeItem('user_id')
        localStorage.removeItem('role')
        fetch('http://localhost:3333/logout')
        .then(res => {
            return res.json();
        })
        .then(result => {
            window.location.reload()
            window.location.reload()
        })
        }

    logout();
})
if(userId) {
    loginHeader.style.display = "none";
    logoutHeader.style.display = "block";
} else {
    logoutHeader.style.display = "none";
}


// search functionality
let searchText;
const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})


// navigation hamburger menu
const menuIcon = document.querySelector('.menu');
const closeIcon = document.querySelector('.close-icon');
const menuContainer = document.querySelector('.menu-container');
menuIcon.addEventListener('click', () => {
    closeIcon.style.display = "block";
    menuContainer.style.display = "block";
    menuIcon.style.display = "none";
})

closeIcon.addEventListener('click', () => {
    closeIcon.style.display = "none";
    menuContainer.style.display = "none";
    menuIcon.style.display = "block";
})


const role = localStorage.getItem('role');
if(role === 'admin') {
   const mainMenu = document.querySelector('.main-menu');
   const search = document.querySelector('.search');
   const cart = document.querySelector('.cart');
   const account = document.querySelector('.account');
   mainMenu.style.display = "none";
   search.style.display = "none";
   cart.style.display = "none";
   account.style.display = "none";

} else {
    const manageProduct = document.querySelector('.manage-product');
    const manageCustOrders = document.querySelector('.manage-cust-orders');
    const manageCategories = document.querySelector('.manage-category');
    const manageSubCategories = document.querySelector('.manage-sub-category');
    manageCategories.style.display = "none";
    manageSubCategories.style.display = "none";
    manageProduct.style.display = "none";
    manageCustOrders.style.display = "none";
}