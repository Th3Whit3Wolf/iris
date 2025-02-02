import React from 'react';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { teams } from '../../constants';
import { useUser, useUpdateUser } from '../../context';
import { useFetch } from '../../hooks/useFetch';

export default function Login() {
  const user = useUser();
  console.log(user)
  const setUser = useUpdateUser();
  const navigate = useNavigate();
  const { data: servers } = useFetch('data/server')
  console.log(servers)

  const handleSubmit = event => {
    event.preventDefault();
    navigate('/student', { state: { isAuthenticated: true } });
  };

  const handleTeamChange = (value) => {
    console.log(value)
    setUser({...user, team_id: value})
  }
  const handleServerChange = (server_id) => {
    setUser({...user, server_id: server_id})
  }

  return (
    <Box
      component='form'
      textAlign={'center'}
      justifyContent={'center'}
      onSubmit={handleSubmit}
      bgcolor='background.paper'
      sx={{
        margin: 'auto',
        borderRadius: '5px',
        padding: '20px',
        maxWidth: '500px',
        boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.2)',
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      novalidate
      autocomplete='off'>
      <div>
        <label htmlFor='team'>Team</label>
        <select
          name='team'
          type='string'
          value={teams[user.team_id-1].id}
          onChange={e => handleTeamChange(parseInt(e.target.value))}>
            {teams.map((x, index) => (
              <option key={index} value={x.id}>{x.name}</option>
            ))}
          </select>
        <label htmlFor='server'>Server</label>
      </div>
      <div>
        <select
          name='server'
          type='string'
          value={user.server_id}
          onChange={e => handleServerChange(parseInt(e.target.value))}>
            {servers.map((x, index) => (
              <option key={index} value={x.id}>{x.name}</option>
            ))}
          </select>
      </div>
      <Button type='submit' size='large' variant='contained' color='primary'>
        Submit
      </Button>
    </Box>
  );
}
