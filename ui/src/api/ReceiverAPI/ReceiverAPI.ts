import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[ReceiverAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

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

    fec = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "fec", value });
			return this;
		} else {
			return apiError("fec", "string", value);
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

    modulation = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "modulation", value });
			return this;
		} else {
			return apiError("modulation", "string", value);
		}
	};

	number = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "number", value });
			return this;
		} else {
			return apiError("number", "number", value);
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

    unit = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unit", value });
			return this;
		} else {
			return apiError("unit", "number", value);
		}
	};
}

export default ReceiverAPI;