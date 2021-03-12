
exports.up = function(knex) {
  return knex.schema.createTable('admin', (table) => {
      table.increments('admin_id');
      table.string('admin_username', 255).notNullable();
      table.string('admin_password', 255).notNullable();
      table.date('created_on').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('admin');
};
