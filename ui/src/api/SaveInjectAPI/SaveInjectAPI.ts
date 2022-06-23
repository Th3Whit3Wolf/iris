import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[SaveInjectAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "save_inject";
const validQueryParameters = {
	save_id: { type: "number" },
	signal_id: { type: "number" },
};

class SaveInjectAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

    save_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "save_id", value });
			return this;
		} else {
			return apiError("save_id", "number", value);
		}
	};
    
    signal_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "signal_id", value });
			return this;
		} else {
			return apiError("signal_id", "number", value);
		}
	};
}

export default SaveInjectAPI;