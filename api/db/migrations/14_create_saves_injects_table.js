/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('saves_injects', table => {
    table.increments('id').primary();
    table.integer('save_id').notNullable();
    table.foreign('save_id').references('save.id');
    table.integer('signal_id').notNullable();
    table.foreign('inject_id').references('injects.id');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('saves_injects');
};
