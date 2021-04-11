// global variable
const url = "http://localhost:3333";


const myProfileWrapper = document.querySelector('.profile-wrapper');
const editProfileWrapper = document.querySelector('.edit-profile-wrapper');
const editProfileInput = document.querySelectorAll('.edit-profile-wrapper .personal-info input');


const editProfileBtn = document.querySelector('.edit-profile-btn');
const saveChangesBtn = document.querySelector('.save-profile-btn');

editProfileBtn.addEventListener('click', () => {
    myProfileWrapper.classList.add('hide');
    editProfileWrapper.classList.add('show');
})


editProfileWrapper.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = editProfileInput[0].value;
    const lastName = editProfileInput[1].value;

    const response = await fetch(`${url}/edit-profile`, {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName
        })
    })
    const result = await response.json();
    if(result.isUpdated) {
        window.location = '/account'
    }
})
 
// show email
const emailLabel = document.querySelector('.email-label  span');
const editEmailWrapper = document.querySelector('.edit-email-wrapper');
const editEmailInput = document.querySelector('.email-input');
emailLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    editEmailWrapper.classList.add('show');
})
console.log(editEmailInput)

editEmailWrapper.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = editEmailInput.value;
    const response = await fetch(`${url}/edit-profile`, {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
        })
    })
    const result = await response.json();
    console.log(result)
    if(result.isUpdated) {
        window.location = '/account'
    }
})




// show password
const passwordLabel = document.querySelector('.password-label span');
const passwordInput = document.querySelector('.edit-password p input');
passwordLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    passwordEditWrapper.classList.add('show');
})

// password matching check
const currentPassword = document.querySelector('.current-password');
const newPassword = document.querySelector('.new-password');
const retypePassword = document.querySelector('.retype-password');

currentPassword.addEventListener('change', async () => {
    const response = await fetch(`${url}/edit-profile`, {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                currentPassword: currentPassword.value
        })
    })
    try {
        const result = await response.json();
        if(!result.isMatched) {
            const messageField = document.querySelector('.currentPassword-message-field');
            messageField.innerText = "Current password is not correct";
            messageField.style.color = "red";
            currentPassword.style.border = "1px solid red";
        } else {
            const messageField = document.querySelector('.currentPassword-message-field');
            currentPassword.style.border = "1px solid green";
            messageField.innerText = "Current password is correct";
            messageField.style.color = "green";
        }
    } catch (error) {
        console.log(error)
    }

})


// check for new password and retype password match
newPassword.addEventListener('keyup', (e) => {
    // console.log(e.target.value.length)
    console.log(e.target.parentElement)
   if(e.target.value === retypePassword.value) {
    const newPassMessageField = document.querySelector('.newPassword-message-field');
    newPassword.style.border = "1px solid green";
    newPassMessageField.innerText = "Password matched!";
    newPassMessageField.style.color = "green";

   } else {
    const newPassMessageField = document.querySelector('.newPassword-message-field');
    newPassword.style.border = "1px solid red";
    newPassMessageField.innerText = "Password not matched!";
    newPassMessageField.style.color = "red";
   }
   if(!(e.target.value.length >= 6)) {
    const newPassMessageField = document.querySelector('.newPassword-message-field');
    newPassword.style.border = "1px solid red";
    newPassMessageField.innerText = "Password length must be greater then 6!";
    newPassMessageField.style.color = "red";
   }
})



// check for new password and retype password match
retypePassword.addEventListener('keyup', (e) => {
    // console.log(e.target.value.length)
    console.log(e.target.parentElement)
   if(e.target.value === newPassword.value) {
    const messageField = document.querySelector('.retypePassword-message-field');
    const newPassMessageField = document.querySelector('.newPassword-message-field');
    newPassword.style.border = "1px solid green";
    newPassMessageField.innerText = "Password matched!";
    newPassMessageField.style.color = "green";
    retypePassword.style.border = "1px solid green";
    messageField.innerText = "Password matched!";
    messageField.style.color = "green";

   } else {
    const messageField = document.querySelector('.retypePassword-message-field');
    retypePassword.style.border = "1px solid red";
    messageField.innerText = "Password not matched!";
    messageField.style.color = "red";
   }
   if(!(e.target.value.length >= 6)) {
    const messageField = document.querySelector('.retype-message-field');
    retypePassword.style.border = "1px solid red";
    // messageField.innerText = "Password length must be greater then 6!";
    // messageField.style.color = "red";
   }
})


// sending password to server
const passwordEditWrapper = document.querySelector('.edit-passowrd-wrapper');
// passwordEditWrapper.addEventListener('submit', updatePassword)
passwordEditWrapper.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/edit-profile`, {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                newPassword: retypePassword.value
        })
    })
    try {
        const result = await response.json();
        // check if password is updated or not
        if(result.isUpdated) {
            // Get the modal
            var modal = document.getElementById("myModal");
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            // get the <p> where actual message will be shown
            let message = document.querySelector('.message');
            message.innerText = "Password has been changed!";
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
        }
    } catch (error) {
        console.error(error)
    }
})




// show phone
const phoneLabel = document.querySelector('.phone-label  span');
const phoneEditWrapper = document.querySelector('.edit-phone-wrapper');
const phoneInput = document.querySelector('.phone-input');
phoneLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    phoneEditWrapper.classList.add('show');
})

phoneEditWrapper.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch(`${url}/edit-profile`, {
        method: "post",
        mode: 'cors',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                newPhone: phoneInput.value
        })
    })
    try {
        const serverRespone = await response.json();
        if(serverRespone.isUpdated) {
            window.location.reload();
        }
    } catch (error) {
        console.error(error)
    }
})

// ema.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const email = emailInput.value;
//     console.log(email)
//     const response = await fetch(`${url}/edit-profile`, {
//         method: "post",
//         mode: 'cors',
//         credentials: 'include',
//         headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//                 email
//         })
//     })
//     const result = await response.json();
//     if(result.isUpdated) {
//         window.location = '/account'
//     }
// })

// saveChangesBtn.addEventListener('click', () => {
//     editProfile.classList.add('hide');
//     myProfile.classList.remove('show');
// })

