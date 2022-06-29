import { ServerAPI } from "#api";
import { useUserContext } from "#context";
import { useFetchServer } from "#hooks";
import Grid from "@mui/material/Grid";

const Servers = ({
	data,
	error
}: {
	data: ReturnServer | ReturnServer[] | undefined;
	error: Error | undefined;
}) => {
	if (error) return <p>There is an error.</p>;
	if (!data) return <p>Loading...</p>;

	return (
		<>
			{Array.isArray(data) &&
				data.map((x: any, index: number) => (
					<option key={index} value={x.id}>
						{x.name}
					</option>
				))}
		</>
	);
};

const ServerSelect = () => {
	const { user, setUser } = useUserContext();
	const api = new ServerAPI();
	const { data, error } = useFetchServer(api, HTTPMethod.GET);
	console.log("Login Servers:", data);

	const handleServerChange = (server_id: number) => {
		setUser({ ...user, server_id });
	};

	return (
		<Grid container item xs={12}>
			<Grid item xs={4}>
				<label htmlFor="server">Server</label>
			</Grid>
			<Grid item xs={8}>
				<select
					name="server"
					value={user.server_id}
					onChange={e => handleServerChange(parseInt(e.target.value))}
				>
					<Servers data={data} error={error} />
				</select>
			</Grid>
		</Grid>
	);
};

export default ServerSelect;
