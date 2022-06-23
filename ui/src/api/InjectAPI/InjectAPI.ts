import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[InjectAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "inject";
const validQueryParameters = {
    equipment: { type: "string" },
    operational: { type: "boolean" },
	server_id: { type: "number" },
    time: { type: "Date" },
    unit: { type: "number" },
};

class InjectAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

    equipment = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "equipment", value });
			return this;
		} else {
			return apiError("equipment", "string", value);
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

export default InjectAPI;