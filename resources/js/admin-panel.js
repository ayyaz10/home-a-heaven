const adminPanelForm = document.querySelector('#adminPanelForm')
const adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
const adminPanelAddCategoryInput = document.querySelector('#adminPanelForm p input');
const categoryAddedMsg = document.querySelector('.category_added_message');
const productName = adminPanelFormData[0];
const productPrice = adminPanelFormData[1];
const productImage = adminPanelFormData[2];
const stockCount = adminPanelFormData[3];
const categoryName = adminPanelFormData[4];
const description = document.querySelector('.product-description');
console.log(description)

adminPanelAddCategoryInput.addEventListener('n', ()=>{
    categoryAddedMsg.classList.remove('success_response');
    adminPanelAddCategoryInput.value = "";
})
adminPanelForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch('http://localhost:3333/product', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productname: productName.value,
                productprice: productPrice.value,
                // productimage: productImage.value,
                stockcount: stockCount.value,
                productcategory: categoryName.value,
                description: description.value
            })
    }).then(response => {
        return response.json()
    }).then(isValid => {
        if(isValid) {
            // categoryAddedMsg.classList.add('success_response');
        }
    }).catch(err => console.log(err))
})




