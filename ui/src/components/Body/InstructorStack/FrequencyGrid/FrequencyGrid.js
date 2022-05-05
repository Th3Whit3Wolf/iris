import React from 'react';
import { Grid } from '@mui/material';
import FrequencyPanel from './FrequencyPanel/FrequencyPanel';

function FrequencyGrid() {
  const units = [1, 2, 3, 4];
  return (
    <>
      <Grid container spacing={1} padding={1}>
        {units.map(x => {
          <Grid item xs={12}>
            <FrequencyPanel unit={x} key={x}/>
          </Grid>
        })}
      </Grid>
    </>
  );
}

export default FrequencyGrid;