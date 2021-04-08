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
    const firstName = editProfileInput[0].value
    const lastName = editProfileInput[1].value
    console.log(firstName + lastName)
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
const emailLabel = document.querySelector('.email-label');
const emailEditWrapper = document.querySelector('.edit-email-wrapper');
const emailInput = document.querySelector('.edit-email p input');
emailLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    emailEditWrapper.classList.add('show');
})

// show password
const passwordLabel = document.querySelector('.password-label');
const passwordEditWrapper = document.querySelector('.edit-passowrd-wrapper');
const passwordInput = document.querySelector('.edit-password p input');
passwordLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    passwordEditWrapper.classList.add('show');
})

// show phone
const phoneLabel = document.querySelector('.phone-label');
const phoneEditWrapper = document.querySelector('.edit-phone-wrapper');
const phoneInput = document.querySelector('.edit-phone p input');
phoneLabel.addEventListener('click', async () => {
    myProfileWrapper.classList.add('hide');
    phoneEditWrapper.classList.add('show');
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

