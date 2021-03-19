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
    // console.log(result)
    
    
    // notyf.success('Item added to cart');
    cartCounter.innerText = result.totalQty;
}

const cartBtn = document.querySelector('.cart-btn')

    cartBtn.addEventListener('click', async (e) => {
        // let product = await JSON.parse(cartBtn.dataset.product);
        const product = JSON.parse(localStorage.getItem('itemsArray'));
        updateCart(product, e);
        addPriceToLocalStorage();
    })

    const addPriceToLocalStorage = () => {
        const productPrice = document.querySelector('.price');
        console.log(productPrice)
        var oldItems = JSON.parse(localStorage.getItem('priceList')) || [];

            oldItems.push(parseInt(productPrice.innerText))
            localStorage.setItem('priceList', JSON.stringify(oldItems))

        // const product = JSON.parse(localStorage.getItem('itemsArray'));
        // var oldItems = JSON.parse(localStorage.getItem('priceList')) || [];
        // oldItems.push(product)
        // localStorage.setItem('priceList', JSON.stringify(oldItems))
        // let productArray = JSON.parse(localStorage.getItem('priceList'))
        // productArray.forEach((p)=>{
        //     if(p.item.product_id !== product.item.product_id){
        //         oldItems.push(product)
        //         localStorage.setItem('priceList', JSON.stringify(oldItems))
        //     }
        // })
    }

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