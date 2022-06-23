import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "antenna";
const validQueryParameters = {
	band: { type: "string" },
	hpa: { type: "boolean" },
	locked: { type: "boolean" },
	loopback: { type: "boolean" },
	offset: { type: "number" },
	operational: { type: "boolean" },
	server_id: { type: "number" },
	target_id: { type: "number" },
	team_id: { type: "number" },
	unit: { type: "number" }
};

class AntennaAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	band = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "band", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	hpa = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "hpa", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	locked = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "locked", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	loopback = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "loopback", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	offset = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "offset", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	operational = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "operational", value });
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

	target_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "target_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	unit = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unit", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default AntennaAPI;
