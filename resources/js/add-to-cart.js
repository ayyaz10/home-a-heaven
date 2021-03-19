async function updateCart(product, e) {
    const cartCounter = document.querySelector('.cart-count');
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
    console.log(result)
    
    
    // notyf.success('Item added to cart');
    cartCounter.innerText = result.totalQty;
}

const cartBtn = document.querySelector('.cart-btn')

    cartBtn.addEventListener('click', async (e) => {
        // let product = await JSON.parse(cartBtn.dataset.product);
        const product = JSON.parse(localStorage.getItem('itemsArray'));
        console.log(product)
        updateCart(product, e);
        
    })

    const loadContent = () => {
        const item = JSON.parse(localStorage.getItem('itemsArray'));
        const heading = document.querySelector('.product-name');
        const price = document.querySelector('.price')
        const about = document.querySelector('.about-paragraph');
        const image = document.querySelector('.product-image');
        heading.innerText = item.item.product_name
        price.innerText = item.item.price
        about.innerText = item.item.product_description
        image.src = `assets/${item.item.image}`

    }
    loadContent();