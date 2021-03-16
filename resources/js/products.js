const addToCart = document.querySelectorAll('.add-to-cart');

const updateCart = (product) => {
    fetch('http://localhost:3333/updateCart', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    product
                })
        })
        .then(data => {
            return data.json();
        })
        .then(result => {
            console.log(result)
        })
}

addToCart.forEach(cartBtn => {
    cartBtn.addEventListener('click', (e) => {
        let product = JSON.parse(cartBtn.dataset.product);
        updateCart(product);
        console.log(product)
    })
})