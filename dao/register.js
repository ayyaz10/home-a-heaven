const db = require('../db/db');

const registerDAO = (user) => {
return db('customer').insert(user, 'user_id')
    .then(id => {
        return id[0];
    }) 
    .catch(err => {
        
    })
}

module.exports = registerDAO;