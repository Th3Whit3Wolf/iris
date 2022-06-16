/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => { 
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE team CASCADE');
  await knex('teams').del();
  await knex('teams').insert([
    { name: 'Persephone' },
    { name: 'Sisyphus' },
    { name: 'Tartarus' },
    { name: 'Zagreus' },
  ]);
};
