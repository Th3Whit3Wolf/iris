/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('injects', table => {
    table.increments('id').primary();
    table.integer('server_id').notNullable();
    table.foreign('server_id').references('server.id');
    table.string('equipment').notNullable();
    table.integer('unit').notNullable();
    table.boolean('operational').defaultTo(false);
    table.timestamp('time').defaultTo(knex.fn.now());
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('injects');
};
