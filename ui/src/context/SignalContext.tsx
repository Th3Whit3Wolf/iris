import { SignalAPI } from "#api";
import { useFetchSignal } from "#hooks";
import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, useMemo, createContext } from "react";

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
const SignalProvider: FunctionComponent<SignalProviderProps> = ({
	children
}) => {
	const [signal, setSignalState] = useState(defaultSignal);
	const api = new SignalAPI();
	const {data: signalData, error: signalError} = useFetchSignal(api, HTTPMethod.GET);

	if (signalError) {
		console.error({signalError});
	}
	if (!signalData) {
		console.log("Loading signal data...");
	}

	if (signalData && Array.isArray(signalData)) {
		setSignalState([...signalData]);
	}

	const setSignal = (update: any) => {
        //console.log('SignalProvider', data);
        window.iris.environment.setSignals(update);
        window.iris.socket.emit('updateSignal', { user: window.iris.socket.id, signals: update });

		setSignalState(update);
	};

	const value = useMemo(() => ({
		signal, setSignal
	}), [signal]);

	return (
		<SignalContext.Provider
			value={value}
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