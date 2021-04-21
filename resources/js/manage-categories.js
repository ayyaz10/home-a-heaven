// delete category
const deleteButton = document.querySelectorAll('.delete-category');
deleteButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const categoryName = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
        // console.log(categoryName)
        const isDeleteConfirm = confirm(`Are you sure to delete the product ${categoryName}`);
        if(isDeleteConfirm) {
            const categoryId = e.target.getAttribute("data-categoryid-type");
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

// edit category
// edit product
const editButton = document.querySelectorAll('.edit-category');
editButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const editModalCategoryId = e.target.getAttribute("data-categoryid-type");
        // const subCatId = e.target.getAttribute("data-subcatid-type");
        const res = await fetch('http://localhost:3333/edit-category', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                editModalCategoryId
            })
         })
         const response = await res.json();
         let editCategoryForm = document.querySelectorAll('.edit-category-form input');
         if(response.haveProduct) {
             const category = response.category;
             editCategoryForm[0].value = category.category_name;
                  // Get the modal
            var modal = document.getElementById("myModal");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // When the user clicks the button, open the modal 
            modal.style.display = "block";
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
                window.location.reload()
            }

            // When the user clicks anywhere outside of the modal, close it
            window.onclick = function(event) {
                if (event.target == modal) {
                window.location.reload()
                }
            }
        }
    //     //  update product
        const editForm = document.querySelector('#editCategoryForm');
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const categoryId = editModalCategoryId;
            const form = document.querySelector('.edit-category-form');
            let formData = new FormData(form)
            formData.append('categoryId', categoryId)
            // Display the key/value pairs
            // for (var pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]); 
            // }
            //  let productArray = [];
            // editProductForm.forEach(eachInput => {
            //     productArray.push(eachInput.value) 
            // })
            // productArray.push(textArea.value)
            // console.log(productArray)
            const res = await fetch('http://localhost:3333/edit-category', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                body:
                    formData
             })
             const response = await res.json();
             console.log(response)
             if(response.dbResponse.isUpdated) {
                alert(`${response.dbResponse.product[0].product_name} product has been updated!`)
                 const submitButton = document.querySelector('.submit-button')
                 submitButton.disabled = true;
                submitButton.style.background = "#5e5e5e";
                 window.location.reload();
             }
        })

    })
})