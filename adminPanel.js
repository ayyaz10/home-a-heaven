const adminPanelForm = document.querySelector('#adminPanelForm')
const adminPanelFormData = document.querySelectorAll('#adminPanelForm input');
const categoryName = adminPanelFormData[0];
const categoryThumbnail = adminPanelFormData[1];


adminPanelForm.addEventListener('submit', (e)=>{
    // console.log(categoryName.value)
    e.preventDefault();
    // console.log(categoryName)
    fetch('http://localhost:5500/category', {
        method: "post",
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                categoryname: categoryName.value,
                // thumbnail: categoryThumbnail.value
            })
    }).then(response => {
        return response.json()
    }).then(data => {
    }).catch(err => console.log(err))
})


