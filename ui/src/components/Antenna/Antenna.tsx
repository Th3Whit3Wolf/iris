import Grid from '@mui/material/Grid';
import { AntennaController } from '#components';

const Antenna = () => {
  return(
    <>
      <Grid item xs={6}>
        <AntennaController unit={1} />
      </Grid>
      <Grid item xs={6}>
        <AntennaController unit={2} />
      </Grid>
    </>
)};

export default Antenna;