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

const sortSelect = document.querySelectorAll('.sort-select');
// console.log(btn)
// sortSelect.forEach((each, i) => {
    // console.log(each[i])
    // sortSelect[0][0].innerText = JSON.parse(localStorage.getItem('sort'))
    const index = JSON.parse(localStorage.getItem('selectIndex'))
    
    for(let i = 0; i < sortSelect.length; i++) {
        console.log(sortSelect[i][index].setAttribute('selected', true))
        sortSelect[i].addEventListener('change', async (e) => {
       
        const getSelectedSort = async (e) => {
        if(e.target.value === 'alpha-asc') {
            localStorage.setItem('selectIndex', JSON.stringify(1));
            // sortSelect[i][1].setAttribute('selected')
                 console.log(i)
            // console.log(e.target)
            return {
                order: 'asc',
                column: 'product_name',
            }
        }
        if(e.target.value === 'alpha-desc') {
            localStorage.setItem('selectIndex', JSON.stringify(2));
            // sortSelect[i][2].setAttribute('selected')
            return {
                order: 'desc',
                column: 'product_name',
            }
        }
        if(e.target.value === 'price-asc') {
            localStorage.setItem('selectIndex', JSON.stringify(3));

            return {
                order: 'asc',
                column: 'price',
            }
        }
        if(e.target.value === 'price-desc') {
            localStorage.setItem('selectIndex', JSON.stringify(4));
            // sortSelect[i][4].setAttribute('selected')
            return {
                order: 'desc',
                column: 'price',
            }
        }
        if(e.target.value === 'date-desc') {
            localStorage.setItem('selectIndex', JSON.stringify(5));
            // sortSelect[i][5].setAttribute('selected')
            return {
                order: 'desc',
                column: 'created_at',
            }
        }
        if(e.target.value === 'date-asc') {
            console.log(e.target)
            localStorage.setItem('selectIndex', JSON.stringify(6));
            // sortSelect[i][6].setAttribute('selected')
            return {
                order: 'asc',
                column: 'created_at',
            }
        }
    }

    const selectedSort = await getSelectedSort(e);
    // console.log(selectedSort)
        const response = await fetch('http://localhost:3333/sort', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                selectedSort
            })
         })
         const result = await response.json();
         if(result.isSet) {
             window.location.reload();
         }
    
    })
}
// })


// const filterBtn = document.querySelector('.filter-btn')
// filterBtn.addEventListener('click', async ()=>{
//     const toBeFiltered = {
//         filterCategory: 'Table'
//     }
//     localStorage.setItem('categoryArray', JSON.stringify('Table'))
    
//     const response = await fetch('http://localhost:3333/sort', {
//         method: "post",
//         mode: 'cors',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             toBeFiltered,
//             filter: true
//         })
//     })
//     const categoryName = document.querySelector('.category-name');
//     categoryName.innerText = JSON.parse(localStorage.getItem('categoryArray'))
//      const result = await response.json();
//      console.log(result.isSet)
//      if(result.isSet) {
//          window.location.reload();
//      }
// })







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
