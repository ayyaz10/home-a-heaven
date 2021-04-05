// main menu getting products by category functionality
// const categoryName = JSON.parse(localStorage.getItem('categoryArray'))
const headerMenu  = document.querySelectorAll('.main-menu li');
headerMenu.forEach(li => {
    li.addEventListener('click', (e) => {
        // e.preventDefault();
        const categoryContainer = e.target.innerText;
        // console.log(categoryContainer)
        console.log(e.target.innerText)
        const categoryName = document.querySelector('.category-name')
        // console.log(categoryName)
    // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        localStorage.setItem('categoryArray', JSON.stringify(categoryContainer));
        // JSON.parse(localStorage.getItem('categoryArray'))
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
            // window.location.reload()
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





const search = document.querySelector('.search')
const btn = document.querySelector('.btn')
const input = document.querySelector('.input')

btn.addEventListener('click', () => {
    search.classList.toggle('active')
    input.focus()
})