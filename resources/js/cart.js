const productName = document.querySelector('.product-name');
const productImg = document.querySelector('.img');
const productPrice = document.querySelector('.price');
const counterValue = document.querySelector('.counter-value');
const subtotalAmount = document.querySelector('.subtotal-amount');
const totalAmount = document.querySelector('.total-amount');
const cartQty = document.querySelector('.cart-count');
const addButton = document.querySelectorAll('.add-btn');
const subButton = document.querySelectorAll('.sub-btn');
let productId = 0;

const actualPrice = JSON.parse(localStorage.getItem('priceLisd'));
const checkoutBtn = document.querySelector('.checkout-button');

checkoutBtn.addEventListener('click', () => {
    const productName = document.querySelectorAll('.product-name');
    const productImg = document.querySelectorAll('.product-image-thumb img');
    const productPrice = document.querySelectorAll('.price');
    const counterValue = document.querySelectorAll('.counter-value');
    const totalAmount = document.querySelector('.total-amount');
    const cartQty = document.querySelector('.cart-count');

    if(!JSON.parse(localStorage.getItem('productArray'))) {
        productArray = [{
            productName: '',
            productImg: '',
            price: 0,
            counter: 0,
            totalAmount: 0,
        }]
    }
    let productArray = [];
    for(let i = 0; i < productName.length; i++) {
         productArray.push({
            productName: productName[i].innerText,
            productImg: productImg[i].src,
            price: productPrice[i].innerText,
            counter: counterValue[i].innerText,
            totalAmount: totalAmount.innerText,
        })
    }
    localStorage.setItem('productArray', JSON.stringify(productArray));
})




for(let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', (e) => {
        let productPrice = parseInt(e.target.parentElement.parentElement.parentElement.attributes[1].value); 
        console.log(productPrice)
        let counter = e.target.nextElementSibling;
        let price = e.target.parentElement.parentElement.firstElementChild;
        const total = parseInt(counter.innerText * price.innerText);
        //  const product = JSON.parse(localStorage.getItem('itemsArray'));
        //  console.log(product)

        price.innerText = parseInt(price.innerText) + productPrice;
        subtotalAmount.innerText = parseInt(subtotalAmount.innerText) + productPrice;
        totalAmount.innerText = parseInt(totalAmount.innerText) + productPrice;
        counter.innerText = parseInt(counter.innerText) + 1;
        cartQty.innerText = parseInt(cartQty.innerText) + 1;
        updateSession(e, counter);
    })
}

for(let i = 0; i < subButton.length; i++) {
    subButton[i].addEventListener('click', (e) => {
        let productPrice = parseInt(e.target.parentElement.parentElement.parentElement.attributes[1].value); 
        let counter = e.target.parentElement.firstElementChild.nextElementSibling;
        let price = e.target.parentElement.parentElement.firstElementChild;
        // console.log(e.target.parentElement.parentElement.firstElementChild)
        if(counter.innerText <= 0) {
            price.innerText = 0;
            counter.innerText = 0;
        } else {
            price.innerText = parseInt(price.innerText) - productPrice;
            subtotalAmount.innerText = parseInt(subtotalAmount.innerText) - productPrice;
            totalAmount.innerText = parseInt(totalAmount.innerText) - productPrice;
            counter.innerText = parseInt(counter.innerText) - 1;
            cartQty.innerText = parseInt(cartQty.innerText) - 1;
            updateSession(e, counter);
        }
    })
}


const getProductDetailFromSession = async () => {
    const response = await fetch('http://localhost:3333/getProductDetail');
    const productDetail = await response.json();
    console.log(productDetail)
}

const removeItem = document.querySelectorAll('span.remove');
for(let i = 0; i < removeItem.length; i++) {
    removeItem[i].addEventListener('click', async (e) => {
        let price = e.target.parentElement.firstElementChild;
        let counterval = e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling;
        let subtotal = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.firstElementChild.nextElementSibling;
        let total = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.nextElementSibling;
        let cartqty = parseInt(document.querySelector('.cart-count').innerText);
        total.innerText = total.innerText - price.innerText;
        subtotal.innerText = subtotal.innerText - price.innerText;
        cartqty = cartqty - counterval.innerText;

        updateDelSession(e);
        removeItem[i].parentElement.parentElement.remove();

})
}

const updateDelSession = async (e, ) => {
    let cartqty = document.querySelector('.cart-count');
    let productid = parseInt(e.target.attributes[1].value);
    let counterval = parseInt(e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText);
    const obj = { productid };
    const response = await fetch('http://localhost:3333/removeCartItem', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
     })
     try {
         const result = await response.json();
         console.log(result)
         if(result.totalQty < 1) {
            location += '';
         }
         cartqty.innerText = result.totalQty;
     } catch (error) {
        //  console.log(error)
     }
}

const updateSession = async (e, counter) => {
    const price = parseInt(e.target.parentElement.parentElement.firstElementChild.innerText);
    const cartqty = parseInt(document.querySelector('.cart-count').innerText);
    const productid = parseInt(e.target.attributes[1].value);
    const counterval = parseInt(counter.innerText);
    const subtotal = parseInt(subtotalAmount.innerText);
    let total = parseInt(totalAmount.innerText);
    const obj = { productid, counterval, price, cartqty, subtotal, total};
    const response = await fetch('http://localhost:3333/editCartValues', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    })
    const result = await response.json();
    // console.log(result)
}
