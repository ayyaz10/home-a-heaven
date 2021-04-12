// main menu getting products by category functionality
// const categoryName = JSON.parse(localStorage.getItem('categoryArray'))
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
            // console.log('signout')
            // console.log(result)
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

// search functionality
let searchText;
const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})

// search backend

// const searchInput = document.querySelector('#input-search')
// searchInput.addEventListener('keyup', (e) => {
//     // console.log(e.target.value)
//     if(e.key === 'Enter') {
//         searchText = e.target.value;
//         // console.log(searchText)
//         searchDB(searchText)
//         localStorage.setItem('search', JSON.stringify(true));
//         localStorage.setItem('searchProduct', JSON.stringify(searchText));
//     }
// })


// async function searchDB(searchText) {
//     const response = await fetch('http://localhost:3333/search-query', {
//         method: "post",
//         mode: 'cors',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             searchText
//         })
//     })
//     const result = await response.json();
//     // if(result)
//     if(result.validText) {
//         window.location.reload();

//     }

// }