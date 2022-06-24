import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, useMemo, createContext } from "react";
import { SpectrumAnalyzerAPI } from "#api";
import { RfEnvironment } from "../RfEnvironment";
import { antennas, satellites } from "#constants";
// eslint-disable-next-line no-unused-vars
import { io, Socket } from "socket.io-client";

// Create a sync global context for the RF Environments
const defaultApp: IrisApp = {
	teamInfo: {
		team: "",
		server: ""
	},
	//updateTxData: useUpdateTx(),
	init: () => {
		window.iris.socketInit(window.iris.socket);
	},
	constants: {
		satellites,
		antennas
	},
	environment: new RfEnvironment(),
	socket: io(`${process.env.API_URL}`, { transports: ["websocket"] }),

	/**
	 *
	 * @param {Socket} socket
	 */
	socketInit: (socket: Socket) => {
		socket.on("connect", () => {
			console.log("Connected to the server");
			window.iris.teamInfo = {
				team: "default",
				server: ""
			};
			socket.emit("updateTeam", { team: window.iris.team });

			socket.on("updateSignals", (update: any) => {
				const update_targetsAdded = update.signals.map((x: any) => {
					//const antenna_id = x.antenna_id;
					//const target_id = antennaContext.filter(y => y.id == antenna_id).target_id
					const target_id = 1;
					return { ...x, target_id };
				});
				console.log("targeted list", update_targetsAdded);
				window.iris.environment.updateSignals(update_targetsAdded);
				console.log("updateSignals received", update_targetsAdded);
				/*
                window.iris.environment.updateSignals(update);
                console.log('updateSignals received', update);
                */
				for (let i = 1; i <= 4; i++) {
					const specA = window.iris.getSpectrumAnalyzer(i);
					if (specA) {
						specA.signals = specA.signals.filter((signal: any) => {
							return signal.team_id !== update.signals[0].team_id;
						});
						window.iris.environment.signals.forEach((signal: any) => {
							specA.signals.push({
								team_id: signal.team_id,
								freq: signal.frequency * 1e6,
								amp: signal.power,
								bw: signal.bandwidth * 1e6,
								target_id: signal.target_id
							});
						});
					}
				}
			});
		});

		socket.on("disconnect", () => {
			console.log("Disconnected from the server");
		});

		socket.connect();
	},
	getSpectrumAnalyzer: (i: number) => {
		if (i === 1) return window.iris.specA1;
		if (i === 2) return window.iris.specA2;
		if (i === 3) return window.iris.specA3;
		return window.iris.specA4;
	},
	announceSpecAChange: (i: number) => {
		const specA = window.iris.getSpectrumAnalyzer(i);
		if (specA) {
			const patchData = {
				id: specA.isRfMode ? specA.config?.rf?.id : specA.config?.if?.id,
				server_id: 1,
				team_id: 1,
				unit: specA.whichUnit,
				number: specA.isRfMode ? 2 : 1,
				operational: true,
				frequency: specA.centerFreq / 1e6,
				span: specA.bw / 1e6,
				marker1freq: 1240,
				marker2freq: 1260,
				trace: specA.isDrawHold,
				rf: specA.isRfMode ? true : false,
				antenna_id: specA.antenna_id
			};
			//console.log('announceSpecAChange', defaultApp.socket.id);
			defaultApp.socket.emit("updateSpectrumAnalyzer", patchData);
			const api = new SpectrumAnalyzerAPI();
			api.id(patchData.id !== undefined ? patchData.id : 1);
			return api.update(patchData);
		}
	},
	specA1: undefined,
	specA2: undefined,
	specA3: undefined,
	specA4: undefined,
	team: undefined
};

const AppContext = createContext({} as IAppContext);

const AppProvider: FunctionComponent<AppProviderProps> = ({ children }) => {
	const [app, setAppState] = useState(defaultApp);
	const setApp = () => {
		setAppState({ ...window.iris });
	};

	const value = useMemo(() => ({
		app, setApp
	}), [app]);

	return (
		<AppContext.Provider
			value={value}
		>
			{children}
		</AppContext.Provider>
	);
};

AppProvider.propTypes = {
	children: PropTypes.any
};

const useAppContext = (): IAppContext => useContext(AppContext);

window.iris = defaultApp;

export { AppProvider, AppContext, useAppContext };
