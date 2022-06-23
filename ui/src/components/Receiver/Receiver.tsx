import { RxModem } from '#components';
import Grid from '@mui/material/Grid';

const Receiver = () => {
  const units = [1, 2, 3, 4];
  return (
    <>
    {units.map(x => (
    <Grid key={x} item xs={6}>
      <RxModem unit={x} />
    </Grid>
  ))}
    </>
  )
}

export default Receiver;