// var myVar = setInterval(reloadPage, 1000);
// const reloadPage = () => {
//     window.location.reload()
// }
// setTimeout(()=>{
//     clearInterval(myVar)
// }, 2000)

const addToCart = document.querySelectorAll('.add-to-cart');
const categoryName = document.querySelector('.category-name');
categoryName.innerText = JSON.parse(localStorage.getItem('categoryArray'));
addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', async (e) => {
        let product = await JSON.parse(cartBtn.dataset.product);
        localStorage.setItem('productId', product.product_id)
        let items = {
            item: product
        }
        var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
        localStorage.setItem('itemsArray', JSON.stringify(items));
        for(let i = 0; i < oldItems.length; i++) {
            if((oldItems[i].item.product_id === items.item.product_id)){
                oldItems.push(items);
                localStorage.setItem('itemsArray', JSON.stringify(oldItems));
            }
        }
    })
})



// const select = document.querySelectorAll('option')
// select.forEach(each => {
//     // console.log(each.innerText)
//     each.addEventListener('onchange', (e)=>{
//         console.log(e.target)
//     })
// })

const sortBtn = document.querySelector('.sort-btn')
// console.log(btn)
sortBtn.addEventListener('click', async ()=>{
    const sortObj = {
        order: 'desc'
    }
    const toBeSorted = {
        column: 'product_name'
    }
    // console.log('helo')
    const response = await fetch('http://localhost:3333/sort', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            sortObj,
            toBeSorted
        })
     })
     const result = await response.json();
     console.log(result.isSet)
     if(result.isSet) {
         window.location.reload();
     }

})

const filterBtn = document.querySelector('.filter-btn')
filterBtn.addEventListener('click', async ()=>{
    const toBeFiltered = {
        filterCategory: 'Table'
    }
    localStorage.setItem('categoryArray', JSON.stringify('Table'))
    
    const response = await fetch('http://localhost:3333/sort', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            toBeFiltered,
            filter: true
        })
    })
    const categoryName = document.querySelector('.category-name');
    categoryName.innerText = JSON.parse(localStorage.getItem('categoryArray'))
     const result = await response.json();
     console.log(result.isSet)
     if(result.isSet) {
         window.location.reload();
     }
})







// const logout = document.querySelector('.logout');
// logout.addEventListener('click', ()=> {
//     location.reload();
//     reqByCategory()
//     location.reload();
// })

// reqByCategory()

// async function reqByCategory() {
//     const response = await fetch('http://localhost:3333/add-data', {
//         method: "post",
//         mode: 'cors',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             categoryName: JSON.parse(localStorage.getItem('categoryArray')),
//         })
//     })
// }