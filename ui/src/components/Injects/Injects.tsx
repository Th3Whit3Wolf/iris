import { SignalAPI } from "#api";
// import { useTheme } from '@mui/material/styles/useTheme';
import { Video } from "#components";
import { satellites } from "#constants";
import { useSignalContext, useAppContext } from "#context";
import "./Injects.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { useState, useRef, ReactNode } from "react";

interface RxModemHandleInputChangeNumber {
	param: "target_id" | "frequency" | "bandwidth";
	val: number;
}
interface RxModemHandleInputChangeString {
	param: "modulation" | "fec" | "feed";
	val: string;
}
type RxModemHandleInputChangeProp =
	| RxModemHandleInputChangeNumber
	| RxModemHandleInputChangeString;

const Injects = () => {
  // const theme = useTheme();
	const api = new SignalAPI();
	const { app } = useAppContext();
	const { signal: signals, setSignal: setSignals } = useSignalContext();
	const [activeModem, setActiveModem] = useState(0);
	/*
  useEffect(() => {
    fetch('http://localhost:8080/data/signal')
        .then(res => res.json())
        .then(res => setSignals(res))
  }, [])
  */

	// Styles
	const sxCase = {
		flexGrow: 1,
		// backgroundColor: theme.palette.tertiary.light2,
		borderRadius: "10px",
		boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
		// border: '1px solid' + theme.palette.tertiary.light,
		display: "grid",
		gridTemplateColumns: "30px 3fr 5fr 2fr 3fr",
		justifyContent: "space-between",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif"
	};
	const sxCaseId = {
		color: "white",
		margin: "8px",
		textAlign: "center"
	};
	const sxModemButtonBox = {
		// backgroundColor: theme.palette.tertiary.light3,
		borderRadius: "5px",
		boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)"
	};
	const sxValues = {
		fontWeight: "bold",
		textDecoration: "underline"
	};
	const sxInputBox = {
		// backgroundColor: theme.palette.tertiary.light2,
		margin: "8px",
		borderRadius: "4px",
		display: "grid",
		flexDirection: "column"
	};
	const sxInputRow = {
		display: "grid",
		gridTemplateColumns: "80px 180px 180px",
		textAlign: "left",
		margin: "2px"
	};
	const sxInputApply = {
		// backgroundColor: theme.palette.tertiary.light3,
		boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
		color: "black",
		margin: "8px",
		cursor: "pointer"
	};

	const sxTransmit = {
		cursor: "pointer",
		margin: "8px",
		boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.5)",
		border: "1px solid red",
		// backgroundColor: signals[activeModem]?.operational ? 'red' : theme.palette.tertiary.light3,
		color: signals[activeModem]?.operational ? "white" : "black",
		"&:hover": {
			// backgroundColor: signals[activeModem]?.operational
			//   ? theme.palette.error.main
			//   : theme.palette.critical.main,
			color: signals[activeModem]?.operational ? "black" : "white"
		}
	};

	const signalsSorted = [...signals].sort((a, b) => a.id - b.id);

	// Modem Case Id
	const sidebar: Array<ReactNode> = [];
	["S", "I", "G", "N", "A", "L", "S"].forEach(x => {
		sidebar.push(
			<Typography key={`InjectSidebar-${x}`} sx={{ color: "black" }}>
				{x}
			</Typography>
		);
	});
	const RxCaseId = () => <Box sx={sxCaseId}>{sidebar}</Box>;
	// Modem selector buttons
	const RxModemButtonBox = () => (
		<Box sx={sxModemButtonBox}>
			{signalsSorted.map((x, index) => (
				<RxModemButton key={index} modem={x.id} />
			))}
		</Box>
	);
	const RxModemButton = ({ modem }: { modem: number }) => {
		const timer = useRef<any>();

		const onClickHandler = (e: any) => {
			clearTimeout(timer.current);
			if (e.detail === 1) {
				const curModem = parseInt(e.target.innerText) - 1;
				setActiveModem(curModem);
				// timer.current = setTimeout(
				//   setActiveModem(
				//     parseInt(e.target.innerText) - 1),
				//      200);
			} else if (e.detail === 2) {
				const tmpData = [...signals];
				tmpData[activeModem].operational = !tmpData[activeModem].operational;
				setSignals(tmpData);
				api.update(tmpData[activeModem]);
			}
		};
		return (
			<Button
				sx={{
					// backgroundColor: modem - 1 == activeModem ? theme.palette.primary.dark : theme.palette.primary.light2,
					color: modem - 1 == activeModem ? "white" : "black",
					// border: signals[signals.map(x => x.id).indexOf(modem)].operational ? '2px solid red' : '2px solid ' + theme.palette.primary.main,
					margin: "8px",
					cursor: "pointer",
					"&:hover": {
						// backgroundColor: theme.palette.primary.light3,
					}
				}}
				onClick={e => {
					onClickHandler(e);
				}}
			>
				{modem}
			</Button>
		);
	};
	RxModemButton.propTypes = { modem: PropTypes.number };

	// Modem User Inputs
	const RxModemInput = () => {
		const index = signals.map(x => x.id).indexOf(activeModem + 1);
		const [inputData, setInputData] = useState(signals[index]);
		const handleInputChange = ({
			param,
			val
		}: RxModemHandleInputChangeProp) => {
			const tmpData: ISignalContextItem = { ...inputData };
			if (
				param === "target_id" ||
				param === "frequency" ||
				param === "bandwidth"
			) {
				tmpData[param] = val;
				return setInputData(tmpData);
			}

			if (param === "modulation" || param === "fec" || param === "feed") {
				tmpData[param] = val;
				return setInputData(tmpData);
			}
		};

		const handleApply = () => {
			const tmpData = [...signals];
			tmpData[index] = inputData;
			setSignals(tmpData);
			api.update(tmpData[index]);
		};

		const handleTransmit = () => {
			const tmpData = [...signals];
			tmpData[index].operational = !tmpData[index].operational;
			setSignals(tmpData);
			api.update(tmpData[index]);
		};

		return (
			<Box sx={sxInputBox}>
				<Box sx={sxInputRow}>
					<label htmlFor="Satellite">Satellite</label>
					<select
						name="Satellite"
						value={inputData.target_id}
						onChange={e =>
							handleInputChange({
								param: "target_id",
								val: parseInt(e.target.value)
							})
						}
					>
						{satellites.map((x, idx) => (
							<option key={`InjectsSatelliteOption-${idx + 1}`} value={x.id}>
								{x.name}
							</option>
						))}
					</select>
					<Typography sx={sxValues}>
						{
							/*
              Originally this was 
              `satellites[sewAppCtx.signals[index]]?.name`

              It is not understood how this ever acheived the desired effect
              or if it actually worked.
              */
							satellites[signals[index].id]?.name
						}
					</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<label htmlFor="frequency">Frequency</label>
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
					<Typography sx={sxValues}>
						{signals[index].frequency + " MHz"}
					</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<label htmlFor="bandwidth">Bandwidth</label>
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
					<Typography sx={sxValues}>
						{signals[index].bandwidth + " MHz"}
					</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<label htmlFor="modulation">Modulation</label>
					<select
						name="modulation"
						value={inputData.modulation}
						onChange={e =>
							handleInputChange({ param: "modulation", val: e.target.value })
						}
					>
						<option value="BPSK">BPSK</option>
						<option value="QPSK">QPSK</option>
						<option value="8QAM">8QAM</option>
						<option value="16QAM">16QAM</option>
					</select>
					<Typography sx={sxValues}>{signals[index].modulation}</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<label htmlFor="fec">FEC</label>
					<select
						name="fec"
						value={inputData.fec}
						onChange={e =>
							handleInputChange({ param: "fec", val: e.target.value })
						}
					>
						<option value="1/2">1/2</option>
						<option value="2/3">2/3</option>
						<option value="3/4">3/4</option>
						<option value="5/6">5/6</option>
						<option value="7/8">7/8</option>
					</select>
					<Typography sx={sxValues}>{signals[index].fec}</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<label htmlFor="feed">Feed</label>
					<select
						name="feed"
						value={inputData.feed}
						onChange={e =>
							handleInputChange({ param: "feed", val: e.target.value })
						}
					>
						<option value="blue 1.mp4">Blue 1</option>
						<option value="blue 2.mp4">Blue 2</option>
						<option value="red 1.mp4">Red 1</option>
						<option value="red 2.mp4">Red 2</option>
						<option value="red 3.mp4">Red 3</option>
						<option value="red 4.mp4">Red 4</option>
						<option value="red 5.mp4">Red 5</option>
						<option value="red 6.mp4">Red 6</option>
						<option value="red 7.mp4">Red 7</option>
						<option value="red 8.mp4">Red 8</option>
						<option value="red 9.mp4">Red 9</option>
					</select>
					<Typography sx={sxValues}>{signals[activeModem].feed}</Typography>
				</Box>
				<Box sx={sxInputRow}>
					<div></div>
					<Button sx={sxInputApply} onClick={handleApply}>
						Apply
					</Button>
					<Button sx={sxTransmit} onClick={handleTransmit}>
						TX
					</Button>
				</Box>
			</Box>
		);
	};

	const RxVideo = () => {
		return <Video src={`/videos/${signals[activeModem].feed}`} />;
	};

	return (
		<>
			<Box sx={sxCase}>
				<RxCaseId />
				<RxModemButtonBox />
				<RxModemInput />
				<RxVideo />
			</Box>
		</>
	);
};

export default Injects;
