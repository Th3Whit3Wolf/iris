import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[SpectrumAnalyzerAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "spec_a";
const validQueryParameters = {
    antenna_id: { type: "number" },
    frequency: { type: "number" },
    marker1freq: { type: "number" },
    marker2freq: { type: "number" },
    number: { type: "number" },
    operational: { type: "boolean" },
    rf: { type: "boolean" },
	server_id: { type: "number" },
    span: { type: "number" },
	team_id: { type: "number" },
    trace: { type: "boolean" },
    unit: { type: "number" }
};

class SpectrumAnalyzerAPI extends APIQueryBuilder {
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

    frequency = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "frequency", value });
			return this;
		} else {
			return apiError("frequency", "number", value);
		}
	};

    marker1freq = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "marker1freq", value });
			return this;
		} else {
			return apiError("marker1freq", "number", value);
		}
	};

    marker2freq = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "marker2freq", value });
			return this;
		} else {
			return apiError("marker2freq", "number", value);
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

    rf = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "rf", value });
			return this;
		} else {
			return apiError("rf", "boolean", value);
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

    span = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "span", value });
			return this;
		} else {
			return apiError("span", "number", value);
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

    trace = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "trace", value });
			return this;
		} else {
			return apiError("trace", "boolean", value);
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

export default SpectrumAnalyzerAPI;