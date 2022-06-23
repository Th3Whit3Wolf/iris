import PropTypes from "prop-types";
import { FunctionComponent, useContext, useState, useMemo, createContext } from "react";

const defaultUserContext = { server_id: 1, team_id: 1 };
const UserContext = createContext({} as IUserContext);

const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
	const [user, setUserState] = useState(defaultUserContext);
	window.iris.socket.on("updateUserClient", (data: any): void => {
		console.log("updateUserClient", data);
		if (data.user != window.iris.socket.id) {
			console.log("actually updating the User");
			setUserState(data.signals);
		}
	});

	const setUser = (update: any) => {
		console.log("updateUser", update);
		// patch request to update database
		// if patch request is good
		window.iris.socket.emit("updateUser", {
			user: window.iris.socket.id,
			signals: update
		});
		setUserState(update);
	};

	const value = useMemo(() => ({
		user, setUser
	}), [user]);

	return (
		<UserContext.Provider
			value={value}
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
