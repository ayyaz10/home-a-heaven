

    const removeItem = document.querySelectorAll('span.remove');
    const product = document.querySelector('.product-in-cart');
    const price = document.querySelector('.price')

    async function removeFromDb(){

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

    removeItem.forEach((remove)=>{
            remove.addEventListener('click', ()=>{
            remove.parentElement.parentElement.remove();
            removeFromDb()
        });
    })

