import Grid from '@mui/material/Grid';
import { TxModem } from '#components';

const Transmitter = () => {
  const units = [1, 2, 3, 4];
  return (
    <>
    {units.map((x, index) => (
      <Grid item key={index} xs={6} sm={6} md={6} lg={6} xl={3}>
        <TxModem unit={x} />
      </Grid>
    ))}
    </>
  )
};

export default Transmitter;