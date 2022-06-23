import App from "./App";
import {
	AntennaProvider,
	AppProvider,
	ColorModeProvider,
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
		<ColorModeProvider>
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
		</ColorModeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
