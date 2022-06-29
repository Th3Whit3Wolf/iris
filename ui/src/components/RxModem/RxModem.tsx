import { RxModemButtonBox, RxModemInput, RxVideo } from "#components";
import { useRxContext, useUserContext } from "#context";
import "./RxModem.css";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

interface RxModemProps {
	unit: number;
}

const RxModem = ({ unit }: RxModemProps) => {
	const [activeModem, setActiveModem] = useState(1);
	const [currentRow, setCurrentRow] = useState(1);
	const { user } = useUserContext();
	const { rx } = useRxContext();

	const unitData = rx.filter(
		x =>
			x.unit == unit &&
			x.team_id == user.team_id &&
			x.server_id == user.server_id
	);

	const updateActiveModem = (modem: number) => {
		setActiveModem(modem);
	};

	useEffect(() => {
		const currentModem = unitData.find(x => x.number === activeModem);
		const newCurrentRow = rx.findIndex(x => x.id === currentModem?.id);
		setCurrentRow(newCurrentRow);
	}, [unitData, rx, activeModem]);

	return (
		<Grid container>
			<Grid item xs={"auto"}>
				<RxModemButtonBox
					unitData={unitData}
					activeModem={activeModem}
					unit={unit}
					updateActiveModem={updateActiveModem}
				/>
			</Grid>
			<Grid container item xs={true}>
				<Grid item xs={7}>
					<RxModemInput
						unitData={unitData}
						activeModem={activeModem}
						currentRow={currentRow}
					/>
				</Grid>
				<Grid item xs={5}>
					<RxVideo currentRow={currentRow} />
				</Grid>
			</Grid>
		</Grid>
	);
};

RxModem.propTypes = {
	unit: PropTypes.array,
	tmpRxData: PropTypes.array
};

export default RxModem;
