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
                document.querySelector('.cart').innerText = "";
            }
        })
})