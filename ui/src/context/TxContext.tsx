import { TransmitterAPI } from "#api";
import { HTTPMethod, useFetchTransmitter } from "#hooks";
import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, createContext } from "react";

const defaultTxContext = [
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 1,
		modem_number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 1,
		modem_number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 1,
		modem_number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 1,
		modem_number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 2,
		modem_number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 2,
		modem_number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 2,
		modem_number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 2,
		modem_number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 3,
		modem_number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 3,
		modem_number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 3,
		modem_number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 3,
		modem_number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 4,
		modem_number: 1,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 4,
		modem_number: 2,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 4,
		modem_number: 3,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	},
	{
		id: 1,
		server_id: 1,
		team_id: 1,
		unit: 4,
		modem_number: 4,
		operational: true,
		antenna_id: 1,
		frequency: 1000,
		bandwidth: 10,
		power: -70,
		transmitting: false
	}
];

const TxContext = createContext({} as ITxContext);
const win = window as any as AppWindow;

const TxProvider: FunctionComponent<TxProviderProps> = ({ children }) => {
	const [tx, setTxState] = useState(defaultTxContext);
	const api = new TransmitterAPI();
	const txData = useFetchTransmitter(api, HTTPMethod.GET);

	if (txData !== undefined && Array.isArray(txData)) {
		setTxState([...txData]);
	}

	win.iris.socket.on("updateTxClient", (data: any) => {
		if (data.user != win.iris.socket.id) {
			console.log("actually updating the Tx");
			setTxState(data.signals);
		}
	});

	const setTx = (update: any) => {
		win.iris.socket.emit("updateTx", {
			user: win.iris.socket.id,
			signals: update
		});
		setTxState(update);
	};

	return (
		<TxContext.Provider value={{ tx, setTx }}>{children}</TxContext.Provider>
	);
};

TxProvider.propTypes = {
	children: PropTypes.any
};

const useTxContext = (): ITxContext => useContext(TxContext);

export { TxProvider, TxContext, useTxContext };
