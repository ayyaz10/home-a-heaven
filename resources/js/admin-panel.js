const adminPanelForm = document.querySelector('#adminPanelForm')
const adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
const adminPanelAddCategoryInput = document.querySelector('#adminPanelForm p input');
const categoryAddedMsg = document.querySelector('.category_added_message');
const productName = adminPanelFormData[0];
const productPrice = adminPanelFormData[1];
const productDiscountPrice = adminPanelFormData[2];
const productImage = adminPanelFormData[3];
const stockCount = adminPanelFormData[4];
const categoryName = adminPanelFormData[5];
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

// adminPanelForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//         // getting and uploading image file to server
//         const fileField = document.querySelector('input[type="file"]');
//         let formData = new FormData();
//         formData.append('prodImage', fileField.files[0]);
//         const res = await fetch('http://localhost:3333/product', {
//             method: 'post',
//             body: formData
//          })
//         const result = await res.json();
// })
// adminPanelForm.addEventListener('submit', async (e)=>{
//     e.preventDefault();
//          // getting and uploading image file to server
//          const fileField = document.querySelector('input[type="file"]');
//          let formData = new FormData();
//          formData.append('prodImage', fileField.files[0]);
//          const res = await fetch('http://localhost:3333/upload', {
//              method: 'post',
//              body: formData
//           })
//           const result = await res.json();
//           console.log(result)
//  })

adminPanelForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // getting and sending form text data to server
    const fileField = document.querySelector('input[type="file"]');
    let formData = new FormData()
    let productObj = {};
    let subCategory = {};
    if(clickedCategory) {
        formData.append('prodImage', fileField.files[0]);
        formData.append('productname', productName.value)
        formData.append('productdiscountprice', productDiscountPrice.value)
        formData.append('productprice', productPrice.value)
        formData.append('stockcount', stockCount.value)
        formData.append('categoryname', clickedCategory)
        formData.append('subcategoryname', categoryName.value)
        formData.append('description', description.value)
    } else {
        formData.append('prodImage', fileField.files[0]);
        formData.append('productname', productName.value)
        formData.append('productprice', productPrice.value)
        formData.append('productdiscountprice', productDiscountPrice.value)
        formData.append('stockcount', stockCount.value)
        formData.append('categoryname', categoryName.value)
        formData.append('description', description.value)
    }
try {
    const res = await fetch('http://localhost:3333/product', {
        method: "post",
        body: formData
    })
    const response = await res.json();
    if(response.isDbResponse && response.status.product) {
        alert(`${productName.value} product has been added!`)
    } else if(response.isDbResponse && response.status.productAndCategory) {
        alert(`${productName.value} product and ${ categoryName.value } category has been added!`)
    } else if(response.isDbResponse && response.status.productAndSubCategory) {
        alert(`${productName.value} product and ${ categoryName.value } sub category has been added!`)
    } else {
        alert(`${productName.value} is already exists in database!`)
    }
    const submitButton = document.querySelector('.submit-button')
    submitButton.disabled = true;
    submitButton.style.background = "#5e5e5e";
    window.location.reload();
} catch (error) {
    console.error(error)
}
})



// subcategory functionality

const addSubCatButton = document.querySelector('.category span');
const categoriesContainer = document.querySelector('.categories-container');
addSubCatButton.addEventListener('click', () => {
    categoriesContainer.classList.toggle('show');
});