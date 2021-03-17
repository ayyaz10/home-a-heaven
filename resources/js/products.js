import { Notyf } from 'notyf';

const notyf = new Notyf({
    position: {x: 'right', y: 'center'},
    INotyfIcon: {
      color: 'blue',
    }
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
        // console.log(result)
        notyf.success('Item added to cart');
        cartCounter.innerText = result.totalQty;
}

async function sessionLocalStorage(){
     // for the first time creating cart and adding basic object structure
    //  console.log(localStorage)

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
        sessionLocalStorage(product);
    })
})