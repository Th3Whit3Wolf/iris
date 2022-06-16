/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('servers', table => {
    table.increments('id').primary();
    table.string('name', 64).notNullable();
    table.timestamp('start_time').defaultTo(knex.fn.now());
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('servers');
};
