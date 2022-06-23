import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[TargetAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "target";
const validQueryParameters = {
	name: { type: "string" },
	offset: { type: "number" }
};

class TargetAPI extends APIQueryBuilder {
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

	offset = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "offset", value });
			return this;
		} else {
			return apiError("offset", "number", value);
		}
	};
}

export default TargetAPI;