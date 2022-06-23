import { useEffect } from 'react';
import { ARTGrid, SpectrumAnalyzerGrid, TeamInfo } from '#components';
import { Grid } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '#context';

const StudentView = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {setApp: updateAppState} = useAppContext();

  useEffect(() => {
    window.sewApp.init();
    updateAppState();
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, []);

  // Basic check that user is logged in
  useEffect(() => {
    if (!state || state?.isAuthenticated !== true) navigate('/login');
  }, [state, navigate]);

  return (
    <>
      <TeamInfo />
      <Grid container spacing={1} paddingTop={2} paddingBottom={2} paddingLeft={6} paddingRight={6}>
        <SpectrumAnalyzerGrid />
        <ARTGrid />
      </Grid>
    </>
  );
};

export default StudentView;