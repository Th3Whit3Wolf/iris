
import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, createContext } from "react";

import { RfEnvironment } from '../RfEnvironment';
// eslint-disable-next-line no-unused-vars
import { io, Socket } from 'socket.io-client';
import { antennas, satellites } from '../constants';
import { SpectrumAnalyzerAPI } from "#api";

type IrisApp= {
    announceSpecAChange: (i: number) => Promise<Response | undefined> | undefined;
    getSpectrumAnalyzer: (i: number) => ISpectrumAnalyzer | undefined;
    init: () => void;

    constants: any;
    environment: any;
	socket: any;
    socketInit: any;

    specA1: ISpectrumAnalyzer | undefined;
    specA2: ISpectrumAnalyzer | undefined;
    specA3: ISpectrumAnalyzer | undefined;
    specA4: ISpectrumAnalyzer | undefined;

    team: any;
    teamInfo: {
        team: string,
        server: string
    };
};
type SocketWindow = Window & {
	iris: IrisApp;
};


interface ISpectrumAnalyzer {
    config: {
        if?: {
            id: number
        },
        rf?: {
            id: number
        }
    },
    whichUnit: number,
    isRfMode: boolean,
    centerFreq: number,
    bw: number,
    isDrawHold: boolean,
    antenna_id: number,

    signals: any
}

const win = window as any as SocketWindow;

// Create a sync global context for the RF Environments
const defaultApp: IrisApp = {
    teamInfo: {
        team: '',
        server: '',
    },
    //updateTxData: useUpdateTx(),
    init: () => {
        win.iris.socketInit(win.iris.socket);
    },
    constants: {
        satellites,
        antennas,
    },
    environment: new RfEnvironment(),
    socket: io(`${process.env.API_URL}`, { transports: ['websocket'] }),

    /**
     *
     * @param {Socket} socket
     */
    socketInit: (socket: Socket) => {
        socket.on('connect', () => {
            console.log('Connected to the server');
            win.iris.teamInfo = {
                team: 'default',
                server: '',
            };
            socket.emit('updateTeam', { team: win.iris.team });

            socket.on('updateSignals', (update: any) => {
                const update_targetsAdded = update.signals.map((x: any) => {
                    //const antenna_id = x.antenna_id;
                    //const target_id = antennaContext.filter(y => y.id == antenna_id).target_id
                    const target_id = 1;
                    return ({ ...x, target_id });
                });
                console.log("targeted list", update_targetsAdded);
                win.iris.environment.updateSignals(update_targetsAdded);
                console.log('updateSignals received', update_targetsAdded);
                /*
                win.iris.environment.updateSignals(update);
                console.log('updateSignals received', update);
                */
                for (let i = 1; i <= 4; i++) {
                    const specA = win.iris.getSpectrumAnalyzer(i);
                    if (specA) {
                        specA.signals = specA.signals.filter((signal: any) => {
                            return signal.team_id !== update.signals[0].team_id;
                        });
                        win.iris.environment.signals.forEach((signal: any) => {
                            specA.signals.push({
                                team_id: signal.team_id,
                                freq: signal.frequency * 1e6,
                                amp: signal.power,
                                bw: signal.bandwidth * 1e6,
                                target_id: signal.target_id,
                            });
                        });
                    }
                }
            });
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from the server');
        });

        socket.connect();
    },
    getSpectrumAnalyzer: (i: number) => {
        if (i === 1)
            return win.iris.specA1;
        if (i === 2)
            return win.iris.specA2;
        if (i === 3)
            return win.iris.specA3;
        return win.iris.specA4;
    },
    announceSpecAChange: (i: number) => {
        const specA = win.iris.getSpectrumAnalyzer(i);
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
                antenna_id: specA.antenna_id,
            };
            //console.log('announceSpecAChange', defaultApp.socket.id);
            defaultApp.socket.emit('updateSpectrumAnalyzer', patchData);
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

type AppProviderProps = {
	children?: React.ReactNode;
};

interface IAppContext {
	app: IrisApp;
	setApp: (update: any) => void;
}

const AppContext = createContext({} as IAppContext);


const AppProvider: FunctionComponent<AppProviderProps> = ({
	children
}) => {
    const [app, setAppState] = useState(defaultApp);
    const setApp = () => {
        setAppState({ ...win.iris });
    };
 
 

  return (
    <AppContext.Provider value={{
      app,
      setApp
    }}>
     {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.any,
};

const useAppContext = (): IAppContext => useContext(AppContext);

win.iris = defaultApp;

export { AppProvider, AppContext, useAppContext };
