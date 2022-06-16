/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  return knex.schema.createTable('antennas', table => {
    table.increments('id').primary();
    table.integer('server_id').notNullable();
    table.foreign('server_id').references('server.id');
    table.integer('team_id').notNullable();
    table.foreign('team_id').references('team.id');
    table.integer('target_id').notNullable();
    table.foreign('target_id').references('target.id');
    table.integer('unit').notNullable();
    table.boolean('operational').defaultTo(false);
    table.boolean('locked').defaultTo(false);
    table.enu('band', [
      "TLF",
      "ELF",
      "SLF",
      "ULF",
      "VLF",
      "LF",
      "MF",
      "HF",
      "VHF",
      "UHF",
      "SHF",
      "EHF",
      "THF",
      "L",
      "S",
      "C",
      "X",
      "Ku",
      "K",
      "Ka",
      "V",
      "W",
      "mm"
    ], { useNative: true, enumName: 'bands' });
    table.string('band').notNullable();
    table.double('offset').notNullable();
    table.boolean('hpa').defaultTo(false);
    table.boolean('loopback').defaultTo(true);
    table.timestamps(true, true); 
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  return knex.schema.dropTable('antennas');
};
