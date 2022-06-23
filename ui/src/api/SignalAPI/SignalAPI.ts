import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[SignalAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

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
	target_id: { type: "number" },
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

    feed = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "feed", value });
			return this;
		} else {
			return apiError("feed", "string", value);
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

    target_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "target_id", value });
			return this;
		} else {
			return apiError("target_id", "number", value);
		}
	};
}

export default SignalAPI;