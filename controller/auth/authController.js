const { getAllProducts, getAllCategories } = require('../../db/queries');
const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const router = express.Router();
const User  = require('../../db/queries');


function isValidRegisterUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;
    const validFirstName = typeof user.firstname == 'string' && user.firstname.trim() != '';
    const validLastName = typeof user.lastname == 'string' && user.lastname.trim() != '';

    return validEmail && validPassword && validFirstName && validLastName;
}

function isValidLoginUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return validEmail && validPassword;
}

const authController = () => {
    return {
        async registerLogin (req, res) {
            // console.log('helo')
            const products = await getAllProducts();
            const categories = await getAllCategories();
            res.render('signup-login', {
              products,
              categories
            })
          },
        register (req, res, next) {
            if(isValidRegisterUser(req.body)){ 
                User
                .getOneByEmail(req.body.email)
                .then(user => {
                    // console.log(user);
                    if(!user) {
                        // console.log(user)
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                // Store hash in your password DB.
                                const user = {
                                    email: req.body.email,
                                    password: hash,
                                    first_name: req.body.firstname,
                                    last_name: req.body.lastname,
                                    created_on: new Date()
                                }
                                User
                                .create(user)
                                .then(id => {
                                    if(id) {
                                        res.cookie('user_id', id, {
                                            secret: 'process.env.COOKIE_SECRET,',
                                            httpOnly: true,
                                            signed: true,
                                            maxAge: 1000 * 60 * 60 * 24,
                                            secure: false
                                        });
                                        res.json({
                                            id,
                                            message: 'working'
                                        })
                                    }
                                })
                            });
                        });
                    } else {
                        next(new Error('Email in use'));
                    }
                });
            } else {
                next(new Error('Invalid user'))
            }
        },

        login(req, res, next) {
            console.log(req.body)
        if(isValidLoginUser(req.body)) {
            // check to see if user is in the database
            User
            .getOneByEmail(req.body.email)
            .then(user => {
                if(user) {
                    // compare password with the hash
                    User.getOneByEmail(req.body.email)
                    .then(user => {
                        bcrypt.compare(req.body.password, user.password, function(err, result) {
                            if(result){
                                // setting the set-cookie header
                                const isSecure =  req.app.get('env') != 'development';
                                res.cookie('user_id', user.user_id, {
                                    httpOnly: true,
                                    signed: true,
                                    maxAge: 1000 * 60 * 60 * 24,
                                    secure: false
                                });
                                res.json({
                                    id: user.user_id,
                                    user_name: user.first_name,
                                    result,
                                    message: 'Logged in'
                                })
                            } else {
                                res.json({
                                        result,
                                        message: 'Please enter correct Email or Password!'
                                    })
                            }
                        })
                    })

                    } else {
                        next(new Error('Please enter correct Email or Password!'));
                    }
                });
            } else {
                next(new Error('Please enter correct Email or Password!'));
            }
        },
        logout (req, res) {
            res.clearCookie('user_id');
            req.session.destroy((err) => {
                // res.redirect('/') // will always fire after session is destroyed
              })
            res.json({
                message: 'logged out'
            })
        },
    }

}


module.exports = authController;
