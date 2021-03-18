// product counter
// const productPrice = document.querySelector('.price');
// const prices = [];
// const productPrice = document.querySelectorAll('.price')

// for(let i = 0; i < productPrice.length; i++) {
//     prices.push(parseInt(productPrice[i].innerText))
// }

// prices.push(productsPrice)
// console.log(productPrice)
const counterValue = document.querySelector('.counter-value');
const subtotalAmount = document.querySelector('.subtotal-amount');
const totalAmount = document.querySelector('.total-amount');
const addButton = document.querySelectorAll('.add-btn');
const subButton = document.querySelectorAll('.sub-btn');
const cartQty = document.querySelector('.cart-count');
let productId = 0;

const actualPrice = JSON.parse(localStorage.getItem('priceLisd'));


for(let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', (e) => {
        let counter = e.target.nextElementSibling;
        let price = e.target.parentElement.parentElement.firstElementChild;
        price.innerText = parseInt(price.innerText) + actualPrice[i];
        subtotalAmount.innerText = parseInt(subtotalAmount.innerText) + actualPrice[i];
        totalAmount.innerText = parseInt(totalAmount.innerText) + actualPrice[i];
        counter.innerText = parseInt(counter.innerText) + 1;
        cartQty.innerText = parseInt(cartQty.innerText) + 1;
        updateSession(e, counter);
    })
}

for(let i = 0; i < subButton.length; i++) {
    subButton[i].addEventListener('click', (e) => {
        let counter = e.target.parentElement.firstElementChild.nextElementSibling;
        let price = e.target.parentElement.parentElement.firstElementChild;
        // console.log(e.target.parentElement.parentElement.firstElementChild)
        if(counter.innerText <= 0) {
            price.innerText = 0;
            counter.innerText = 0;
        } else {
            price.innerText = parseInt(price.innerText) - actualPrice[i];
            subtotalAmount.innerText = parseInt(subtotalAmount.innerText) - actualPrice[i];
            totalAmount.innerText = parseInt(totalAmount.innerText) - actualPrice[i];
            counter.innerText = parseInt(counter.innerText) - 1;
            cartQty.innerText = parseInt(cartQty.innerText) - 1;
            updateSession(e, counter);
        }
    })
}




const removeItem = document.querySelectorAll('span.remove');
// const product = document.querySelector('.product-in-cart');
// const price = document.querySelector('.price')
// const data = JSON.parse(localStorage.getItem('obj'))

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


// removeItem.forEach((remove)=>{
// remove.addEventListener('click', async (e)=>{
    

// // remove.parentElement.parentElement.remove();
//     });
// })

const updateDelSession = async (e, ) => {
    let cartqty = document.querySelector('.cart-count');
    let productid = parseInt(e.target.parentElement.parentElement.attributes[1].value);
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
    const productid = parseInt(e.target.parentElement.parentElement.parentElement.attributes[1].value);
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
}
