exports.up = function(knex) {
    return knex.schema.createTable('sub_category', (table) => {
        table.increments('subCat_id');
        table.integer('cat_id');
        table.string('sub_cat_name', 255).notNullable();
        table.datetime('created_at').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sub_category');
};

