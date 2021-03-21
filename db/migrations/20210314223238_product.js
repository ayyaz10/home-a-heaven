
exports.up = function(knex) {
    return knex.schema.createTable('product', (table) => {
        table.increments('product_id');
        // table.integer('customer').references('user_id').inTable('customer');
        table.integer('admin_id').unsigned();
        table.string('product_name', 255).notNullable();
        table.integer('price', 255).unsigned().notNullable();
        table.integer('inStock').unsigned().notNullable();
        table.string('product_category', 255).notNullable();
        table.integer('discount').unsigned().notNullable();
        table.string('image', 255).notNullable();
        table.string('product_description', 255);
        table.datetime('created_at').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
