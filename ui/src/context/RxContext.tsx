import { ReceiverAPI } from "#api";
import { HTTPMethod, useFetchReceiver } from "#hooks";
import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, useMemo, createContext } from "react";

const defaultRxContext = [
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 1,
		number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 2,
		server_id: 1,
		team_id: 1,
		unit: 1,
		number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 3,
		server_id: 1,
		team_id: 1,
		unit: 1,
		number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 4,
		server_id: 1,
		team_id: 1,
		unit: 1,
		number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 5,
		server_id: 1,
		team_id: 1,
		unit: 2,
		number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 6,
		server_id: 1,
		team_id: 1,
		unit: 2,
		number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 7,
		server_id: 1,
		team_id: 1,
		unit: 2,
		number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 8,
		server_id: 1,
		team_id: 1,
		unit: 2,
		number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 9,
		server_id: 1,
		team_id: 1,
		unit: 3,
		number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 10,
		server_id: 1,
		team_id: 1,
		unit: 3,
		number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 11,
		server_id: 1,
		team_id: 1,
		unit: 3,
		number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 12,
		server_id: 1,
		team_id: 1,
		unit: 3,
		number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 13,
		server_id: 1,
		team_id: 1,
		unit: 4,
		number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 14,
		server_id: 1,
		team_id: 1,
		unit: 4,
		number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 15,
		server_id: 1,
		team_id: 1,
		unit: 4,
		number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	},
	{
		id: 16,
		server_id: 1,
		team_id: 1,
		unit: 4,
		number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		modulation: "BPSK",
		fec: "1/2"
	}
];

const RxContext = createContext({} as IRxContext);
const win = window as any as AppWindow;

const RxProvider: FunctionComponent<RxProviderProps> = ({ children }) => {
	const [rx, setRxState] = useState(defaultRxContext);
	const api = new ReceiverAPI();
	const rxData = useFetchReceiver(api, HTTPMethod.GET);

	if (rxData !== undefined && Array.isArray(rxData)) {
		setRxState([...rxData]);
	}

	win.iris.socket.on("updateRxClient", (data: any) => {
		if (data.user != win.iris.socket.id) {
			console.log("actually updating the Rx");
			setRxState(data.signals);
		}
	});

	const setRx = (update: any) => {
		win.iris.socket.emit("updateRx", {
			user: win.iris.socket.id,
			signals: update
		});
		setRxState(update);
	};

	const value = useMemo(() => ({
		rx, setRx
	}), [rx]);

	return (
		<RxContext.Provider
			value={value}
		>
			{children}
		</RxContext.Provider>
	);
};

RxProvider.propTypes = {
	children: PropTypes.any
};

const useRxContext = (): IRxContext => useContext(RxContext);

export { RxProvider, RxContext, useRxContext };
