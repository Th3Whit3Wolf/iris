/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('app_authors', table => {
    table.increments();
    table.string('first_name', 64).notNullable();
    table.string('last_name', 64).notNullable();
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTableIfExists('app_authors');
};
