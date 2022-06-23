import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[ActionAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "action";
const validQueryParameters = {
    antenna_id: { type: "number" },
    bandwidth: { type: "number" },
    frequency: { type: "number" },
    modem_number: { type: "number" },
    name: { type: "string" },
    operational: { type: "boolean" },
    power: { type: "number" },
	server_id: { type: "number" },
	team_id: { type: "number" },
    time: { type: "Date" },
	unit: { type: "number" }
};

class ActionAPI extends APIQueryBuilder {
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

	name = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "name", value });
			return this;
		} else {
			return apiError("name", "string", value);
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

    time = (value: Date) => {
		if (value instanceof Date && !isNaN(value.valueOf())) {
			this.addQueryParameter({ name: "time", value });
			return this;
		} else {
			return apiError("time", "Date", value.toString());
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

export default ActionAPI;