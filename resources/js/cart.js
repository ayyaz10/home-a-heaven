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
const actualPrice = JSON.parse(localStorage.getItem('priceLisd'));

for(let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', (e) => {
        let counter = e.target.nextElementSibling;
        // let price = e.target.parentElement.parentElement.firstElementChild;
        price.innerText = parseInt(price.innerText) + actualPrice[i];
        subtotalAmount.innerText = parseInt(subtotalAmount.innerText) + actualPrice[i];
        totalAmount.innerText = parseInt(totalAmount.innerText) + actualPrice[i];
        counter.innerText = parseInt(counter.innerText) + 1;
    })
}
for(let i = 0; i < subButton.length; i++) {
    subButton[i].addEventListener('click', (e) => {
        const counter = e.target.parentElement.firstElementChild.nextElementSibling;
        let price = e.target.parentElement.parentElement.firstElementChild;
        console.log(e.target.parentElement.parentElement.firstElementChild)
        if(counter.innerText <= 0) {
            price.innerText = 0;
            counter.innerText = 0;
        } else {
            price.innerText = parseInt(price.innerText) - actualPrice[i];
            subtotalAmount.innerText = parseInt(subtotalAmount.innerText) - actualPrice[i];
            totalAmount.innerText = parseInt(totalAmount.innerText) - actualPrice[i];
            counter.innerText = Number(counter.innerText) - 1;
        }
    })
}




const removeItem = document.querySelectorAll('span.remove');
const product = document.querySelector('.product-in-cart');
const price = document.querySelector('.price')
const data = JSON.parse(localStorage.getItem('obj'))
    // console.log(data)
async function removeFromDb(){
       
            // cart.items[req.body.product.product_id].qty = cart.items[req.body.product.product_id].qty + 1;
            // cart.totalQty  = cart.totalQty + 1;
            // cart.totalPrice = cart.totalPrice + req.body.product.price;

        // const response = await fetch('http://localhost:3333/updateCart', {
        //     method: "post",
        //     mode: 'cors',
        //     credentials: 'include',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         product
        //     })
        // })
    }

    

    // console.log(removeItem)
    removeItem.forEach((remove)=>{
            remove.addEventListener('click', async (e)=>{
                const id = document.querySelector('.product-in-cart')
                // const price = e.target
                const price = parseInt(e.target.parentElement.firstElementChild.innerText);

                const productId = e.target.parentElement.parentElement.attributes[1].value;
                const counterVal = parseInt(e.target.parentElement.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerText);
                console.log(counterVal)
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

        //   if(!cart.items[req.body.product.product_id]) {
    //     cart.items[req.body.product.product_id] = { 
    //       item: req.body,
    //       qty: 1,
    //     }
    //       cart.totalQty = cart.totalQty + 1;
    //       cart.totalPrice = cart.totalPrice + req.body.product.price;
    //       console.log(cart.totalPrice)
    //   } else {
    //     cart.items[req.body.product.product_id].qty = cart.items[req.body.product.product_id].qty + 1;
    //     cart.totalQty  = cart.totalQty + 1;
    //     cart.totalPrice = cart.totalPrice + req.body.product.price;
    //     // console.log(cart.totalPrice)
    //   }