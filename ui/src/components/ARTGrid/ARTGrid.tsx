import Grid from '@mui/material/Grid';
import {Receiver, Antenna, Transmitter } from '#components';

const ARTGrid = () => (
  <>
    <Grid container item spacing={1} xs={12}>
      <Antenna />
    </Grid>
    <Grid container item spacing={1} xs={12}>
      <Transmitter />
      <Receiver />
    </Grid>
  </>
);

export default ARTGrid;