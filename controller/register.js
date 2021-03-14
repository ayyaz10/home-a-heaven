const registerService = require('../service/register');

const registerController = (req, res, next) => {
    const { email, password, firstname, lastname } = req.body;
    function isValidRegisterUser() {
        const validEmail = typeof email == 'string' && email.trim() != '';
        const validPassword = typeof password == 'string' && password.trim() != '' && password.trim().length >= 6;
        const validFirstName = typeof firstname == 'string' && firstname.trim() != '';
        const validLastName = typeof lastname == 'string' && lastname.trim() != '';
    
        return validEmail && validPassword && validFirstName && validLastName;
    }

    if(isValidRegisterUser()) {
        registerService(req.body)
        .then(data => {
            console.log(data);
        })
    } 


}

module.exports = registerController;


// if(id) {
//     res.cookie('user_id', user.user_id, {
//         httpOnly: true,
//         signed: true,
//         maxAge: 1000 * 60 * 60 * 2,
//         secure: false
//     });
//     res.json({
//         id,
//         message: 'working'
//     })
// }
module.exports = registerController;