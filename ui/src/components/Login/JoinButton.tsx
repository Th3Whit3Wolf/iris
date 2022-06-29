import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const JoinButton = () => (
	<Grid item xs={12} textAlign={"center"} mt={3}>
		<Button type="submit" size="large" variant="contained" color="tertiary">
			<Typography color="white" sx={{ fontFamily: "Nasa" }}>
				Join
			</Typography>
		</Button>
	</Grid>
);

export default JoinButton;
