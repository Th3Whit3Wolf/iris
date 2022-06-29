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
	body?: any
): Promise<Response> => {
	let headers: Headers;
	const url: string = api.toURL();
	body = JSON.stringify(body !== undefined ? body : {});
	switch (method) {
		case HTTPMethod.DELETE:
			headers = new Headers({});
			return fetch(url, {
				method: "DELETE",
				mode: "cors",
				headers
			});
		case HTTPMethod.GET:
			headers = new Headers({});
			return fetch(url, {
				method: "GET",
				mode: "cors",
				headers
			});
		case HTTPMethod.POST:
			headers = new Headers({
				"Content-Type": "application/json; charset=UTF-8"
			});
			return fetch(url, {
				method: "POST",
				mode: "cors",
				headers,
				body
			});
		case HTTPMethod.PUT:
			headers = new Headers({
				"Content-Type": "application/json; charset=UTF-8"
			});
			return fetch(url, {
				method: "PUT",
				mode: "cors",
				headers,
				body
			});
		default:
			throw new Error("Unreachable");
	}
};

type Cache<T = Return> = { [url: string]: T };

function useFetch<T = Return>(
	api: API,
	method: HTTPMethod,
	body?: any
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
				const res = await fetchHandler(api, method, body);

				if (!res.ok) {
					throw new Error(res.statusText);
				}
				const data = (await res.json()) as T;
				cache.current[url] = data;
				if (cancelRequest.current) return;
				dispatch({ type: "fetched", payload: data });
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
	body?: any
): State<ReturnAction | ReturnAction[]> => {
	return useFetch<ReturnAction | ReturnAction[]>(api, method, body);
};

const useFetchAntenna = (
	api: AntennaAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnAntenna | ReturnAntenna[]> => {
	return useFetch<ReturnAntenna | ReturnAntenna[]>(api, method, body);
};

const useFetchAppAuthors = (
	api: AppAuthorsAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnAppAuthor | ReturnAppAuthor[]> => {
	return useFetch<ReturnAppAuthor | ReturnAppAuthor[]>(api, method, body);
};

const useFetchInject = (
	api: InjectAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnInject | ReturnInject[]> => {
	return useFetch<ReturnInject | ReturnInject[]>(api, method, body);
};

const useFetchPlayer = (
	api: PlayerAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnPlayer | ReturnPlayer[]> => {
	return useFetch<ReturnPlayer | ReturnPlayer[]>(api, method, body);
};

const useFetchReceiver = (
	api: ReceiverAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnReceiver | ReturnReceiver[]> => {
	return useFetch<ReturnReceiver | ReturnReceiver[]>(api, method, body);
};

const useFetchSave = (
	api: SaveAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnSave | ReturnSave[]> => {
	return useFetch<ReturnSave | ReturnSave[]>(api, method, body);
};

const useFetchSaveSignal = (
	api: SaveSignalAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnSaveSignal | ReturnSaveSignal[]> => {
	return useFetch<ReturnSaveSignal | ReturnSaveSignal[]>(api, method, body);
};

const useFetchSaveInject = (
	api: SaveInjectAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnSaveInject | ReturnSaveInject[]> => {
	return useFetch<ReturnSaveInject | ReturnSaveInject[]>(api, method, body);
};

const useFetchServer = (
	api: ServerAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnServer | ReturnServer[]> => {
	return useFetch<ReturnServer | ReturnServer[]>(api, method, body);
};

const useFetchSignal = (
	api: SignalAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnSignal | ReturnSignal[]> => {
	return useFetch<ReturnSignal | ReturnSignal[]>(api, method, body);
};

const useFetchSpectrumAnalyzer = (
	api: SpectrumAnalyzerAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnSpectrumAnalyzer | ReturnSpectrumAnalyzer[]> => {
	return useFetch<ReturnSpectrumAnalyzer | ReturnSpectrumAnalyzer[]>(
		api,
		method,
		body
	);
};

const useFetchTarget = (
	api: TargetAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnTarget | ReturnTarget[]> => {
	return useFetch<ReturnTarget | ReturnTarget[]>(api, method, body);
};

const useFetchTeam = (
	api: TeamAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnTeam | ReturnTeam[]> => {
	return useFetch<ReturnTeam | ReturnTeam[]>(api, method, body);
};

const useFetchTransmitter = (
	api: TransmitterAPI,
	method: HTTPMethod,
	body?: any
): State<ReturnTransmitter | ReturnTransmitter[]> => {
	return useFetch<ReturnTransmitter | ReturnTransmitter[]>(api, method, body);
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
