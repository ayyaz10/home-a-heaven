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
     createProduct (product, productCategory) {
         try {
             knex.transaction(async trx => {
                 const dbProduct =
                     await trx.insert(product, 'product_id')
                     .into('product')
                     .returning('*')
                 const cat = await trx.insert({
                    product_id: dbProduct[0].product_id,
                    product_category: dbProduct[0].product_category,
                    image: dbProduct[0].image,
                    created_on: new Date()
                 })
                     .into('product_category')
                    //  console.log(cat)
             })
         } catch (error) {
                console.log(error)
         }
    },
    getAllProducts () {
        const allProducts = knex.select('*').from('product')
        .then(result => {
            return result;
        })
        return allProducts;
    },
    async getALlCategories () {
        const allCategories = await knex.select('product_category')
        return allCategories;
    },
    // async createOrder () {
    //     try {
    //         knex.transaction(async trx => {
    //             const dbProduct =
    //                 await trx.insert(product, 'product_id')
    //                 .into('product')
    //                 .returning('*')
    //             const cat = await trx.insert({
    //                product_id: dbProduct[0].product_id,
    //                product_category: dbProduct[0].product_category,
    //                image: dbProduct[0].image,
    //                created_on: new Date()
    //             })
    //                 .into('product_category')
    //                //  console.log(cat)
    //         })
    //     } catch (error) {
    //            console.log(error)
    //     }
    // },
    async createItem (itemObj) {
        return knex('item').insert(itemObj, 'item_id').then(ids => {
            console.log(ids)
            return ids[0];
        });
    }
}