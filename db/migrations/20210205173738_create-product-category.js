
exports.up = function(knex) {
  return knex.schema.createTable('product_category', (table) => {
      table.increments('category_id');
      table.text('category_name');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('product_category');
};
