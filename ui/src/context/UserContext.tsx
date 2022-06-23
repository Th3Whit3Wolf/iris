import React, { FunctionComponent, useContext, useState, createContext } from "react";
import PropTypes from "prop-types";
const defaultUserContext = { server_id: 1, team_id: 1 };

type IrisWindowT = {
	socket: any;
};

type SocketWindow = Window & {
	iris: IrisWindowT;
};

interface IUserContextItem {
	server_id: number ;
	team_id: number;
}

interface IUserContext {
	user: IUserContextItem;
	setUser: (update: any) => void;
}

type UserProviderProps = {
	children?: React.ReactNode;
};

const UserContext = createContext({} as IUserContext);

const UserProvider: FunctionComponent<UserProviderProps> = ({children}) => {
	const win = window as any as SocketWindow;
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
		<UserContext.Provider value={{
			user,
			setUser
		}}>
				{children}
		</UserContext.Provider>
		
	);
};

const useUserContext = (): IUserContext => useContext(UserContext);

UserProvider.propTypes = {
	children: PropTypes.node
};

export {
    UserProvider,
    UserContext,
    useUserContext
}