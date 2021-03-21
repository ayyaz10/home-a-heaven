
exports.up = function(knex) {
    return knex.schema.createTable('item', (table) => {
        table.increments('item_id');
        table.integer('product_id');
        table.string('item_name', 255).notNullable();
        table.integer('price', 255).unsigned().notNullable();
        table.integer('qty', 50).unsigned().notNullable();
        table.date('created_on').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('item');
};
