import './TeamInfo.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
// import useTheme from '@mui/material/styles/useTheme';
import { ServerAPI } from '#api';
import { useFetchServer } from '#hooks';
import { useUserContext } from '#context';
import { teams } from '#constants';

const TeamInfo = () => {
  const {user} = useUserContext();
  const api = new ServerAPI();
  const { data: servers } = useFetchServer(api, HTTPMethod.GET);
  // const theme = useTheme();
  const serverName = Array.isArray(servers) ? servers[user.server_id - 1]?.name : servers?.name;
  
  console.log({servers});

  return (
    <Grid
      container
      spacing={1}
      sx={{
        // backgroundColor: theme.palette.tertiary.main,
        color: 'white',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.8)',
        height: '60px',
        alignItems: 'center',
      }}>
      <Grid item xs={4} sx={{ textAlign: 'left' }}>
        <Typography variant='h5' paddingLeft='30px' component='div' sx={{ fontFamily: 'Nasa', paddingLeft: '10px' }}>
          Space Electronic Warfare Sandbox
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'center' }}>
        <Typography variant='h6' component='div'>
          Team: {teams[user?.team_id - 1].name}
        </Typography>
      </Grid>
      <Grid item xs={4} sx={{ textAlign: 'right' }}>
        <Typography paddingRight='30px' variant='h6' component='div'>
          Server: {servers ? serverName : 'Disconnected'}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default TeamInfo;
