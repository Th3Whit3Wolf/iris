import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "team";
const validQueryParameters = {
	name: { type: "string" }
};

class TeamAPI extends APIQueryBuilder {
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
}

export default TeamAPI;
