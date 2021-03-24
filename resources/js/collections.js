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

const categoriesArray = document.querySelectorAll('.category');
categoriesArray.forEach(category => {
    category.addEventListener('click', async (e) => {
        const categoryContainer = e.target.parentElement.parentElement;
        // adding category data to localstorage
        let categoryArray = JSON.parse(localStorage.getItem('categoryArray')) || " ";
        categoryArray = categoryContainer.firstElementChild.innerText;
        localStorage.setItem('categoryArray', JSON.stringify(categoryArray));
        reqByCategory(JSON.parse(localStorage.getItem('categoryArray')))
    })
})
