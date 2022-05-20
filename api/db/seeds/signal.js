/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE signal CASCADE');
  await knex('signal').del()
  await knex('signal').insert([
    {id: 1, server_id: 1, target_id: 1, frequency: 4810, power: -100, bandwidth: 5, modulation: '8QAM', fec: '1/2', feed:'red 1.mp4', operational: 'true'},
    {id: 2, server_id: 1, target_id: 1, frequency: 4820, power: -100, bandwidth: 3, modulation: '8QAM', fec: '3/4', feed:'red 2.mp4', operational: 'true'},
    {id: 3, server_id: 1, target_id: 1, frequency: 4845, power: -100, bandwidth: 1, modulation: '8QAM', fec: '3/4', feed:'red 3.mp4', operational: 'true'},
    {id: 4, server_id: 1, target_id: 1, frequency: 5115, power: -100, bandwidth: 10, modulation: '8QAM', fec: '1/2', feed:'red 4.mp4', operational: 'true'},
    {id: 5, server_id: 1, target_id: 1, frequency: 5130, power: -100, bandwidth: 6, modulation: '8QAM', fec: '3/4', feed:'red 5.mp4', operational: 'true'},
    {id: 6, server_id: 1, target_id: 2, frequency: 15710, power: -100, bandwidth: 5, modulation: '8QAM', fec: '3/4', feed:'red 6.mp4', operational: 'true'},
    {id: 7, server_id: 1, target_id: 2, frequency: 15718, power: -100, bandwidth: 1, modulation: '8QAM', fec: '1/2', feed:'red 7.mp4', operational: 'true'},
    {id: 8, server_id: 1, target_id: 2, frequency: 15720, power: -100, bandwidth: 1, modulation: '8QAM', fec: '3/4', feed:'red 8.mp4', operational: 'true'},
    {id: 9, server_id: 1, target_id: 2, frequency: 15722, power: -100, bandwidth: 1, modulation: '8QAM', fec: '3/4', feed:'red 9.mp4', operational: 'true'},
    {id: 10, server_id: 1, target_id: 3, frequency: 16135, power: -100, bandwidth: 2, modulation: '8QAM', fec: '1/2', feed:'blue 1.mp4', operational: 'true'},
    {id: 11, server_id: 1, target_id: 3, frequency: 16140, power: -100, bandwidth: 6, modulation: '8QAM', fec: '1/2', feed:'blue 2.mp4', operational: 'true'},
    {id: 12, server_id: 1, target_id: 3, frequency: 15720, power: -100, bandwidth: 10, modulation: '8QAM', fec: '3/4', feed:'red 1.mp4', operational: 'true'},
    {id: 13, server_id: 1, target_id: 3, frequency: 15730, power: -100, bandwidth: 1, modulation: '8QAM', fec: '3/4', feed:'red 2.mp4', operational: 'true'},
    {id: 14, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 15, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 16, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 17, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 18, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 19, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 20, server_id: 1, target_id: 3, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 21, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 22, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 23, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 24, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 25, server_id: 1, target_id: 1, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 26, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 27, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
    {id: 28, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 29, server_id: 1, target_id: 2, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '3/4', feed:'', operational: 'false'},
    {id: 30, server_id: 1, target_id: 3, frequency: 0, power: -120, bandwidth: 0, modulation: '8QAM', fec: '1/2', feed:'', operational: 'false'},
  ]);
  await knex.raw('SELECT SETVAL(pg_get_serial_sequence(\'signal\',\'id\'), (SELECT MAX(id) FROM signal) )');
};
