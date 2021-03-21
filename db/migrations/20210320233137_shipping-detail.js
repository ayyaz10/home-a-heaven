
exports.up = function(knex) {
    return knex.schema.createTable('shipping_detail', (table) => {
        table.increments('order_id');
        table.integer('customer_id', 255).unsigned();
        table.string('product_id', 255);
        table.string('item_id');
        // .references('item_id').inTable('item').onDelete('CASCADE');
        table.string('full_name', 255).unsigned().notNullable();
        table.integer('qty', 50).unsigned().notNullable();
        table.integer('total_price', 255).unsigned().notNullable();
        table.string('email', 255).notNullable();
        table.string('address', 255).notNullable();
        table.string('city', 255).notNullable();
        table.string('phone', 50).notNullable();
        table.string('paymentType', 50).notNullable();
        table.string('order_status', 50).notNullable();
        table.datetime('created_at').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('item');
};
