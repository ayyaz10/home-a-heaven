

const categoriesArray = document.querySelectorAll('.category');
categoriesArray.forEach(category => {
    category.addEventListener('click', async (e) => {
        e.preventDefault(e);
        const categoryContainer = e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText;
        // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        localStorage.setItem('categoryArray', JSON.stringify(categoryContainer));
        reqByCategory(JSON.parse(localStorage.getItem('categoryArray')))
    })
})

async function reqByCategory(categoryName) {
    const res = await fetch('http://localhost:3333/req-by-category', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryName
        })
    })
    const response = await res.json();
    console.log(response)
    if(response.isAdded) {
        window.location = 'collections/products';
    }

}
