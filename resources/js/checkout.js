const shippingForm = document.querySelector("#shipping-form");
const shippingFormData = document.querySelectorAll("#shipping-form input");
const countryData = document.querySelectorAll(".form-control option")

shippingForm.addEventListener('submit', function(e) {
	e.preventDefault();
    const fullName = shippingFormData[0].value;
    const email = shippingFormData[1].value;
    const address = shippingFormData[2].value;
    const city = shippingFormData[3].value;
    const phone = shippingFormData[4].value;
    fetch('http://localhost:3333/order', {
            method: "post",
            mode: 'cors',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    fullname: fullName,
                    email,
                    address,
                    city,
                    phone
                })
        }).then(response => {
            return response.json()
        })
        .then(data => {
            if(data.customer) {
                document.querySelector('.cart').innerText = "";
                window.location = "http://localhost:3333/orders";
                localStorage.setItem('isOrdered', JSON.stringify(true));
            } else {
                localStorage.removeItem('productArray')
                // console.log('helo')
                document.querySelector('.cart').innerText = "";
                // console.log(data.result[0].full_name)
                const userName = document.querySelector('.message span');
                userName.textContent = data.result[0].full_name + "!";

                // Get the modal
                var modal = document.getElementById("myModal");
                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];
                // When the user clicks the button, open the modal 
                modal.style.display = "block";
                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                    window.location.reload()
                  }

                  // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                    window.location.reload()
                    }
                }
                // document.querySelector('.cart').innerText = "";
            }
        })
})

const updateCheckoutPage = () => {
    const products = JSON.parse(localStorage.getItem('productArray'))
    const subtotalText = document.querySelector('.subtotal-text');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const totalText = document.querySelector('.total-text');
    const totalAmount = document.querySelector('.total-amount');

    const createSummaryAreaHtml = (product) => {
        const orderInforWrapper = document.querySelector('.order-info-wrapper');
        const createDiv = ()=>{return document.createElement('div')}
        const createH2 = ()=>{return document.createElement('h2')}
        const createImage = ()=>{return document.createElement('img')}
        const createSpan = ()=>{return document.createElement('span')}
        const order = createDiv();
        const productName = createH2();
        const price = createSpan();
        order.classList.add('order')
        productName.classList.add('product-name')
        price.classList.add('price')
        productName.innerText = product.productName;
        price.innerText = product.price;
        // image container section
        const imageContainer = createDiv();
        const image = createImage();
        imageContainer.classList.add('image')
        image.src = product.productImg;
        imageContainer.append(image)
        order.append(imageContainer)
        order.append(productName)
        order.append(price)
        orderInforWrapper.append(order)
    }
 

    products.forEach(product => {
        createSummaryAreaHtml(product)
    });
    for(let i = 0; i < products.length; i++) {
        subtotalText.innerText = 'Item Subtotal: '
        subtotalAmount.innerText = products[i].totalAmount;
        totalText.innerText = 'Total: '
        totalAmount.innerText = products[i].totalAmount;
    }
}

updateCheckoutPage();