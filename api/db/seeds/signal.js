/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => { 
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE signal CASCADE');
  await knex('signals').del();
  await knex('signals').insert([
    {
      server_id: 1,
      target_id: 1,
      frequency: 4810,
      power: -100,
      bandwidth: 5,
      modulation: '8QAM',
      fec: '1/2',
      feed: 'red 1.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 4820,
      power: -100,
      bandwidth: 3,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 2.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 4845,
      power: -100,
      bandwidth: 1,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 3.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 5115,
      power: -100,
      bandwidth: 10,
      modulation: '8QAM',
      fec: '1/2',
      feed: 'red 4.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 5130,
      power: -100,
      bandwidth: 6,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 5.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 15710,
      power: -100,
      bandwidth: 5,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 6.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 15718,
      power: -100,
      bandwidth: 1,
      modulation: '8QAM',
      fec: '1/2',
      feed: 'red 7.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 15720,
      power: -100,
      bandwidth: 1,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 8.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 15722,
      power: -100,
      bandwidth: 1,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 9.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 16135,
      power: -100,
      bandwidth: 2,
      modulation: '8QAM',
      fec: '1/2',
      feed: 'blue 1.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 16140,
      power: -100,
      bandwidth: 6,
      modulation: '8QAM',
      fec: '1/2',
      feed: 'blue 2.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 15720,
      power: -100,
      bandwidth: 10,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 1.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 15730,
      power: -100,
      bandwidth: 1,
      modulation: '8QAM',
      fec: '3/4',
      feed: 'red 2.mp4',
      operational: true
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 1,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 2,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '3/4',
      feed: '',
      operational: false
    },
    {
      server_id: 1,
      target_id: 3,
      frequency: 0,
      power: -120,
      bandwidth: 0,
      modulation: '8QAM',
      fec: '1/2',
      feed: '',
      operational: false
    },
  ]);
};
