import { Video } from "#components";
import { antennas, satellites } from "#constants";
import {
	useAntennaContext,
	useTxContext,
	useRxContext,
	useSignalContext,
	useUserContext
} from "#context";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

interface RxVideoProps {
	currentRow: number;
}

interface TmpRxDataRow extends IRxContextItem {
	found: boolean;
	degraded: boolean;
	denied: boolean;
}

const RxVideo = ({ currentRow }: RxVideoProps) => {
	const [matchFound, setMatchFound] = useState(false);
	const [isDenied, setIsDenied] = useState(false);
	const [isOperational, setIsOperational] = useState(false);
	const [isLocked, setIsLocked] = useState(false);
	const [vidFeed, setVidFeed] = useState("");
	const { user } = useUserContext();
	const { antenna } = useAntennaContext();
	const { rx, setRx } = useRxContext();
	const { tx, setTx } = useTxContext();
	const { signal } = useSignalContext();

	useEffect(() => {
		let deniedFound = false;
		const tmpRxDataRow = { ...rx[currentRow] } as TmpRxDataRow; // Clone the object

		// NOTE: Since currently the only transmitters are owned by the user, we can assume that initially
		// there is no signal degradation and only after checking the active transmitters later on in this
		// function would any degradation/denial be assigned.
		//
		// In the future this logic should be removed from RxModem into something less tangled with the equipment.
		tmpRxDataRow.found = false;
		tmpRxDataRow.degraded = false;
		tmpRxDataRow.denied = false;
		//console.log(`========== modem: ${currentModem} | currentRow: ${currentRow} | id: ${unitData[currentModem].id} =============`)
		const {
			frequency: r_freq,
			bandwidth: r_bw,
			modulation: r_mod,
			fec: r_fec
		} = rx[currentRow];
		//console.log('rx: ', sewAppCtx.rx[currentRow])
		const {
			target_id: a_tgt,
			band: a_band,
			operational: a_operational,
			locked: a_locked
		} = antenna[rx[currentRow].antenna_id - 1];
		setIsOperational(a_operational);
		setIsLocked(a_locked);
		setMatchFound(false);
		signal?.forEach(signal => {
			const {
				frequency: s_freq,
				bandwidth: s_bw,
				modulation: s_mod,
				fec: s_fec,
				target_id: s_tgt,
				feed,
				power
			} = signal; // TODO: loop through all signals to find one that matches

            const dc_offset = antennas[a_band]?.downconvert / 1e6;
			//const dc_offset = antennas[parseInt(a_band)]?.downconvert / 1e6;
			const if_freq = s_freq - dc_offset;
			const s_lb = if_freq - 0.5 * s_bw;
			const s_rb = if_freq + 0.5 * s_bw;
			const s_flb = s_lb - 0.25 * s_bw;
			const s_frb = s_rb + 0.25 * s_bw;
			const r_lb = r_freq - 0.5 * r_bw;
			const r_rb = r_freq + 0.5 * r_bw;

			const rxPartialMatch =
				r_lb <= s_lb && // receiver left bound is withing tolerance
				r_lb >= s_flb &&
				r_rb >= s_rb && // receiver right bound is within tolerance
				r_rb <= s_frb &&
				a_tgt === s_tgt; // satellites match

			const rxMatch =
				rxPartialMatch &&
				r_fec === s_fec && // reciever fec rate matches
				r_mod === s_mod; // receiver modulation schema matches

			if (rxMatch && a_operational && a_locked) {
				tmpRxDataRow.found = true;
				//console.log('rxMatch signal: ', signal)
				let degraded = "";
				const activeTransmitters = tx.filter(x => x.transmitting);
				activeTransmitters.forEach(transmission => {
					//console.log(transmission)
					const {
						frequency: t_freq,
						bandwidth: t_bw,
						power: t_power
					} = transmission;
					const {
						target_id: t_tgt,
						band: t_band,
						offset: t_offset
					} = antenna[transmission.antenna_id - 1];
					const t_uc_offset = antennas[t_band]?.upconvert / 1e6;
					const t_dc_offset = antennas[t_band]?.downconvert / 1e6;
					const s_offset = satellites[t_tgt - 1].offset / 1e6;
					const offset =
						!antenna[transmission.antenna_id - 1].loopback &&
						antenna[transmission.antenna_id - 1].hpa
							? s_offset
							: t_offset;
					const t_if_freq = t_freq + t_uc_offset + offset - t_dc_offset;
					const t_lb = t_if_freq - 0.5 * t_bw;
					const t_rb = t_if_freq + 0.5 * t_bw;
					if (t_lb <= s_rb && t_rb >= s_lb && t_tgt === s_tgt) {
						degraded = "degraded ";
						tmpRxDataRow.degraded = true;
					} else {
						tmpRxDataRow.degraded = false;
					}
					if (
						t_lb <= s_lb &&
						t_rb >= s_rb &&
						t_tgt === s_tgt &&
						t_power > power
					) {
						setIsDenied(true);
						deniedFound = true;
						tmpRxDataRow.denied = true;
					} else {
						tmpRxDataRow.denied = false;
					}
				});
				setVidFeed(`${degraded}${feed}`);
				setMatchFound(true);
				if (!deniedFound) {
					setIsDenied(false);
				}
			} else if (rxPartialMatch && a_operational && a_locked) {
				setMatchFound(true);
				setVidFeed("");
				tmpRxDataRow.degraded = true;
				tmpRxDataRow.found = true;
			}
		});
		if (JSON.stringify(tmpRxDataRow) !== JSON.stringify(rx[currentRow])) {
			const tmpRxData = rx;
			tmpRxData[currentRow] = tmpRxDataRow;
			setRx([...tmpRxData]);
		}
	}, [signal, tx, rx, antenna]);

	return (
		<Box
			sx={{
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				paddingLeft: "0.5rem",
				textAlign: "center"
			}}
		>
			{matchFound && !isDenied && isOperational && isLocked ? (
				<Video src={`/videos/${vidFeed}`} />
			) : (
				<Typography
					variant="h6"
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						height: "100%"
					}}
				>
					No Signal
				</Typography>
			)}
		</Box>
	);
};

RxVideo.propTypes = {
	currentRow: PropTypes.number.isRequired
};

export default RxVideo;
