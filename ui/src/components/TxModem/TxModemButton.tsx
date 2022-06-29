// import { useTheme } from '@mui/material/styles/useTheme';
import { selectSound } from "#assets/audio";
import { Button, Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import { useSound } from "use-sound";

interface TxModemButtonProps {
	modemId: number;
	isTransmitting: boolean;
	isActive: boolean;
	updateActiveModem: (modem: number) => void;
}

interface sxTxModemButtonProps {
	isTransmitting: boolean;
	isActive: boolean;
}

const sxTxModemButton = ({
	isTransmitting,
	isActive
}: sxTxModemButtonProps) => {
	// const theme = useTheme();
	return {
		// backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.primary.light2,
		// border: isTransmitting ? '2px solid red' : '2px solid ' + theme.palette.primary.main,
		color: isActive ? "white" : "black",
		width: "5px",
		margin: "8px",
		outline: "none"
		// '&:hover': {
		//   backgroundColor: isActive ? theme.palette.primary.main : theme.palette.primary.light,
		// },
	};
};

const TxModemButton = ({
	modemId,
	isTransmitting,
	isActive,
	updateActiveModem
}: TxModemButtonProps) => {
	const [playSelectSound] = useSound(selectSound);
	return (
		<Tooltip title={"Transmit Modem " + modemId.toString()}>
			<Button
				sx={sxTxModemButton({ isTransmitting, isActive })}
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

TxModemButton.propTypes = {
	modemId: PropTypes.number.isRequired,
	isTransmitting: PropTypes.bool.isRequired,
	isActive: PropTypes.bool.isRequired,
	updateActiveModem: PropTypes.func.isRequired
};

export default TxModemButton;
