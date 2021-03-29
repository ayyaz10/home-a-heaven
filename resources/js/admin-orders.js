const select = document.querySelectorAll('.order-status-options');
select.forEach((each) => {
    each.addEventListener('change', async (e) => {
    const getOrderStatus = async (e)=> {
        // console.log(e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText)
        const orderId = parseInt(e.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText)
        if(e.target.value === 'placed') {
            return {
                status: 'placed',
                order_id: orderId
            }
        }
        if(e.target.value === 'confirmed') {
            return {
                status: 'confirmed',
                order_id: orderId
            }
        }
        if(e.target.value === 'delivered') {
            return {
                status: 'delivered',
                order_id: orderId
            }
        }
    }
    const clientStatus = await getOrderStatus(e);

    const response = await fetch('http://localhost:3333/order-status', {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            clientStatus
        })
    })
    const serverResponse = await response.json();
    // console.log(serverResponse, clientStatus)
    if(serverResponse.dbStatus === 1) {
        console.log(e.target[1].innerText)
        // e.target[1].innerText = serverResponse.dbStatus
    }
    })
})


const logoutHeader  = document.querySelector('#logout');
const loginHeader = document.querySelector('#login');
const userId = JSON.parse(localStorage.getItem('user_id'))
const logoutButton = document.querySelector('.logout');
logoutButton.addEventListener('click', (e)=>{
    e.preventDefault();
    function logout(){
        localStorage.removeItem('user_id')
        fetch('http://localhost:3333/logout')
        .then(res => {
            return res.json();
        })
        .then(result => {
            window.location = "http://localhost:3333/";
        })
        }
        // const result = await response.json();

    logout();
})
if(userId) {
    loginHeader.style.display = "none";
    logoutHeader.style.display = "block";
} else {
    logoutHeader.style.display = "none";
}

console.log(loginHeader)