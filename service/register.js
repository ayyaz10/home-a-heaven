const bcrypt = require('bcryptjs');
const registerDAO = require('../dao/register');
const User  = require('../db/queries');

// function isValidRegisterUser(user) {
//     const validEmail = typeof user.email == 'string' && user.email.trim() != '';
//     const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
//     const validFirstName = typeof user.firstname == 'string' && user.firstname.trim() != '';
//     const validLastName = typeof user.lastname == 'string' && user.lastname.trim() != '';

//     return validEmail && validPassword && validFirstName && validLastName;
// }

const registerService = (registerDto) => {
    const { firstname, lastname, email, password } = registerDto;
    // if(isValidRegisterUser(registerDto)) {
       return User.getOneByEmail(email)
        .then(registeredUser => {
            if(!registeredUser) {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                       const user = {
                           email,
                           password,
                           first_name: firstname,
                           last_name: lastname,
                           created_on: new Date()
                       }
                       return registerDAO(user)

                    });
                });
            } 
        })
    // }
}

module.exports = registerService;