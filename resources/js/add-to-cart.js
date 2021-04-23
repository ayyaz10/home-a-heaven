const categoryQuery = JSON.parse(localStorage.getItem('categoryArray'));;
// // categoryName.innerText = categoryQuery;

reqByCategory(categoryQuery)
async function reqByCategory(categoryQuery) {
    // const categoryName = JSON.parse(localStorage.getItem('categoryArray'))
    const response = await fetch('http://localhost:3333/req-by-category', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryQuery
        })
    })
    const result = await response.json();
    
    
}



async function updateCart(product, e) {
    const cartCounter = document.querySelector('.cart-count');
    console.log(product.item.product_id)
    const response = await fetch('http://localhost:3333/addToCart', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product,
            // productid: product.item.product_id,
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
        const product = JSON.parse(localStorage.getItem('itemsArray'));
        const heading = document.querySelector('.product-name');
        const price = document.querySelector('.price');
        const oldPrice = document.querySelector('.old-price')
        const about = document.querySelector('.about-paragraph');
        const image = document.querySelector('.product-image img');
        heading.innerText = product.item.product_name
        console.log(product)
        if(product.item.discount.length > 0) {
            price.innerText = product.item.discount;
            oldPrice.innerText = product.item.price;
            oldPrice.style.display = "block";
        } else {
            price.innerText = product.item.price;
        }
        // if(product.item.discount.length)
        about.innerText = product.item.product_description
        image.src = `/assets/uploads/${product.item.image}`

    }
    loadContent();


// stops user to go back
    // if (history.pushState) {
    //     //Chrome and modern browsers
    //     history.pushState(null, document.title, location.href);
    //     window.addEventListener('popstate', function (event) {
    //         history.pushState(null, document.title, location.href);
    //     });
    // }
    // else {
    //     //IE
    //     history.forward();
    // }