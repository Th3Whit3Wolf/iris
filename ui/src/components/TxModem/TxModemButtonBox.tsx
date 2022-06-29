import { TxModemButton } from "#components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

interface TxModemButtonBoxProps {
	activeModem: number;
	updateActiveModem: (modem: number) => void;
	unit: number;
	unitData: Array<ITxContextItem>;
}

const sxModemButtonBox = () => {
	// const theme = useTheme();
	return {
		// backgroundColor: theme.palette.tertiary.light3,
		// border: '1px solid' + theme.palette.tertiary.light,
		marginTop: "-1px",
		marginBottom: "-1px",
		height: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around"
	};
};

const TxModemButtonBox = ({
	unitData,
	unit,
	activeModem,
	updateActiveModem
}: TxModemButtonBoxProps) => {
	const sortedUnitData = [...unitData].sort((a, b) => a.id - b.id);

	return (
		<Box sx={sxModemButtonBox} width={80}>
			{sortedUnitData.map((x, index) => {
				if (x.unit == unit) {
					return (
						<TxModemButton
							key={index}
							modemId={x.modem_number}
							isTransmitting={x.transmitting}
							isActive={x.modem_number === activeModem}
							updateActiveModem={updateActiveModem}
						/>
					);
				}
			})}
		</Box>
	);
};

TxModemButtonBox.propTypes = {
	unitData: PropTypes.array.isRequired,
	unit: PropTypes.number.isRequired,
	activeModem: PropTypes.number.isRequired,
	updateActiveModem: PropTypes.func.isRequired
};

export default TxModemButtonBox;
