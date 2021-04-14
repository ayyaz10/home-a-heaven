const leftPanel = document.querySelector('.left-panel');
// const header = document.querySelector('.main_header')
// let headerHeight = header.offsetHeight;

window.onscroll = function (e) {
    if(window.scrollY > 0) {
        leftPanel.style.top = 0;
    } else {
        leftPanel.style.top = "initial";
    }
};

// delete product

const deleteButton = document.querySelectorAll('.delete-product');
deleteButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
        const productName = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.innerText;
        const isDeleteConfirm = confirm(`Are you sure to delete the product ${productName}`);
        if(isDeleteConfirm) {
            const productId = e.target.getAttribute("data-productid-type")
            const res = await fetch('http://localhost:3333/delete-product', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId
                })
             })
             const response = await res.json();
             if(response.dbResponse.isDeleted) {
                 window.location.reload();
             }
        }
    })
})


// edit product
const editButton = document.querySelectorAll('.edit-product');
editButton.forEach(eachButton => {
    eachButton.addEventListener('click', async (e) => {
   

        const editModalProductId = e.target.getAttribute("data-productid-type");
        const subCatId = e.target.getAttribute("data-subcatid-type");
      
        const res = await fetch('http://localhost:3333/edit-product', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                editModalProductId
            })
         })
         const response = await res.json();
         let editProductForm = document.querySelectorAll('.edit-product-form input');
         let textArea = document.querySelector('.product-description');
         if(response.haveProduct) {
             const product = response.product;
             editProductForm[0].value = product.product_name;
             editProductForm[1].value = product.price;
             editProductForm[3].value = product.inStock;
             editProductForm[4].value = product.category_name;
             editProductForm[5].value = product.sub_cat_name;
             textArea.value = product.product_description;
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
        const editForm = document.querySelector('#editProductForm');
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
           const productId = editModalProductId;
        //    console.log(productId)
             let productArray = [];
            editProductForm.forEach(eachInput => {
                productArray.push(eachInput.value) 
            })
            productArray.push(textArea.value)
            const res = await fetch('http://localhost:3333/edit-product', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    productId,
                    subCatId,
                    productArray
                })
             })
             const response = await res.json();
             if(response.dbResponse.isUpdated) {
                 window.location.reload();
             }
        })

    })
})
