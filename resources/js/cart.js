

    const removeItem = document.querySelectorAll('span.remove');
    const product = document.querySelector('.product-in-cart');
    const price = document.querySelector('.price')
    const data = JSON.parse(localStorage.getItem('obj'))
    // console.log(data)
    async function removeFromDb(){
       
            // cart.items[req.body.product.product_id].qty = cart.items[req.body.product.product_id].qty + 1;
            // cart.totalQty  = cart.totalQty + 1;
            // cart.totalPrice = cart.totalPrice + req.body.product.price;

        const response = await fetch('http://localhost:3333/updateCart', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product
            })
        })
    }

    // console.log(removeItem)
    removeItem.forEach((remove)=>{
            remove.addEventListener('click', async (e)=>{
                const option = document.querySelector('.')
                const id = document.querySelector('.product-in-cart')
                const productId = e.target.parentElement.parentElement.attributes[1].value;
                console.log(productId)
            // remove.parentElement.parentElement.remove();


            const response = await fetch('http://localhost:3333/updates', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                productId
            })
        })




            // const data = await fetch('http://localhost:3333/getSessionData')
            // const session = await data.json();
            // for(let product of Object.values(session)) {
            // // console.log(product.items)
            // }
            removeFromDb()
        });
    })


const counterValue = document.querySelector('.counter-value');
const addButton = document.querySelectorAll('.add-btn');
const subButton = document.querySelectorAll('.sub-btn')
for(let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener('click', (e) => {
        const counter = e.target.nextElementSibling;
        counter.innerText = Number(counter.innerText) + 1;
    })
}
for(let i = 0; i < addButton.length; i++) {
    subButton[i].addEventListener('click', (e) => {
        const counter = e.target.parentElement.firstElementChild.nextElementSibling;
        if(counter.innerText <= 0) {
            counter.innerText = 0;
        } else {
            counter.innerText = Number(counter.innerText) - 1;

        }
    })
}


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