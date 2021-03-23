exports.up = function(knex) {
  return knex.schema.createTable('product_category', (table) => {
      table.increments('category_id');
      // table.integer('product_id')
      table.string('category_name', 255).unique().notNullable();
      table.string('image', 255).notNullable();
      table.datetime('created_at').notNullable();
      // table.foreign('product_id').references('product.product_id');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_category');
};
