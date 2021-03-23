


async function reqByCategory(categoryName) {
    console.log('helo')
    // const categoryName = JSON.parse(localStorage.getItem('categoryArray'))
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
        // e.preventDefault();
        const categoryContainer = e.target.parentElement.parentElement;
        const categoryName = categoryContainer.firstElementChild.innerText;
        console.log(categoryName)
        // adding category data to localstorage
        var oldItems = JSON.parse(localStorage.getItem('categoryArray')) || [];
        localStorage.setItem('categoryArray', JSON.stringify(categoryName));
        reqByCategory(categoryName)
        // reqByCategory(categoryName)
    })
})
