
exports.up = function(knex) {
    return knex.schema.createTable('shipping_detail', (table) => {
        table.increments('order_id');
        table.integer('customer_id', 255).unsigned().notNullable();
        table.string('full_name', 255).unsigned().notNullable();
        table.string('items', 255).notNullable();
        table.integer('qty', 255).unsigned().notNullable();
        table.string('email', 255).notNullable();
        table.string('address', 255).notNullable();
        table.string('city', 255).notNullable();
        table.string('phone', 255).notNullable();
        table.string('paymentType', 255).notNullable();
        table.string('order_status', 255).notNullable();
        table.date('created_on').notNullable();
    });
};

exports.down = function(knex) {
  
};
