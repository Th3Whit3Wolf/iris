import { TransmitterAPI } from "#api";
import { breakerSound, errorSound, selectSound } from "#assets/audio";
// import { useTheme } from '@mui/material/styles/useTheme';
import { useTxContext } from "#context";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSound } from "use-sound";

interface TxModemInputProps {
	activeModem: number;
	currentRow: number;
	unitData: Array<ITxContextItem>;
}

interface TxModemHandleInputChangeNumber {
	param: "antenna_id" | "frequency" | "bandwidth" | "power";
	val: number;
}
interface TxModemHandleInputChangeString {
	param: "power";
	val: string;
}
type TxModemHandleInputChangeProps =
	| TxModemHandleInputChangeNumber
	| TxModemHandleInputChangeString;

const LPLM = 75;
const LPLH = 90;
const popupTimeoutTime = 3000;

const sxModalError = {
	position: "fixed",
	zIndex: "100",
	top: "0%",
	left: "50%",
	transform: "translate(-50%, 10%)",
	// bgcolor: theme.palette.critical.main,
	color: "#fff",
	// border: `5px solid ${theme.palette.critical.main}`,
	borderRadius: "0px",
	boxShadow: 24,
	maxWidth: "50%",
	minWidth: "30%",
	p: 2
};

const sxValues = {
	fontWeight: "bold",
	textAlign: "center"
};

const sxValuesGrid = {
	// backgroundColor: theme.palette.tertiary.light3,
	// border: '1px solid' + theme.palette.tertiary.light,
	borderRadius: "5px"
};

const LinearProgressWithLabel = (props: any) => {
	const rawPw = Math.round(props.value);
	const pw = Math.min(100, rawPw);
	// const theme = useTheme();
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1, ml: 1 }}>
				{pw < LPLM ? (
					<LinearProgress variant="determinate" {...props} value={pw} />
				) : null}
				{pw >= LPLM && pw < LPLH ? (
					<LinearProgress
						variant="determinate"
						{...props}
						value={pw}
						color={"error"}
					/>
				) : null}
				{pw >= LPLH ? (
					<LinearProgress
						variant={rawPw > 100 ? "indeterminate" : "determinate"}
						{...props}
						value={pw}
						color={"critical"}
					/>
				) : null}
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">
					{`${rawPw}%`}
				</Typography>
			</Box>
		</Box>
	);
};

const sxInputApply = {
	// backgroundColor: theme.palette.tertiary.light3,
	boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
	color: "black",
	cursor: "pointer"
};

