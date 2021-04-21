// delete category

const deleteButton = document.querySelectorAll('.delete-category');
deleteButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const categoryName = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
        console.log(categoryName)
        const isDeleteConfirm = confirm(`Are you sure to delete the product ${categoryName}`);
        if(isDeleteConfirm) {
            const categoryId = e.target.getAttribute("data-productid-type");
            console.log(categoryId)
            const res = await fetch('http://localhost:3333/delete-category', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    categoryId
                })
             })
             const response = await res.json();
             if(response.dbDelCatResponse.isDeleted) {
                 window.location.reload();
             }
        }
    })
})
