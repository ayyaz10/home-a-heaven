const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const router = express.Router();
const User  = require('../database/queries');

router.get('/', (req, res) => {
    res.json({
        message: 'hello'
    });
});


function validUser(user) {
    const validEmail = typeof user.email == 'string' && user.email.trim() != '';
    const validPassword = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 6;

    return validEmail && validPassword;
}

router.post('/register', (req, res, next) => {
    if(validUser(req.body)){ 
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            console.log(user);
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
                        console.log(user)
                        User
                        .create(user)
                        .then(id => {
                            res.json({
                                id,
                                message: 'working'
                            })
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
})

router.post('/login', (req, res, next) => {
    if(validUser(req.body)) {
        // check to see if user is in the database
        User
        .getOneByEmail(req.body.email)
        .then(user => {
            // console.log('user', user)
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
                                maxAge: 1000 * 60 * 60 * 2,
                                secure: false
                            });
                            res.json({
                                id: user.user_id,
                                result,
                                message: 'Logged in'
                            })
                        } else {
                            // console.log(result)
                            // console.log(err)
                             res.json({
                                    result,
                                    message: 'Invalid password'
                                })
   
                        }
                    })
                })

            } else {
                next(new Error('Invalid login'));
            }
        });
    } else {
        next(new Error('Invalid login'));
    }
})

module.exports = router;
