import { teams } from "#constants";
import { useUserContext } from "#context";
import Grid from "@mui/material/Grid";

const TeamSelect = () => {
	const { user, setUser } = useUserContext();

	const handleTeamChange = (value: any) => {
		console.log("handleTeamChange:", value);
		setUser({ ...user, team_id: value });
	};

	return (
		<Grid container item xs={12}>
			<Grid item xs={4}>
				<label htmlFor="team">Team</label>
			</Grid>
			<Grid item xs={8}>
				<select
					name="team"
					value={teams[user.team_id - 1].id}
					onChange={e => handleTeamChange(parseInt(e.target.value))}
				>
					{teams.map((x, index) => (
						<option key={index} value={x.id}>
							{x.name}
						</option>
					))}
				</select>
			</Grid>
		</Grid>
	);
};

export default TeamSelect;
