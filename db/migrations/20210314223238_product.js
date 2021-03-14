
exports.up = function(knex) {
    return knex.schema
    .createTable('product', (table) => {
        table.increments('product_id');
        table.decimal('customer_id');
        table.decimal('admin_id');
        table.string('product_name', 255).notNullable();
        table.decimal('price', 255).notNullable();
        table.decimal('inStock', 255).notNullable();
        table.string('product_category', 255).notNullable();
        table.decimal('discount', 255).notNullable();
        table.string('image', 255).notNullable();
        table.string('product_description');
        table.date('created_on').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
