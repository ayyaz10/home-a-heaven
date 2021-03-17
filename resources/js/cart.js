

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
                const id = document.querySelector('.product-in-cart')
                const productId = Number(e.target.parentElement.parentElement.attributes[1].value);
                // const productId = Number(id.parentElement.firstElementChild.nextElementSibling.attributes[1].value);
                console.log(productId)
            // remove.parentElement.parentElement.remove();

            const data = await fetch('http://localhost:3333/getSessionData')
            const session = await data.json();
            for(let product of Object.values(session)) {
            // console.log(product.items)
            }
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