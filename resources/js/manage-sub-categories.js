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

// delete sub category row
const delSubCategoryBtn = document.querySelectorAll('.delete-sub-category');
delSubCategoryBtn.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const subCategoryName = e.target.parentElement.parentElement.parentElement.firstElementChild.innerText;
        console.log(subCategoryName)
        // console.log(categoryName)
        const isDeleteConfirm = confirm(`Are you sure to delete the sub category ${subCategoryName}`);
        if(isDeleteConfirm) {
            const subCategoryId = e.target.getAttribute("data-subcategoryid-type");
            const res = await fetch('http://localhost:3333/delete-sub-category', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subCategoryId
                })
             })
             const response = await res.json();
             console.log(response)
             if(response.dbDelSubCatResponse.isDeleted) {
                 window.location.reload();
             }
        }
    })
})

// edit sub category

const editButton = document.querySelectorAll('.edit-sub-category');
editButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const editModalSubCategoryId = e.target.getAttribute("data-subcategoryid-type");
        // const categoryId = e.target.getAttribute("data-categoryid-type");
        const res = await fetch('http://localhost:3333/edit-sub-category', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                editModalSubCategoryId
            })
         })
         const response = await res.json();
         let editSubCategoryForm = document.querySelectorAll('.edit-subcategory-form input');
         const subCategory = response.subCategory;
         console.log(editSubCategoryForm)
         if(response.haveProduct) {
            editSubCategoryForm[0].value = subCategory.sub_cat_name;
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
        //  update product
        const editForm = document.querySelector('#editSubCategoryForm');
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const subCategjoryId = editModalSubCategoryId;
            const form = document.querySelector('.edit-subcategory-form');
            let formData = new FormData(form)
            formData.append('subCategoryId', subCategjoryId)
            const res = await fetch('http://localhost:3333/edit-sub-category', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                body:
                    formData
             })
             const response = await res.json();
             if(response.dbResponse.isUpdated) {
                 console.log(response)
                alert(`${response.dbResponse.subCategory.sub_cat_name} sub category has been updated!`)
                 const submitButton = document.querySelector('.submit-button')
                 submitButton.disabled = true;
                submitButton.style.background = "#5e5e5e";
                 window.location.reload();
             }
        })

    })
})