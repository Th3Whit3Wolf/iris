import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import config from '../config';
const antennaContext = React.createContext();
const updateAntennaContext = React.createContext();

const defaultAntennaContext = [
  {
    id: 1,
    server_id: 1,
    team_id: 1,
    target_id: 1,
    unit: 1,
    operational: true,
    locked: true,
    band: 0,
    offset: 0,
    hpa: false,
    loopback: true,
  },
  {
    id: 2,
    server_id: 1,
    team_id: 1,
    target_id: 2,
    unit: 2,
    operational: true,
    locked: true,
    band: 0,
    offset: 0,
    hpa: false,
    loopback: true,
  },
];

export const useAntenna = () => {
  return useContext(antennaContext);
};

export const useUpdateAntenna = () => {
  return useContext(updateAntennaContext);
};

export const AntennaProvider = ({ children }) => {
  const [antenna, setAntenna] = useState(defaultAntennaContext);
  useEffect(() => {
    const ApiUrl = config[process.env.REACT_APP_NODE_ENV || 'development'].apiUrl;
    fetch(`${ApiUrl}/data/antenna`)
      .then(response => response.json())
      .then(data => {
        data.forEach(antenna => {
          antenna.band = parseInt(antenna.band);
        });
        console.log('AntennaProvider', data);
        setAntenna([...data]);
      });
  }, []);

  window.sewApp.socket.on('updateAntennaClient', data => {
    if (data.user != window.sewApp.socket.id) {
      setAntenna(data.signals);
    }
  });

  const updateAntenna = (update, startup) => {
    console.log('updateAntenna', startup);
    if (!startup) window.sewApp.socket.emit('updateAntenna', { user: window.sewApp.socket.id, signals: update });
    setAntenna(update);
  };

  return (
    <antennaContext.Provider value={antenna}>
      <updateAntennaContext.Provider value={updateAntenna}>{children}</updateAntennaContext.Provider>
    </antennaContext.Provider>
  );
};

AntennaProvider.propTypes = {
  children: PropTypes.any,
};
