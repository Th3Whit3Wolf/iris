/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('saves_signals', table => {
    table.increments('id').primary();
    table.integer('save_id').notNullable();
    table.foreign('save_id').references('save.id');
    table.integer('signal_id').notNullable();
    table.foreign('signal_id').references('signal.id');
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('saves_signals');
};
