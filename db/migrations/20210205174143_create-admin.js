
exports.up = function(knex) {
  return knex.schema.createTable('admin', (table) => {
      table.increments('admin_id');
      table.string('admin_username', 255).notNullable();
      table.string('admin_password', 255).notNullable();
      table.datetime('created_at').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};
