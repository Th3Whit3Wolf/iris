import { ReactNode, useState } from 'react';
import PropTypes from 'prop-types';

// import { useTheme } from '@mui/material/styles/useTheme';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import CellTowerIcon from '@mui/icons-material/CellTower';
import AlignHorizontalCenterIcon from '@mui/icons-material/AlignHorizontalCenter';

import { useAntennaContext, useUserContext } from '#context';
import { antennas, satellites } from '#constants';
import { AntennaAPI } from '#api';
import './Antenna.css';



const AntennaController = ({ unit }: {unit: number}) => {
  const {user} = useUserContext();
  // const theme = useTheme();
  const {antenna, setAntenna} = useAntennaContext();
  const unitData = antenna.filter(x => x.unit == unit && x.team_id == user.team_id && x.server_id == user.server_id)
  const index = antenna.map(x => x.id).indexOf(unitData[0].id)
  const api = new AntennaAPI();

  // Styles
  const sxAntennaCase = {
    flexGrow: 1,
    margin: 'auto',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
    // backgroundColor: AstroTheme.palette.tertiary.light2,
    // border: '1px solid' + AstroTheme.palette.tertiary.light,
    display: 'grid',
    gridTemplateColumns: '30px 6fr 12fr',
    justifyContent: 'space-between',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  };
  const sxAntennaCaseId = {
    color: 'white',
    margin: '8px',
    textAlign: 'center',
  };
  const sxValues = {
    fontWeight: 'bold',
    textDecoration: 'underline',
  };
  const sxInputBox = {
    //backgroundColor: AstroTheme.palette.tertiary.light2,
    margin: '8px',
    borderRadius: '4px',
    display: 'grid',
    flexDirection: 'column',
  };
  const sxInputRow = {
    display: 'grid',
    gridTemplateColumns: '100px 100px 100px',
    textAlign: 'left',
    margin: '2px',
  };
  const sxInputApply = {
    //backgroundColor: theme.palette.tertiary.light3,
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
    color: 'black',
    margin: '8px',
    cursor: 'pointer',
  };
  const sxLoopback = {
    width: '100px',
    padding: '8px',
    borderRadius: '5px',
    //backgroundColor: theme.palette.tertiary.light3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
  };
  const sxLoopbackSwitch = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const sxHPA = {
    marginTop: '5px',
    // backgroundColor: antenna[index].hpa ? 'red' : theme.palette.tertiary.light3,
    // color: antenna[index].hpa ? 'white' : 'black',
    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
    border: '1px solid red',
    // '&:hover': {
    //   backgroundColor: antenna[index].hpa ? theme.palette.error.main : theme.palette.critical.main,
    //   color: antenna[index].hpa ? 'black' : 'white',
    // },
  };
  const sxTx = {
    // backgroundColor: antenna[index].loopback
    //   ? theme.palette.tertiary.light2
    //   : antenna[index].hpa
    //   ? 'red'
    //   : 'green',
    borderRadius: '10px',
  };
  // Modem Case Id
  const sidebar: Array<ReactNode> = [];
  ['A', 'N', 'T'].forEach(x => {
    sidebar.push(
      <Typography key={`AntennaControllerSidebar-${x}`} sx={{ color: 'black' }}>
        {x}
      </Typography>
    );
  });
  const AntennaCaseId = () => (
    <Box sx={sxAntennaCaseId}>
      {sidebar}
      <br></br>
      <Typography>{unit}</Typography>
    </Box>
  );

  // Antenna User Inputs
  // Target Band Offset
  const AntennaInput = () => {
    const [inputData, setInputData] = useState(antenna[index]);
    const handleInputChange = ({ param, val}: { param: "offset" | "target_id" | "band", val: string}) => {
      let valParsed = 0;
      const tmpInputData = { ...inputData };
      if (param === 'offset') {
        // if contains any symbols except - and number then return
        if (val.match(/[^0-9-]/g)) return;
        if (!isNaN(parseInt(val))) {
          valParsed = parseInt(val);
        }
      } else {
        valParsed = parseInt(val);
      }
      tmpInputData[param] = valParsed;
      setInputData(tmpInputData);
    };
    const handleApply = () => {
      const tmpData = [...antenna];
      tmpData[index] = inputData;
      setAntenna(tmpData);
      api.update(tmpData[index]);
    };
    return (
      <Box sx={sxInputBox}>
        <Box sx={sxInputRow}>
          <label htmlFor='Target'>Target</label>
          <select
            name='Target'
            value={inputData.target_id}
            onChange={e => handleInputChange({ param: 'target_id', val: e.target.value })}>
            {satellites.map((x, idx) => {
              return (
                <option value={x.id} key={`AntennaControllerTargetOption-${idx+1}`}>
                  {x.name}
                </option>
              );
            })}
          </select>
          <Typography sx={sxValues}>{satellites[antenna[index].target_id - 1].name}</Typography>
        </Box>
        <Box sx={sxInputRow}>
          <label htmlFor='Band'>Band</label>
          <select
            name='band'
            value={inputData.band}
            onChange={e => handleInputChange({ param: 'band', val: e.target.value })}>
            {antennas.map((x, idx) => {
              return (
                <option value={idx} key={`AntennaControllerBandOption-${idx+1}`}>
                  {x.band}
                </option>
              );
            })}
          </select>
          <Typography sx={sxValues}>{antennas[antenna[index]?.band]?.band}</Typography>
        </Box>
        <Box sx={sxInputRow}>
          <label htmlFor='offset'>Offset</label>
          <input
            name='offset'
            type='text'
            value={inputData.offset}
            onChange={e => {
              handleInputChange({ param: 'offset', val: e.target.value });
            }}></input>
          <Typography sx={sxValues}>{antenna[index].offset + ' MHz'}</Typography>
        </Box>
        <Box sx={sxInputRow}>
          <div></div>
          <Button sx={sxInputApply} onClick={handleApply}>
            Apply
          </Button>
        </Box>
      </Box>
    );
  };

  // Baseball switch
  const LoopbackSwitch = () => {
    const toggleSwitch = () => {
      const tmpData = [...antenna];
      const loopback = tmpData[index].loopback;
      tmpData[index].loopback = !loopback;
      setAntenna(tmpData);
      api.update(tmpData[index]);
    };
    const handleHPA = () => {
      const tmpData = [...antenna];
      const hpa = tmpData[index].hpa;
      tmpData[index].hpa = !hpa;
      setAntenna(tmpData);
      api.update(tmpData[index]);
    };
    return (
      <Box sx={sxLoopback}>
        <Typography align='center'>IF</Typography>
        <Box sx={sxLoopbackSwitch}>
          <SettingsBackupRestoreIcon />
          <center>
            <button
              className='lb_img'
              onClick={() => toggleSwitch()}
              style={{
                backgroundImage: `baseball_switch${antenna[index].loopback ? '' : '2'}.png`
              }}
            />
          </center>
          <CellTowerIcon sx={sxTx} />
        </Box>
        <AlignHorizontalCenterIcon />
        <Button sx={sxHPA} onClick={handleHPA}>
          <Typography>HPA</Typography>
        </Button>
      </Box>
    );
  };

  return (
    <>
      <Box sx={sxAntennaCase}>
        <AntennaCaseId />
        <LoopbackSwitch />
        <AntennaInput />
      </Box>
    </>
  );
};

AntennaController.propTypes = {
  unit: PropTypes.number,
};


export default AntennaController;