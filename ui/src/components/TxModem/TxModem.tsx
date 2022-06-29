// import { useTheme } from '@mui/material/styles/useTheme';
import { TxModemButtonBox, TxModemInput } from "#components";
import { useTxContext, useUserContext } from "#context";
import "./TxModem.css";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

interface TxModemProps {
	unit: number;
}

const TxModem = ({ unit }: TxModemProps) => {
	const [activeModem, setActiveModem] = useState(1);
	const [currentRow, setCurrentRow] = useState(1);
	const { tx } = useTxContext();
	const { user } = useUserContext();
	const unitData = tx.filter(
		x =>
			x.unit == unit &&
			x.team_id == user.team_id &&
			x.server_id == user.server_id
	);

	const updateActiveModem = (modem: number) => {
		setActiveModem(modem);
	};

	useEffect(() => {
		const currentModem = unitData.find(x => x.modem_number === activeModem);
		const newCurrentRow = tx.findIndex(x => x.id === currentModem?.id);
		setCurrentRow(newCurrentRow);
	}, [unitData, tx, activeModem]);

	return (
		<Grid container>
			<Grid item xs={"auto"}>
				<TxModemButtonBox
					unitData={unitData}
					activeModem={activeModem}
					unit={unit}
					updateActiveModem={updateActiveModem}
				/>
			</Grid>
			<Grid item xs={true}>
				<TxModemInput
					unitData={unitData}
					activeModem={activeModem}
					currentRow={currentRow}
				/>
			</Grid>
		</Grid>
	);
};

TxModem.propTypes = {
	unit: PropTypes.number
};

export default TxModem;
