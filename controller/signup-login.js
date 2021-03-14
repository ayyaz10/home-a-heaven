const signupLoginService = require('../service/signup-login');

const signupLoginController = (req, res) => {
    signupLoginService()
    .then(categories => {
        res.render('signup-login', {
            category: categories
          });
    })
    .catch(err => {
        console.error(err);
        res.status(500).json('something went wrong');
    })
}

module.exports = signupLoginController;