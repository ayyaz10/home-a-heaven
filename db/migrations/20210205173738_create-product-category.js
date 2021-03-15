exports.up = function(knex) {
  return knex.schema.createTable('product_category', (table) => {
      table.increments('category_id');
      table.decimal('product_id');
      table.string('product_category', 255).notNullable();
      table.string('category_thumbnail', 255).notNullable();
      table.date('created_on').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_category');
};

