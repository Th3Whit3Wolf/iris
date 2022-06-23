import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[AntennaAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

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
			return apiError("band", "string", value);
		}
	};

    hpa = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "hpa", value });
			return this;
		} else {
			return apiError("hpa", "boolean", value);
		}
	};

    locked = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "locked", value });
			return this;
		} else {
			return apiError("locked", "boolean", value);
		}
	};

    loopback = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "loopback", value });
			return this;
		} else {
			return apiError("loopback", "boolean", value);
		}
	};

	offset = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "offset", value });
			return this;
		} else {
			return apiError("offset", "number", value);
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

    target_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "target_id", value });
			return this;
		} else {
			return apiError("target_id", "number", value);
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

export default AntennaAPI;