import { ServerSelect, TeamSelect, JoinButton } from "#components";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();

	const handleSubmit = () => {
		navigate("/student", { state: { isAuthenticated: true } });
	};

	return (
		<>
			<Box
				component="form"
				onSubmit={handleSubmit}
				bgcolor="tertiary.light4"
				sx={{
					margin: "auto",
					borderRadius: "5px",
					boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.2)",
					"& > :not(style)": { m: 1 }
				}}
				novalidate
				autocomplete="off"
			>
				<Grid container spacing={1} p={2} width={300}>
					<TeamSelect />
					<ServerSelect />
					<JoinButton />
				</Grid>
			</Box>
		</>
	);
};

export default Login;
