import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "receiver";
const validQueryParameters = {
	antenna_id: { type: "number" },
	bandwidth: { type: "number" },
	fec: { type: "string" },
	frequency: { type: "number" },
	modulation: { type: "string" },
	number: { type: "number" },
	operational: { type: "boolean" },
	server_id: { type: "number" },
	team_id: { type: "number" },
	unit: { type: "number" }
};

class ReceiverAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	antenna_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "antenna_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	bandwidth = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "bandwidth", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	fec = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "fec", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	frequency = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "frequency", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	modulation = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "modulation", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	number = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "number", value });
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

	unit = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unit", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default ReceiverAPI;
