import React from 'react';
// import { useState } from 'react';
import { Grid, Box, Paper } from '@mui/material';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import { AstroTheme } from '../../../../themes/AstroTheme';

// const [ isLoadOpen, setIsLoadOpen ] = useState(false)
// const [ isSaveOpen, setIsSaveOpen ] = useState(false)
// const [ isCreateOpen, setIsCreateOpen ] = useState(false)
// const [ isDeleteOpen, setIsDeleteOpen ] = useState(false)
// const [ isScheduleOpen, setIsScheduleOpen ] = useState(false)

// Should set up signalsContext to pass this between ControlPanel and popups
// const [ signals, setSignals ] = useState({})

const ControlPanelStyle = {
  backgroundColor: '#005a8f',
  textAlign: 'center',
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  borderRadius: '10px',
  boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
  border: '1px solid #005a8f',
  overflow: 'hidden',
  position: 'relative',
  zIndex: '1',
};

const yellowButtonStyle = {
  backgroundColor: AstroTheme.palette.warning.main,
  '&:hover': {
    backgroundColor: AstroTheme.palette.warning.Lighten2,
  },
  color: 'black',
  border: '1px solid black',
  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
  borderColor: AstroTheme.palette.warning.dark,
  height: '50px',
  margin: 'auto',
};

function createData(name, antenna, spec_a, tx_modem, rx_modem, sat_1, sat_2, sat_3, sat_4, sat_5, sat_6) {
  return { name, antenna, spec_a, tx_modem, rx_modem, sat_1, sat_2, sat_3, sat_4, sat_5, sat_6 };
}

const rows = [
  createData("Instructor", [1, 2], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1]),
  createData("Team 1", [1, 2], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1]),
  createData("Team 2", [1, 2], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1]),
  createData("Team 3", [1, 2], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1]),
  createData("Team 4", [1, 2], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3], [1, 2, 3, 4, 5], [1, 2], [1, 2, 3, 4, 5, 6, 7], [1, 2, 3], [1])
];

function ControlPanel() {

  return (
    <Box sx={ControlPanelStyle}>
      <Grid container spacing={1} xs={12} sx={{ padding: '8px', justifyContent: 'space-around', alignItems: 'center' }}>
        <Grid item xs={2}>
          <Grid item xs={12} sx={{ rowGap: '10px', padding: '10px' }}>
            <Button
              sx={{
                ...yellowButtonStyle
              }}>
              <h2>Load</h2>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ rowGap: '10px', padding: '10px' }}>
            <Button
              sx={{
                ...yellowButtonStyle
              }}>
              <h2>Save</h2>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ rowGap: '10px', padding: '10px' }}>
            <Button
              sx={{
                ...yellowButtonStyle
              }}>
              <h2>Create</h2>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ rowGap: '10px', padding: '10px' }}>
            <Button
              sx={{
                ...yellowButtonStyle
              }}>
              <h2>Delete</h2>
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ rowGap: '10px', padding: '10px' }}>
            <Button
              sx={{
                ...yellowButtonStyle
              }}>
              <h2>Schedule</h2>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, backgroundColor: '#1976d2' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell><h2>ANTENNA</h2></TableCell>
                  <TableCell align="right"><h2>SPEC A</h2></TableCell>
                  <TableCell align="right"><h2>TX MODEM</h2></TableCell>
                  <TableCell align="right"><h2>RX MODEM</h2></TableCell>
                  <TableCell align="right"><h2>SAT 1</h2></TableCell>
                  <TableCell align="right"><h2>SAT 2</h2></TableCell>
                  <TableCell align="right"><h2>SAT 3</h2></TableCell>
                  <TableCell align="right"><h2>SAT 4</h2></TableCell>
                  <TableCell align="right"><h2>SAT 5</h2></TableCell>
                  <TableCell align="right"><h2>SAT 6</h2></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.spec_a}</TableCell>
                    <TableCell align="right">{row.tx_modem}</TableCell>
                    <TableCell align="right">{row.rx_modem}</TableCell>
                    <TableCell align="right">{row.sat_1}</TableCell>
                    <TableCell align="right">{row.sat_2}</TableCell>
                    <TableCell align="right">{row.sat_3}</TableCell>
                    <TableCell align="right">{row.sat_4}</TableCell>
                    <TableCell align="right">{row.sat_5}</TableCell>
                    <TableCell align="right">{row.sat_6}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ControlPanel;
