import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[ServerAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "server";
const validQueryParameters = {
	name: { type: "string" },
	start_time: {
		type: "Date"
	}
};

class ServerAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	name = (value: string) => {
		if (typeof value === "string") {
			this.addQueryParameter({ name: "name", value });
			return this;
		} else {
			return apiError("name", "string", value);
		}
	};

	start_time = (value: Date) => {
		if (value instanceof Date && !isNaN(value.valueOf())) {
			this.addQueryParameter({ name: "start_time", value });
			return this;
		} else {
			return apiError("start_time", "Date", value.toString());
		}
	};
}

export default ServerAPI;