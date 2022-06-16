/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => { 
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE server CASCADE');
  await knex('servers').del();
  await knex('servers').insert([{ name: '533TRS' }]);
};
