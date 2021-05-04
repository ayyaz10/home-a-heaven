// add to cart functionality
const addToCart = document.querySelectorAll('.add-to-cart');
const categoryName = document.querySelector('.category-name');
addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', async (e) => {
        let product = await JSON.parse(cartBtn.dataset.product);
        localStorage.removeItem('selectIndex')
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


const sortSelect = document.querySelectorAll('.sort-select');
    const index = JSON.parse(localStorage.getItem('selectIndex'))
    for(let i = 0; i < sortSelect.length; i++) {
        if(index) {
            sortSelect[i][index].setAttribute('selected', true)
        }
        sortSelect[i].addEventListener('change', async (e) => {
        const getSelectedSort = async (e) => {
        if(e.target.value === 'alpha-asc') {
            localStorage.setItem('selectIndex', JSON.stringify(1));
            return {
                order: 'asc',
                column: 'product_name',
            }
        }
        if(e.target.value === 'alpha-desc') {
            localStorage.setItem('selectIndex', JSON.stringify(2));
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
            return {
                order: 'desc',
                column: 'price',
            }
        }
        if(e.target.value === 'date-desc') {
            localStorage.setItem('selectIndex', JSON.stringify(5));
            return {
                order: 'desc',
                column: 'created_at',
            }
        }
        if(e.target.value === 'date-asc') {
            localStorage.setItem('selectIndex', JSON.stringify(6));
            return {
                order: 'asc',
                column: 'created_at',
            }
        } else {
            return false
        }
    }
    const selectedSort = await getSelectedSort(e);
    if(selectedSort) {
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
    }
})
}


const filterSelect = document.querySelectorAll('.filter-select');

for(let i = 0; i < filterSelect.length; i++) {
    filterSelect[i].addEventListener('change', async (e) => {
        const getSelectFilter = async(e) => {
            return e.target.value;
        }
        const toBeFiltered = await getSelectFilter(e)
        if(toBeFiltered !== 'filter') {
            const res = await fetch('http://localhost:3333/sort', {
                method: "post",
                mode: 'cors',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    toBeFiltered
                })
             })
             const response = await res.json();
             console.log(response)
             if(response.isSet) {
                 window.location.reload();
             }
        }
    })
}
