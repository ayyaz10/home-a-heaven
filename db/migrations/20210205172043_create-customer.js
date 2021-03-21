
exports.up = function(knex) {
  return knex.schema.createTable('customer', (table) => {
      table.increments('user_id');
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.datetime('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('customer');
};
