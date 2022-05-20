/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('antenna').del()
  await knex('antenna').insert([
    {id: 1, server_id: 1, team_id: 1, unit: 1, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 2, server_id: 1, team_id: 1, unit: 2, operational: true, target_id: 4, locked: true, band: 1, offset: 400, hpa: false, loopback: true},
    {id: 3, server_id: 1, team_id: 2, unit: 1, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 4, server_id: 1, team_id: 2, unit: 2, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 5, server_id: 1, team_id: 3, unit: 1, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 6, server_id: 1, team_id: 3, unit: 2, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 7, server_id: 1, team_id: 4, unit: 1, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true},
    {id: 8, server_id: 1, team_id: 4, unit: 2, operational: true, target_id: 1, locked: true, band: 0, offset: 400, hpa: false, loopback: true}
  ]);
  await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'antenna\',\'id\'), (SELECT MAX(id) FROM antenna) )');
};
