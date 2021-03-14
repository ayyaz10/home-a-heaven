const knex = require('./db'); //this require is for the connection to the database. 


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
        });
    },
    createProduct (product) {
        knex('product').insert(product, 'product_id').returning('*')
        .then(data => {
            console.log(data)
        })
    }
}