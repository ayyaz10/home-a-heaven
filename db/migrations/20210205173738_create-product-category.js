exports.up = function(knex) {
  return knex.schema.createTable('product_category', (table) => {
      table.increments('category_id');
      // table.integer('product_id').references('product_id').inTable('product');
      table.string('product_category', 255).notNullable();
      table.string('image', 255).notNullable();
      table.date('created_on').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_category');
};

