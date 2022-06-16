/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {  
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE target CASCADE');
  await knex('targets').del();
  await knex('targets').insert([
    { name: 'ARKE 3G', offset: 400 },
    { name: 'AURORA 2B', offset: 450 },
    { name: 'AUXO STAR', offset: 420 },
    { name: 'ENYO', offset: 300 },
    { name: 'HASHCOMM 7', offset: 365 },
    { name: 'HUF UHF FO', offset: 210 },
    { name: 'MERCURY PAWN', offset: 150 },
    { name: 'NYXSAT', offset: 250 },
    { name: 'RASCAL', offset: 120 },
    { name: 'WILL 1-AM', offset: 345 },
  ]);
};
