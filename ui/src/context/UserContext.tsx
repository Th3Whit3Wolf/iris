import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, createContext } from "react";

const defaultUserContext = { server_id: 1, team_id: 1 };
const UserContext = createContext({} as IUserContext);
const win = window as any as AppWindow;

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
	const [user, setUserState] = useState(defaultUserContext);
	win.iris.socket.on("updateUserClient", (data: any): void => {
		console.log("updateUserClient", data);
		if (data.user != win.iris.socket.id) {
			console.log("actually updating the User");
			setUserState(data.signals);
		}
	});

	const setUser = (update: any) => {
		console.log("updateUser", update);
		// patch request to update database
		// if patch request is good
		win.iris.socket.emit("updateUser", {
			user: win.iris.socket.id,
			signals: update
		});
		setUserState(update);
	};

	return (
		<UserContext.Provider
			value={{
				user,
				setUser
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

const useUserContext = (): IUserContext => useContext(UserContext);

UserProvider.propTypes = {
	children: PropTypes.node
};

export { UserProvider, UserContext, useUserContext };
