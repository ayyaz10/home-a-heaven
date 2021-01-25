//switch between login and signup #START
const login = document.getElementById("login_header");
const signup = document.querySelector("#signup_header");
const loginForm = document.querySelector("#login_form");
const signupForm = document.querySelector("#signup_form");
const loginFormData = document.querySelectorAll("#login_form input");
const signupFormData = document.querySelectorAll("#signup_form input");


login.addEventListener('click', ()=>{
    signupForm.style.display = "none";
    loginForm.style.display = "block";
    login.classList.add("active");
    signup.classList.remove("active")
})

signup.addEventListener('click', ()=>{
    loginForm.style.display = "none";
    signupForm.style.display = "block";
    signup.classList.add("active");
    login.classList.remove("active")
})
//switch between login and signup #END

//collecting data from form
for(let i = 0; i < signupFormData.length; i++) {
    console.log(signupFormData[i].value)
}
// console.log(loginInputField[0].value)




