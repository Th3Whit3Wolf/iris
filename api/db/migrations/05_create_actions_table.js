/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('actions', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.integer('server_id').notNullable();
    table.foreign('server_id').references('server.id');
    table.integer('team_id').notNullable();
    table.foreign('team_id').references('team.id');
    table.integer('antenna_id').notNullable();
    table.foreign('antenna_id').references('antenna.id');
    table.integer('unit').notNullable();
    table.integer('modem_number').notNullable();
    table.boolean('operational').defaultTo(false);
    table.double('frequency').notNullable();
    table.double('bandwidth').notNullable();
    table.double('power').notNullable();
    table.timestamp('time').defaultTo(knex.fn.now());
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('actions');
};
