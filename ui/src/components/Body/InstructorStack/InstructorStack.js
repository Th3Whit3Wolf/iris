import React from 'react';
import { Grid } from '@mui/material';
import ControlPanel from './ControlPanel/ControlPanel';
import TimelinePanel from './TimelinePanel/TimelinePanel';
import FrequencyGrid from './FrequencyGrid/FrequencyGrid';

function InstructorStack() {
  return (
    <>
      <Grid container spacing={1} padding={1}>
        <ControlPanel />
        <TimelinePanel />
        <FrequencyGrid />
      </Grid>
    </>
  );
}

export default InstructorStack;