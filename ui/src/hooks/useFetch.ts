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
import { useEffect, useReducer, useRef } from "react";

const fetchHandler = async (
	api: API,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	let res;
	switch (method) {
		case HTTPMethod.DELETE:
			res = await api.delete();
			break;
		case HTTPMethod.GET:
			res = await api.get();
			break;
		case HTTPMethod.POST:
			res = await api.create(methodData !== undefined ? methodData : {});
			break;
		case HTTPMethod.PUT:
			res = await api.update(methodData !== undefined ? methodData : {});
			break;
	}
	return res;
};

type Cache<T = Return> = { [url: string]: T };

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
	const fetchReducer = (
		currentState: State<T>,
		action: Action<T>
	): State<T> => {
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
				const res = await fetchHandler(api, method, methodData);

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
	return useFetch<ReturnSaveSignal | ReturnSaveSignal[]>(
		api,
		method,
		methodData
	);
};

const useFetchSaveInject = (
	api: SaveInjectAPI,
	method: HTTPMethod,
	methodData?: Record<string, unknown>
) => {
	return useFetch<ReturnSaveInject | ReturnSaveInject[]>(
		api,
		method,
		methodData
	);
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
	return useFetch<ReturnSpectrumAnalyzer | ReturnSpectrumAnalyzer[]>(
		api,
		method,
		methodData
	);
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
	return useFetch<ReturnTransmitter | ReturnTransmitter[]>(
		api,
		method,
		methodData
	);
};

export {
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
