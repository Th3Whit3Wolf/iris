import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "player";
const validQueryParameters = {
	name: { type: "string" },
	server_id: { type: "number" },
	team_id: { type: "number" }
};

class PlayerAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	name = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "name", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	server_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "server_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	team_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "team_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default PlayerAPI;
