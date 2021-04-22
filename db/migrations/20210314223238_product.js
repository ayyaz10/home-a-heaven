
exports.up = function(knex) {
    return knex.schema.createTable('product', (table) => {
        table.increments('product_id');
        // table.foreign('category_id').references('product_category.category_id');
        // table.integer('customer').references('user_id').inTable('customer');
        // table.integer('admin_id').unsigned();
        // table.string('category_id', 255).notNullable();
        table.string('product_name', 255).notNullable();
        table.integer('price', 255).unsigned().notNullable();
        table.string('category_name', 255).notNullable();
        table.string('sub_cat_name', 255);
        table.integer('inStock').unsigned().notNullable();
        table.integer('discount').unsigned();
        // table.string('cat_id', 255).notNullable();
        table.string('subcat_id', 255);
        table.string('image', 255).notNullable();
        table.text('product_description', 255);
        table.datetime('created_at').notNullable();
        // table.foreign('category_name').references('product_category.category_name').onDelete();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};
