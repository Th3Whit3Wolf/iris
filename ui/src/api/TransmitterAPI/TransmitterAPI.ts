import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[TransmitterAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

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
			return apiError("antenna_id", "number", value);
		}
	};

    bandwidth = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "bandwidth", value });
			return this;
		} else {
			return apiError("bandwidth", "number", value);
		}
	};

    frequency = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "frequency", value });
			return this;
		} else {
			return apiError("frequency", "number", value);
		}
	};

	modem_number = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "modem_number", value });
			return this;
		} else {
			return apiError("modem_number", "number", value);
		}
	};

    operational = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "operational", value });
			return this;
		} else {
			return apiError("operational", "boolean", value);
		}
	};

    power = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "power", value });
			return this;
		} else {
			return apiError("power", "number", value);
		}
	};

    server_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "server_id", value });
			return this;
		} else {
			return apiError("server_id", "number", value);
		}
	};

    team_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "team_id", value });
			return this;
		} else {
			return apiError("team_id", "number", value);
		}
	};

    transmitting = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "transmitting", value });
			return this;
		} else {
			return apiError("transmitting", "boolean", value);
		}
	};

    unit = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unit", value });
			return this;
		} else {
			return apiError("unit", "number", value);
		}
	};
}

export default TransmitterAPI;