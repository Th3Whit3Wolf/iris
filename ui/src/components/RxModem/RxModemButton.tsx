// import { useTheme } from '@mui/material/styles/useTheme';
import { selectSound } from "#assets/audio";
import { Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useSound } from "use-sound";

interface RxModemButtonProps {
	modemId: number;
	isActive: boolean;
	updateActiveModem: (modem: number) => void;
}

const sxRxModemButton = ({ isActive }: { isActive: boolean }) => {
	// const theme = useTheme();
	return {
		// backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.primary.light2,
		// border: '2px solid ' + theme.palette.primary.main,
		color: isActive ? "white" : "black",
		width: "5px",
		margin: "8px",
		outline: "none"
		//   '&:hover': {
		//     backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.light,
		//   },
	};
};

const RxModemButton = ({
	modemId,
	isActive,
	updateActiveModem
}: RxModemButtonProps) => {
	const [playSelectSound] = useSound(selectSound);
	return (
		<Tooltip title={`Receive Modem ${modemId}`}>
			<Button
				sx={sxRxModemButton({ isActive })}
				onClick={() => {
					playSelectSound();
					updateActiveModem(modemId);
				}}
			>
				{modemId}
			</Button>
		</Tooltip>
	);
};

export default RxModemButton;

RxModemButton.propTypes = {
	modemId: PropTypes.number.isRequired,
	isActive: PropTypes.bool.isRequired,
	updateActiveModem: PropTypes.func.isRequired
};
