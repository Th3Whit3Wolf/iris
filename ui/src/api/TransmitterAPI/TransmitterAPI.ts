import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "transmitter";
const validQueryParameters = {
	antenna_id: { type: "number" },
	bandwidth: { type: "number" },
	frequency: { type: "number" },
	modem_number: { type: "number" },
	operational: { type: "boolean" },
	power: { type: "number" },
	server_id: { type: "number" },
	team_id: { type: "number" },
	transmitting: { type: "boolean" },
	unit: { type: "number" }
};

class TransmitterAPI extends APIQueryBuilder {
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

	frequency = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "frequency", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	modem_number = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "modem_number", value });
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

	team_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "team_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	transmitting = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "transmitting", value });
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

export default TransmitterAPI;
