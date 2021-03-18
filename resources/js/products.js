import { Notyf } from 'notyf';

const notyf = new Notyf({
    position: {x: 'right', y: 'center'},
});

const addToCart = document.querySelectorAll('.add-to-cart');



async function updateCart(product) {
    const cartCounter = document.querySelector('.cart-count');
    const response = await fetch('http://localhost:3333/updateCart', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product
        })
    })
        const result = await response.json();
        
        notyf.success('Item added to cart');
        cartCounter.innerText = result.totalQty;
}

async function sessionLocalStorage(e){

    const products = document.querySelectorAll('.products')
    const productPrice = document.querySelectorAll('.product-price');
    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
    productPrice.forEach(each => {
        oldItems.push(parseInt(each.innerText))
        localStorage.setItem('priceLisd', JSON.stringify(oldItems))
    })
        
        // check if item does not exist in the cart
        //   let cart = product;
        const response = await fetch('http://localhost:3333/getSessionData')
        const result = await response.json();
        // const obj = { items: {}, totalQty: 3, totalPrice: 0, }
        localStorage.setItem('obj', JSON.stringify(result))
        
    }

addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', async (e) => {
        // console.log(cartCounter)
        let product = await JSON.parse(cartBtn.dataset.product);
        updateCart(product);
        sessionLocalStorage(e);

        
    })
})

// {
//     items: {
//         '29': { item: [Object], price: 1000, qty: 1 },
//         '30': { item: [Object], price: 4000, qty: 4 },
//         '31': { item: [Object], price: 4000, qty: 4 }
//     },
//     totalQty: 60,
//     totalPrice: 62600
//   }
// {
//     productid: 30,
//     counterval: 4,
//     price: 4000,
//     cartqty: 35,
//     subtotal: 36800,
//     total: 36800
//   }

//   <%= product.item.product.price * product.qty %>