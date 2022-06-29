import { ARTGrid, SpectrumAnalyzerGrid, TeamInfo } from "#components";
import { useAppContext } from "#context";
import { useEventListener } from "#hooks";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import {
	useLocation,
	useNavigate
} from "react-router-dom";

interface IState {
	isAuthenticated: boolean;
}

const Student = () => {
	const location = useLocation();
	const state = location.state as IState;
	const navigate = useNavigate();
	const { setApp: updateAppState } = useAppContext();

	const onContextMenuChange = (event: Event) => {
		event.preventDefault();
	};

	useEventListener("contextmenu", onContextMenuChange);

	useEffect(() => {
		window.iris.init();
		updateAppState();
	}, []);

	// Basic check that user is logged in
	useEffect(() => {
		if (!state || state?.isAuthenticated !== true) navigate("/login");
	}, [state, navigate]);

	return (
		<>
			<TeamInfo />
			<Grid
				container
				spacing={1}
				paddingTop={2}
				paddingBottom={2}
				paddingLeft={6}
				paddingRight={6}
			>
				<SpectrumAnalyzerGrid />
				<ARTGrid />
			</Grid>
		</>
	);
};

export default Student;
