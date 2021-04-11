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
const categories = document.querySelectorAll('.categories-container p input');

let clickedCategory;
categories.forEach(category => {
    category.addEventListener('change', (e) => {
        clickedCategory = e.target.value;
    })
})
adminPanelAddCategoryInput.addEventListener('n', ()=>{
    categoryAddedMsg.classList.remove('success_response');
    adminPanelAddCategoryInput.value = "";
})

adminPanelForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    let productObj = {};
    let subCategory = {};
    if(clickedCategory) {
        // console.log(clickedCategory)
        console.log(categoryName.value)
         productObj = {
            productname: productName.value,
            productprice: productPrice.value,
            // productimage: productImage.value,
            stockcount: stockCount.value,
            categoryname: clickedCategory,
            subcategoryname: categoryName.value,
            // subcategory: categoryName.value,
            description: description.value
        }
         subCategory = {
            subcategoryname: categoryName.value
        }
    } else {
         productObj = {
            productname: productName.value,
            productprice: productPrice.value,
            // productimage: productImage.value,
            stockcount: stockCount.value,
            categoryname: categoryName.value,
            description: description.value
        }
    }
    // console.log(productObj)

    fetch('http://localhost:3333/product', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productObj,
                subCategory
            })
    }).then(response => {
        return response.json()
    }).then(isValid => {
        if(isValid) {
            // categoryAddedMsg.classList.add('success_response');
        }
    }).catch(err => console.log(err))
})



// subcategory functionality

const addSubCatButton = document.querySelector('.category span');
const categoriesContainer = document.querySelector('.categories-container');
addSubCatButton.addEventListener('click', () => {
    categoriesContainer.classList.toggle('show');
});