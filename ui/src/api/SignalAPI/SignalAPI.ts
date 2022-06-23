import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "signal";
const validQueryParameters = {
	bandwidth: { type: "number" },
	fec: { type: "string" },
	feed: { type: "string" },
	frequency: { type: "number" },
	modulation: { type: "string" },
	operational: { type: "boolean" },
	power: { type: "number" },
	server_id: { type: "number" },
	target_id: { type: "number" }
};

class SignalAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

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

	feed = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "feed", value });
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

	operational = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "operational", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	power = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "power", value });
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

	target_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "target_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default SignalAPI;