const TxModemInput = ({
	unitData,
	activeModem,
	currentRow
}: TxModemInputProps) => {
	const [playSelectSound] = useSound(selectSound);
	const [playBreakerSound] = useSound(breakerSound);
	const [playErrorSound] = useSound(errorSound);
	const { tx, setTx } = useTxContext();
	const powerBudget = 23886; // Decided by SEW team
	const [isErrorActive, setErrorActive] = useState(false);
	const [inputData, setInputData] = useState(tx[currentRow]);
	const [modemPower, setModemPower] = useState(
		inputData.bandwidth * Math.pow(10, (120 + inputData.power) / 10)
	);
	const api = new TransmitterAPI();

	const sxTransmit = {
		cursor: "pointer",
		marginLeft: "10px",
		boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
		border: "1px solid red",
		// backgroundColor: unitData.filter((x) => x.modem_number == activeModem)[0].transmitting
		//   ? 'red'
		//   : theme.palette.tertiary.light3,
		color: unitData.filter(x => x.modem_number == activeModem)[0].transmitting
			? "white"
			: "black",
		"&:hover": {
			//   backgroundColor: unitData.filter((x) => x.modem_number == activeModem)[0].transmitting
			//     ? theme.palette.error.main
			//     : theme.palette.critical.main,
			color: unitData.filter(x => x.modem_number == activeModem)[0].transmitting
				? "black"
				: "white"
		}
	};

	useEffect(() => {
		setInputData(tx[currentRow]);
		setModemPower(
			inputData.bandwidth * Math.pow(10, (120 + inputData.power) / 10)
		);
	}, [tx, currentRow]);

	const handleInputChange = ({ param, val }: TxModemHandleInputChangeProps) => {
		const valParsed = 0;
		const tmpData = { ...inputData };
		if (param === "power") {
			const power: string = val as string;
			// if contains any symbols except - and number then return
			if (power.match(/[^0-9-]/g)) return;
			if (!isNaN(parseInt(power))) {
				tmpData[param] = valParsed;
			}
		} else {
			tmpData[param] = val;
		}
		tmpData[param] = valParsed;
		setInputData(tmpData);
	};

	const validatePowerConsumption = (_modemPower = modemPower) =>
		Math.round((100 * _modemPower) / powerBudget) <= 100;

	const handleApply = () => {
		playSelectSound();
		const tmpData = [...tx];
		tmpData[currentRow] = { ...inputData };

		if (
			validatePowerConsumption(
				inputData.bandwidth * Math.pow(10, (120 + inputData.power) / 10)
			) ||
			!tmpData[currentRow].transmitting
		) {
			setTx(tmpData);
			setModemPower(
				inputData.bandwidth * Math.pow(10, (120 + inputData.power) / 10)
			);
			api.update(tmpData[currentRow]);
		} else {
			setErrorActive(true);
			playErrorSound();
			setTimeout(() => {
				setErrorActive(false);
			}, popupTimeoutTime);
		}
	};

	const handleTransmit = () => {
		playBreakerSound();
		const tmpData = [...tx];

		if (validatePowerConsumption()) {
			tmpData[currentRow].transmitting = !tmpData[currentRow].transmitting;
			setTx(tmpData);
			// console.log('CRUD Tx: ', tmpData[currentRow]);
			api.update(tmpData[currentRow]);
		} else {
			setErrorActive(true);
			playErrorSound();
			setTimeout(() => {
				setErrorActive(false);
			}, popupTimeoutTime);
		}
	};

	return (
		<>
			{isErrorActive ? (
				<Box sx={sxModalError}>
					<Typography>Power consumption exceeds the budget.</Typography>
				</Box>
			) : null}
			<Grid container mt={1} pb={2} height={"100%"}>
				<Grid container item xs={12} spacing={0.5}>
					<Grid container item xs={12} alignItems="center" /*justify='center'*/>
						<Grid item xs={3} textAlign="right">
							<Typography>Antenna</Typography>
						</Grid>
						<Grid item xs={4} pr={2}>
							<select
								name="Antenna"
								value={inputData.antenna_id}
								onChange={e =>
									handleInputChange({
										param: "antenna_id",
										val: parseInt(e.target.value) || 0
									})
								}
							>
								<option value={1}>1</option>
								<option value={2}>2</option>
							</select>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={true} sx={sxValuesGrid}>
							<Typography sx={sxValues}>{tx[currentRow].antenna_id}</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12} alignItems="center" /*justify='center'*/>
						<Grid item xs={3} textAlign="right">
							<Typography>Freq</Typography>
						</Grid>
						<Grid item xs={4} pr={2}>
							<input
								name="frequency"
								type="text"
								value={inputData.frequency}
								onChange={e =>
									handleInputChange({
										param: "frequency",
										val: parseInt(e.target.value) || 0
									})
								}
							></input>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={true} sx={sxValuesGrid}>
							<Typography sx={sxValues}>
								{tx[currentRow].frequency + " MHz"}
							</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12} alignItems="center" /*justify='center'*/>
						<Grid item xs={3} textAlign="right">
							<Typography>BW</Typography>
						</Grid>
						<Grid item xs={4} pr={2}>
							<input
								name="bandwidth"
								type="text"
								value={inputData.bandwidth}
								onChange={e =>
									handleInputChange({
										param: "bandwidth",
										val: parseInt(e.target.value) || 0
									})
								}
							></input>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={true} sx={sxValuesGrid}>
							<Typography sx={sxValues}>
								{tx[currentRow].bandwidth + " MHz"}
							</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12} alignItems="center" /*justify='center'*/>
						<Grid item xs={3} textAlign="right">
							<Typography>Power</Typography>
						</Grid>
						<Grid item xs={4} pr={2}>
							<input
								name="power"
								type="string"
								value={inputData.power}
								onChange={e =>
									handleInputChange({ param: "power", val: e.target.value })
								}
							></input>
						</Grid>
						<Grid item xs={1}></Grid>
						<Grid item xs={true} sx={sxValuesGrid}>
							<Typography
								sx={sxValues}
							>{`${tx[currentRow].power} dBm`}</Typography>
						</Grid>
					</Grid>
					<Grid container item xs={12} alignItems="center" /*justify='center'*/>
						<Grid item xs={3} textAlign="right">
							<Typography>Power %</Typography>
						</Grid>
						<Grid item xs={true}>
							<LinearProgressWithLabel
								value={Math.round((100 * modemPower) / powerBudget)}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
					textAlign="right"
					alignItems={"flex-end"}
					justifyContent={"flex-end"}
					// flexGrow={true}
					display={"flex"}
				>
					<Tooltip title="Commit Changes">
						<Button sx={sxInputApply} onClick={handleApply}>
							Apply
						</Button>
					</Tooltip>
					<Tooltip
						title={
							!unitData.filter(x => x.modem_number == activeModem)[0]
								.transmitting
								? "Enable Transmitter"
								: "Disable Transmitter"
						}
					>
						<Button sx={sxTransmit} onClick={handleTransmit}>
							TX
						</Button>
					</Tooltip>
				</Grid>
			</Grid>
		</>
	);
};

TxModemInput.propTypes = {
	unitData: PropTypes.array.isRequired,
	activeModem: PropTypes.number.isRequired,
	currentRow: PropTypes.number.isRequired
};

export default TxModemInput;