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
adminPanelForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
         // getting and uploading image file to server
         const fileField = document.querySelector('input[type="file"]');
         let formData = new FormData();
         formData.append('prodImage', fileField.files[0]);
         const res = fetch('http://localhost:3333/upload', {
             method: 'post',
             body: formData
          })
        //   const result = res.json();
        //   console.log(result)
 })
adminPanelForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    // getting and sending form text data to server

    let productObj = {};
    let subCategory = {};
    if(clickedCategory) {
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
        // console.log(categoryName)
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
    
try {
    const res = await fetch('http://localhost:3333/product', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                productObj,
                subCategory
            })
    })
    const response = await res.json();
    console.log(response)
    if(response.isUpdated) {
        // alert(`${response.status.dbProduct[0].product_name} has been added!`)
        window.location.reload();
    }
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