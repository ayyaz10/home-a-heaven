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
            updateSession(e, counter);
        }
    })
}




const removeItem = document.querySelectorAll('span.remove');
const product = document.querySelector('.product-in-cart');
const price = document.querySelector('.price')
const data = JSON.parse(localStorage.getItem('obj'))

removeItem.forEach((remove)=>{
remove.addEventListener('click', async (e)=>{
    const id = document.querySelector('.product-in-cart')
    // const price = e.target
    const price = parseInt(e.target.parentElement.firstElementChild.innerText);

    const productId = e.target.parentElement.parentElement.attributes[1].value;
    const counterVal = parseInt(e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText);
    const subtotal = parseInt(subtotalAmount.innerText);
    const total = parseInt(totalAmount.innerText);

    const newPrice = price * counterVal;

    const obj = {
        productId,
        counterVal,
        price,
        subtotal,
        total,
    };
    
    // console.log(obj)

    const response = await fetch('http://localhost:3333/updates', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            obj
    })
})
            
            // remove.parentElement.parentElement.remove();
            
            
            
            // const data = await fetch('http://localhost:3333/getSessionData')
            // const session = await data.json();
            // for(let product of Object.values(session)) {
                // // console.log(product.items)
                // }
        removeFromDb()
    });
})


    const updateSession = async (e, counter) => {
        const price = parseInt(e.target.parentElement.parentElement.firstElementChild.innerText);
        const cartqty = parseInt(document.querySelector('.cart-count').innerText);
        const productid = parseInt(e.target.parentElement.parentElement.parentElement.attributes[1].value);
        const counterval = parseInt(counter.innerText);
        const subtotal = parseInt(subtotalAmount.innerText);
        let total = parseInt(totalAmount.innerText);

        const obj = { productid, counterval, price,cartqty, subtotal, total};
        const response = await fetch('http://localhost:3333/editCartValues', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(obj)
        })
        const result = await response.json();
    }
