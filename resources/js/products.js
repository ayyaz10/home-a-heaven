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
        console.log(result)
        notyf.success('Item added to cart');
        cartCounter.innerText = result.totalQty;
}

addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', async (e) => {
        // console.log(cartCounter)
        let product = await JSON.parse(cartBtn.dataset.product);
        updateCart(product);
    })
})