import { useEffect, useReducer, useRef } from "react";

const enum HTTPMethod {
	DELETE,
	GET,
	POST,
	PUT
}

import {
	ActionAPI,
	AntennaAPI,
	AppAuthorsAPI,
	InjectAPI,
	PlayerAPI,
	ReceiverAPI,
	SaveAPI,
	SaveSignalAPI,
	SaveInjectAPI,
	ServerAPI,
	SignalAPI,
	SpectrumAnalyzerAPI,
	TargetAPI,
	TeamAPI,
	TransmitterAPI
} from "#api";

type API =
	| ActionAPI
	| AntennaAPI
	| AppAuthorsAPI
	| InjectAPI
	| PlayerAPI
	| ReceiverAPI
	| SaveAPI
	| SaveSignalAPI
	| SaveInjectAPI
	| ServerAPI
	| SignalAPI
	| SpectrumAnalyzerAPI
	| TargetAPI
	| TeamAPI
	| TransmitterAPI;

interface State<T> {
	data?: T;
	error?: Error;
}

interface ReturnAction {
	id: number;
	antenna_id: { type: "number" };
	bandwidth: { type: "number" };
	frequency: { type: "number" };
	modem_number: { type: "number" };
	name: { type: "string" };
	operational: { type: "boolean" };
	power: { type: "number" };
	server_id: { type: "number" };
	team_id: { type: "number" };
	time: { type: "Date" };
	unit: { type: "number" };
}

interface ReturnAntenna {
	id: number;
	band: string;
	hpa: boolean;
	locked: boolean;
	loopback: boolean;
	offset: number;
	operational: boolean;
	server_id: number;
	target_id: number;
	team_id: number;
	unit: number;
}

interface ReturnAppAuthor {
	id: number;
	first_name: string;
	last_name: string;
}

interface ReturnInject {
	id: number;
	equipment: string;
	operational: boolean;
	server_id: number;
	time: Date;
	unit: number;
}

interface ReturnPlayer {
	id: number;
	name: string;
	server_id: number;
	team_id: number;
}

interface ReturnReceiver {
	id: number;
	antenna_id: number;
	bandwidth: number;
	fec: string;
	frequency: number;
	modulation: string;
	number: number;
	operational: boolean;
	server_id: number;
	team_id: number;
	unit: number;
}

interface ReturnSave {
	id: number;
	name: string;
}

interface ReturnSaveInject {
	id: number;
	save_id: number;
	signal_id: number;
}

interface ReturnSaveSignal {
	id: number;
	save_id: number;
	signal_id: number;
}

interface ReturnServer {
	id: number;
	name: string;
	start_time: {
		type: "Date";
	};
}

interface ReturnSignal {
	id: number;
	bandwidth: number;
	fec: string;
	feed: string;
	frequency: number;
	modulation: string;
	operational: boolean;
	power: number;
	server_id: number;
	target_id: number;
}

interface ReturnSpectrumAnalyzer {
	id: number;
	antenna_id: number;
	frequency: number;
	marker1freq: number;
	marker2freq: number;
	number: number;
	operational: boolean;
	rf: boolean;
	server_id: number;
	span: number;
	team_id: number;
	trace: boolean;
	unit: number;
}

interface ReturnTarget {
	id: number;
	name: string;
	offset: number;
}

interface ReturnTeam {
	id: number;
	name: string;
}

interface ReturnTransmitter {
	id: number;
	antenna_id: number;
	bandwidth: number;
	frequency: number;
	modem_number: number;
	operational: boolean;
	power: number;
	server_id: number;
	team_id: number;
	transmitting: boolean;
	unit: number;
}

type Return =
	| ReturnAction
	| ReturnAction[]
	| ReturnAntenna
	| ReturnAntenna[]
	| ReturnAppAuthor
	| ReturnAppAuthor[]
	| ReturnInject
	| ReturnInject[]
	| ReturnPlayer
	| ReturnPlayer[]
	| ReturnReceiver
	| ReturnReceiver[]
	| ReturnSave
	| ReturnSave[]
	| ReturnSaveInject
	| ReturnSaveInject[]
	| ReturnSaveSignal
	| ReturnSaveSignal[]
	| ReturnServer
	| ReturnServer[]
	| ReturnSignal
	| ReturnSignal[]
	| ReturnSpectrumAnalyzer
	| ReturnSpectrumAnalyzer[]
	| ReturnTarget
	| ReturnTarget[]
	| ReturnTeam
	| ReturnTeam[]
	| ReturnTransmitter
	| ReturnTransmitter[];

type Cache<T = Return> = { [url: string]: T };

// discriminated union type
type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error };

