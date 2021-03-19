async function updateCart(product, e) {
    const cartCounter = document.querySelector('.cart-count');
    // console.log(e.target.parent)
    const response = await fetch('http://localhost:3333/addToCart', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product
        })
    })
    const result = await response.json();
    
    
    // notyf.success('Item added to cart');
    // cartCounter.innerText = result.totalQty;
}

const cartBtn = document.querySelector('.cart-btn')

    cartBtn.addEventListener('click', async (e) => {
        let product = await JSON.parse(cartBtn.dataset.product);
        console.log(product)
        // updateCart(product, e);
        
    })