import App from "./App";
import {
	AntennaProvider,
  AppProvider,
	RxProvider,
	SignalProvider,
	TxProvider,
	UserProvider
} from "./context";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
	<React.StrictMode>
    <UserProvider>
    <AppProvider>
      <SignalProvider>
        <AntennaProvider>
          <RxProvider>
            <TxProvider>
              <App />
            </TxProvider>
          </RxProvider>
        </AntennaProvider>
      </SignalProvider>
    </AppProvider>
    </UserProvider>
  </React.StrictMode>,
	document.getElementById("root")
);