const fetchHandler = async (api: API, method: HTTPMethod, methodData?: Record<string, unknown>) => {
	let res
	switch (method) {
		case HTTPMethod.DELETE:
			res = await api.delete();
			break;
		case HTTPMethod.GET:
			res = await api.get();
			break;
		case HTTPMethod.POST:
			res = await api.create(
				methodData !== undefined ? methodData : {}
			);
			break;
		case HTTPMethod.PUT:
			res = await api.update(
				methodData !== undefined ? methodData : {}
			);
			break;
	}
	return res;
}

function useFetch<T = Return>(
	api: API,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
): State<T> {
	const cache = useRef<Cache<T>>({});

	// Used to prevent state update if the component is unmounted
	const cancelRequest = useRef<boolean>(false);
	const initialState: State<T> = {
		error: undefined,
		data: undefined
	};

	// Keep state logic separated
	const fetchReducer = (currentState: State<T>, action: Action<T>): State<T> => {
		switch (action.type) {
			case "loading":
				return { ...initialState };
			case "fetched":
				return { ...initialState, data: action.payload };
			case "error":
				return { ...initialState, error: action.payload };
			default:
				return currentState;
		}
	};

	const [state, dispatch] = useReducer(fetchReducer, initialState);

	useEffect(() => {
		// Do nothing if the api is not given
		const url = api.toURL();
		cancelRequest.current = false;
		const fetchData = async () => {
			dispatch({ type: "loading" });

			// If a cache exists for this url, return it
			if (cache.current[url]) {
				dispatch({ type: "fetched", payload: cache.current[url] });
				return;
			}

			try {
				const res = await fetchHandler(api, method, methodData)

				if (res !== undefined) {
					if (!res.ok) {
						throw new Error(res.statusText);
					}
					const data = (await res.json()) as T;
					cache.current[url] = data;
					if (cancelRequest.current) return;
					dispatch({ type: "fetched", payload: data });
				}
			} catch (error) {
				if (cancelRequest.current) return;
				dispatch({ type: "error", payload: error as Error });
			}
		};

		void fetchData();

		// Use the cleanup function for avoiding a possibly...
		// ...state update after the component was unmounted
		return () => {
			cancelRequest.current = true;
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [api]);

	return state;
}

const useFetchAction = (
	api: ActionAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnAction | ReturnAction[]>(api, method, methodData);
};

const useFetchAntenna = (
	api: AntennaAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnAntenna | ReturnAntenna[]>(api, method, methodData);
};

const useFetchAppAuthors = (
	api: AppAuthorsAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
		return useFetch<ReturnAppAuthor | ReturnAppAuthor[]>(api, method, methodData);
};

const useFetchInject = (
	api: InjectAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnInject | ReturnInject[]>(api, method, methodData);
};

const useFetchPlayer = (
	api: PlayerAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnPlayer | ReturnPlayer[]>(api, method, methodData);
};

const useFetchReceiver = (
	api: ReceiverAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnReceiver | ReturnReceiver[]>(api, method, methodData);
};

const useFetchSave = (
	api: SaveAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSave | ReturnSave[]>(api, method, methodData);
};

const useFetchSaveSignal = (
	api: SaveSignalAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSaveSignal | ReturnSaveSignal[]>(api, method, methodData);
};

const useFetchSaveInject = (
	api: SaveInjectAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSaveInject | ReturnSaveInject[]>(api, method, methodData);
};

const useFetchServer = (
	api: ServerAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnServer | ReturnServer[]>(api, method, methodData);
};

const useFetchSignal = (
	api: SignalAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSignal | ReturnSignal[]>(api, method, methodData);
};

const useFetchSpectrumAnalyzer = (
	api: SpectrumAnalyzerAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSpectrumAnalyzer | ReturnSpectrumAnalyzer[]>(api, method, methodData);
};

const useFetchTarget = (
	api: TargetAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnTarget | ReturnTarget[]>(api, method, methodData);
};

const useFetchTeam = (
	api: TeamAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnTeam | ReturnTeam[]>(api, method, methodData);
};

const useFetchTransmitter = (
	api: TransmitterAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnTransmitter | ReturnTransmitter[]>(api, method, methodData);
};

export {
	HTTPMethod,
	type ReturnServer,
	type ReturnTarget,
	type ReturnTeam,
	type ReturnTransmitter,
	useFetchAction,
	useFetchAntenna,
	useFetchAppAuthors,
	useFetchInject,
	useFetchPlayer,
	useFetchReceiver,
	useFetchSave,
	useFetchSaveSignal,
	useFetchSaveInject,
	useFetchServer,
	useFetchSignal,
	useFetchSpectrumAnalyzer,
	useFetchTarget,
	useFetchTeam,
	useFetchTransmitter
};
