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
     async createProduct (productObj, productCategoryObj) {
         try {
                const existingCategory = await knex('product_category').where({
                    product_category: productCategoryObj.product_category
                })
                console.log(existingCategory)
                if(!existingCategory.length) {
                // productCategoryObj.product_category = d[0];
                 const dbProductCategory =
                     await knex.insert(productCategoryObj, 'category_id')
                     .into('product_category')
                     .returning('*')

                 productObj.category_id = dbProductCategory[0].category_id;
                 const cat = await knex.insert(productObj, 'product_id')
                     .into('product')
                } else {
                    productObj.category_id = existingCategory[0].category_id;
                    //  console.log(productObj)
                     const cat = await knex.insert(productObj, 'product_id')
                         .into('product')
                }
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
    // async getAllCategories () {
    //     const allCategories = await knex.select('product_category')
    //     // console.log(allCategories)
    //     return allCategories;
    // },
    async createOrder (order) {
        const shippingDetail = await knex('shipping_detail').insert(order, 'order_id').returning("*");
        return shippingDetail;
    },
    async createItem (itemObj) {
        return knex('item').insert(itemObj, 'item_id').then(ids => {
           return ids[0];
        });
    },
    async orders (customerId) {
        const customerOrders = await knex('shipping_detail').where('customer_id', customerId).returning('*')
        return customerOrders
    },
    async getItem (itemId) {
            const items = await knex('item').where('item_id', itemId).returning('*')
        return items;
    },
    async getCustOrdersItems(customerId) {
        const allItems = await knex('item').where({
            customer_id: customerId
        })
        return allItems;
    }
}