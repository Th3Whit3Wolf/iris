import Paper from '@mui/material/Paper';
import PropTypes from "prop-types";
import { FunctionComponent } from "react";
// import { useTheme } from '@mui/material/styles/useTheme';

const Body: FunctionComponent<BodyProps> = ({
	children
}) => {
  // const theme = useTheme();
  const sxBody = {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 0,
    height: '100%',
    width: '100%',
    flexGrow: 1,
    // backgroundColor: theme.astro.tertiary.light3,
  };
  return <Paper sx={sxBody}>{children}</Paper>;
};

Body.propTypes = {
	children: PropTypes.any
};

export default Body;