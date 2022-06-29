import { RxModemButton } from "#components";
// import { useTheme } from '@mui/material/styles/useTheme';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";

interface RxModemButtonBoxProps {
	activeModem: number;
	updateActiveModem: (modem: number) => void;
	unit: number;
	unitData: Array<IRxContextItem>;
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

const RxModemButtonBox = ({
	activeModem,
	updateActiveModem,
	unit,
	unitData
}: RxModemButtonBoxProps) => {
	const sortedUnitData = [...unitData].sort((a, b) => a.id - b.id);
	return (
		<Box width={80} sx={sxModemButtonBox()}>
			{sortedUnitData.map((x, index) => {
				if (x.unit == unit)
					return (
						<RxModemButton
							key={index}
							modemId={x.number}
							isActive={x.number === activeModem}
							updateActiveModem={updateActiveModem}
						/>
					);
			})}
		</Box>
	);
};

RxModemButtonBox.propTypes = {
	unit: PropTypes.number,
	unitData: PropTypes.array,
	activeModem: PropTypes.number,
	updateActiveModem: PropTypes.func.isRequired
};

export default RxModemButtonBox;
