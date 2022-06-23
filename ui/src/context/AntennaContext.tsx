import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, useMemo, createContext } from "react";
import { AntennaAPI } from "#api";
import { HTTPMethod, useFetchAntenna } from "#hooks";

const defaultAntennaContext = [
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		target_id: 1,
		unit: 1,
		operational: true,
		locked: true,
		band: 0,
		offset: 0,
		hpa: false,
		loopback: true
	},
	{
		id: 2,
		server_id: 1,
		team_id: 1,
		target_id: 2,
		unit: 2,
		operational: true,
		locked: true,
		band: 0,
		offset: 0,
		hpa: false,
		loopback: true
	}
];

const AntennaContext = createContext({} as IAntennaContext);
const win = window as any as AppWindow;

const AntennaProvider: FunctionComponent<AntennaProviderProps> = ({
	children
}) => {
	const [antenna, setAntennaState] = useState(defaultAntennaContext);
	const api = new AntennaAPI();
	const antennaData = useFetchAntenna(api, HTTPMethod.GET);

	if (antennaData !== undefined && Array.isArray(antennaData)) {
		setAntennaState([...antennaData]);
	}

	win.iris.socket.on("updateAntennaClient", (data: any) => {
		if (data.user != win.iris.socket.id) {
			setAntennaState(data.signals);
		}
	});

	const setAntenna = (update: any) => {
		//console.log('updateAntenna');
		win.iris.socket.emit("updateAntenna", {
			user: win.iris.socket.id,
			signals: update
		});
		setAntennaState(update);
	};

	const value = useMemo(() => ({
		antenna, setAntenna
	}), [antenna]);

	return (
		<AntennaContext.Provider value={value}>
				{children}
		</AntennaContext.Provider>
	);
};

const useAntennaContext = (): IAntennaContext => useContext(AntennaContext);

AntennaProvider.propTypes = {
	children: PropTypes.any
};

export { AntennaProvider, AntennaContext, useAntennaContext };
