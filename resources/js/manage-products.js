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
        const isConfirm = confirm(`Are you sure to delete the product ${productName}`);
        if(isConfirm) {
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
