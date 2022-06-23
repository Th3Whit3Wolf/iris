import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "server";
const validQueryParameters = {
	name: { type: "string" },
	start_time: {
		type: "Date"
	}
};

class ServerAPI extends APIQueryBuilder {
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

	start_time = (value: Date) => {
		if (value instanceof Date && !isNaN(value.valueOf())) {
			this.addQueryParameter({ name: "start_time", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default ServerAPI;
