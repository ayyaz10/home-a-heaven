const reqByCategory = async (categoryQuery) => {
    const res = await fetch('http://localhost:3333/req-by-category', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            categoryQuery
        })
    })
    const response = await res.json();
}
const categoryQuery = JSON.parse(localStorage.getItem('categoryArray'));;
reqByCategory(categoryQuery)

async function updateCart(product, e) {
    const cartCounter = document.querySelector('.cart-count');
    console.log(product.item.product_id)
    const res = await fetch('http://localhost:3333/addToCart', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            product,
        })
    })
    const response = await res.json();
    cartCounter.innerText = response.totalQty;
}

const cartBtn = document.querySelector('.cart-btn')
    cartBtn.addEventListener('click', async (e) => {
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
    about.innerText = product.item.product_description
    image.src = `/assets/uploads/${product.item.image}`

}
loadContent();