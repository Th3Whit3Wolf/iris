import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, createContext } from "react";
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

type IrisWindowT = {
	socket: any;
};
type SocketWindow = Window & {
	iris: IrisWindowT;
};

type AntennaProviderProps = {
	children?: React.ReactNode;
};

interface IAntennaContextItem  {
	id: number,
	server_id: number,
	team_id: number,
	target_id: number,
	unit: number,
	operational: boolean,
	locked: boolean,
	band: number,
	offset: number,
	hpa: boolean,
	loopback: boolean
} 

interface IAntennaContext {
	antenna: IAntennaContextItem[];
	setAntenna: (update: any) => void;
}

const AntennaContext = createContext({} as IAntennaContext);
const win = window as any as SocketWindow;

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

	return (
		<AntennaContext.Provider value={{
			antenna,
			setAntenna
		}}>
				{children}
		</AntennaContext.Provider>
	);
};

const useAntennaContext = (): IAntennaContext => useContext(AntennaContext);

AntennaProvider.propTypes = {
	children: PropTypes.any
};

export { AntennaProvider, AntennaContext, useAntennaContext };
