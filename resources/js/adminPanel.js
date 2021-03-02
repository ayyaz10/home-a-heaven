const adminPanelForm = document.querySelector('#adminPanelForm')
const adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
const adminPanelAddCategoryInput = document.querySelector('#adminPanelForm p input');
const categoryAddedMsg = document.querySelector('.category_added_message');
const categoryName = adminPanelFormData[0];
const categoryThumbnail = adminPanelFormData[1];

adminPanelAddCategoryInput.addEventListener('n', ()=>{
    categoryAddedMsg.classList.remove('success_response');
    adminPanelAddCategoryInput.value = "";
})
adminPanelForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    fetch('http://localhost:5500/category', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                categoryname: categoryName.value,
                // thumbnail: categoryThumbnail.value
            })
    }).then(response => {
        return response.json()
    }).then(isValid => {
        if(isValid) {
            categoryAddedMsg.classList.add('success_response');
        }
    }).catch(err => console.log(err))
})




