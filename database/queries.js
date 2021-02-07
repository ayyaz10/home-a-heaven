const knex = require('./knex'); //this require is for the connection to the database. 


module.exports = {
    getOneByEmail: function(email) {
        return knex('customer').where({
            email: email
        }).first();
    },
    getOneByPassword: function(password) {
        return knex('customer').where({
            password: password
        }).first();
    },
    create: function(user) {
        return knex('customer').insert(user, 'user_id').then(ids => {
            return ids[0];
        })
    }
}