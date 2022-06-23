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

// discriminated union type
type Action<T> =
	| { type: "loading" }
	| { type: "fetched"; payload: T }
	| { type: "error"; payload: Error };

enum HTTPMethod {
	DELETE,
	GET,
	POST,
	PUT
}
