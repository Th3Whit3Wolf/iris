/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('signals', table => {
    table.increments('id').primary();
    table.integer('server_id').notNullable();
    table.foreign('server_id').references('server.id');
    table.integer('target_id').notNullable();
    table.foreign('target_id').references('target.id');
    table.double('frequency').notNullable();
    table.double('power').notNullable();
    table.double('bandwidth').notNullable();
    table.enu('modulation', null, { useNative: true, existingType: true, enumName: 'modulations' }).notNullable();
    table.string('modulation').notNullable();
    table.string('fec').notNullable();
    table.string('feed').notNullable();
    table.boolean('operational').defaultTo(false);
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('signals');
};
