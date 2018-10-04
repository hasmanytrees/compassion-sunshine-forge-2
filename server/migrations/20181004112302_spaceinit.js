
exports.up = function (knex, Promise) {
    return knex.schema.createTable('space', (table) => {
        table.increments();
        table.string('name');
        table.integer('memory_quotamb');
        table.integer('disk_quotamb');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('space');
};
