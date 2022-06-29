type AntennaProviderProps = {
	children?: React.ReactNode;
};

interface IAntennaContextItem {
	id: number;
	server_id: number;
	team_id: number;
	target_id: number;
	unit: number;
	operational: boolean;
	locked: boolean;
	band: number;
	offset: number;
	hpa: boolean;
	loopback: boolean;
}

interface IAntennaContext {
	antenna: IAntennaContextItem[];
	setAntenna: (update: any) => void;
}

interface ColorModePoviderProps {
	children?: React.ReactNode;
}

interface IColorModeContext {
	toggleColorMode: () => void;
}

type IrisApp = {
	announceSpecAChange: (i: number) => Promise<Response | undefined> | undefined;
	getSpectrumAnalyzer: (i: number) => ISpectrumAnalyzer | null;
	init: () => void;

	constants: any;
	environment: any;
	socket: any;
	socketInit: any;

	specA1: ISpectrumAnalyzer | null;
	specA2: ISpectrumAnalyzer | null;
	specA3: ISpectrumAnalyzer | null;
	specA4: ISpectrumAnalyzer | null;

	team: any;
	teamInfo: {
		team: string;
		server: string;
	};
};

type AppProviderProps = {
	children?: React.ReactNode;
};

interface IAppContext {
	app: IrisApp;
	setApp: () => void;
}

interface ISpectrumAnalyzerFreq {
	id: number;
	freq: number;
	span: number;
}

interface ISpectrumAnalyzerIF {
	config: {
		if: ISpectrumAnalyzerFreq;
	};
	whichUnit: number;
	isRfMode: boolean;
	centerFreq: number;
	bw: number;
	isDrawHold: boolean;
	antenna_id: number;
	target_id: number;
	signals: any;
}

interface ISpectrumAnalyzerRF {
	config: {
		rf: ISpectrumAnalyzerFreq;
	};
	whichUnit: number;
	isRfMode: boolean;
	centerFreq: number;
	bw: number;
	isDrawHold: boolean;
	antenna_id: number;
	target_id: number;
	signals: any;
}

type ISpectrumAnalyzer = ISpectrumAnalyzerIF | ISpectrumAnalyzerRF;

type RxProviderProps = {
	children?: React.ReactNode;
};

interface IRxContextItem {
	id: number;
	server_id: number;
	team_id: number;
	unit: number;
	number: number;
	operational: boolean;
	antenna_id: number;
	frequency: number;
	bandwidth: number;
	modulation: string;
	fec: string;
}

interface IRxContext {
	rx: IRxContextItem[];
	setRx: (update: any) => void;
}

type SignalProviderProps = {
	children?: React.ReactNode;
};

interface ISignalContextItem {
	id: number;
	server_id: number;
	target_id: number;
	frequency: number;
	power: number;
	bandwidth: number;
	modulation: string;
	fec: string;
	feed: string;
	operational: boolean;
}

interface ISignalContext {
	signal: ISignalContextItem[];
	setSignal: (update: any) => void;
}

type TxProviderProps = {
	children?: React.ReactNode;
};

interface ITxContextItem {
	id: number;
	server_id: number;
	team_id: number;
	unit: number;
	modem_number: number;
	operational: boolean;
	antenna_id: number;
	frequency: number;
	bandwidth: number;
	power: number;
	transmitting: boolean;
}

interface ITxContext {
	tx: ITxContextItem[];
	setTx: (update: any) => void;
}

interface IUserContextItem {
	server_id: number;
	team_id: number;
}

interface IUserContext {
	user: IUserContextItem;
	setUser: (update: any) => void;
}

type UserProviderProps = {
	children?: React.ReactNode;
};
