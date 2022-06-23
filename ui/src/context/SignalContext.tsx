import { SignalAPI } from "#api";
import { HTTPMethod, useFetchSignal } from "#hooks";
import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, createContext } from "react";

const defaultSignal = [
	{
		id: 1,
		server_id: 1,
		target_id: 3,
		frequency: 15720,
		power: -100,
		bandwidth: 10,
		modulation: "8QAM",
		fec: "3/4",
		feed: "red 1.mp4",
		operational: false
	},
	{
		id: 1,
		server_id: 1,
		target_id: 3,
		frequency: 15720,
		power: -100,
		bandwidth: 10,
		modulation: "8QAM",
		fec: "3/4",
		feed: "red 1.mp4",
		operational: false
	}
];

const SignalContext = createContext({} as ISignalContext);
const win = window as any as AppWindow;

const SignalProvider: FunctionComponent<SignalProviderProps> = ({
	children
}) => {
	const [signal, setSignalState] = useState(defaultSignal);
	const api = new SignalAPI();
	const signalData = useFetchSignal(api, HTTPMethod.GET);

	if (signalData !== undefined && Array.isArray(signalData)) {
		setSignalState([...signalData]);
	}

	const setSignal = (update: any) => {
        //console.log('SignalProvider', data);
        win.iris.environment.setSignals(update);
        win.iris.socket.emit('updateSignal', { user: win.iris.socket.id, signals: update });

		setSignalState(update);
	};

	return (
		<SignalContext.Provider
			value={{
				signal,
				setSignal
			}}
		>
			{children}
		</SignalContext.Provider>
	);
};

SignalProvider.propTypes = {
	children: PropTypes.any
};

const useSignalContext = (): ISignalContext => useContext(SignalContext);

export { SignalProvider, SignalContext, useSignalContext };