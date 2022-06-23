import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { teams } from '#constants';
import { useUserContext } from '#context';
import { HTTPMethod, useFetchServer } from '#hooks';
import { ServerAPI } from '#api';

const Login = () => {
  const {user, setUser} = useUserContext();
  console.log(user)
  const navigate = useNavigate();
  const api = new ServerAPI();
  const {data: servers} = useFetchServer(api, HTTPMethod.GET);
  console.log(servers)

  // React.FormEventHandler<HTMLFormElement> | undefined
  const handleSubmit = (event: any) => {
    event.preventDefault();
    navigate('/student', { state: { isAuthenticated: true } });
  };

  const handleTeamChange = (value: number) => {
    console.log(value)
    setUser({...user, team_id: value})
  }
  const handleServerChange = (server_id: number) => {
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
      >
      <div>
        <label htmlFor='team'>Team</label>
        <select
          name='team'
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
          value={user.server_id}
          onChange={e => handleServerChange(parseInt(e.target.value))}>
            {servers !== undefined && Array.isArray(servers) && servers.map((x: any, index: number) => (
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

export default Login;