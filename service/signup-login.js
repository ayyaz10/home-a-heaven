const signupLoginDAO = require('../dao/signup-login');

const signupLoginService = () => {
    const categories = signupLoginDAO()
    .then(data => {
        return data;
    })
    return categories;
}

module.exports = signupLoginService;