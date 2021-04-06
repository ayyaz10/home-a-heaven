if(JSON.parse(localStorage.getItem('isOrdered'))) {
    const successAlertContainer = document.querySelector('.success-alert');
    const successMessage = document.createElement('p');
    successMessage.classList.add('success');
    successMessage.innerText = 'Order Placed';
    successAlertContainer.append(successMessage);
    localStorage.setItem('isOrdered', JSON.stringify(false));
    setTimeout(()=>{
        const successAlert = document.querySelector('.success');
        successAlert.style.display = "none";
    },3000)
}

