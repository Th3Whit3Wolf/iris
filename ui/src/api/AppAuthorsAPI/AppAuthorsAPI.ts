import APIQueryBuilder from "../APIQueryBuilder";

const apiError = (fnName: string, expected: string, received: string) => {
	throw new Error(
		`[AppAuthorsAPI::${fnName}] Error(Invalid Type):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
};

const endpoint = "app_authors";
const validQueryParameters = {
	first_name: { type: "string" },
	last_name: { type: "string" }
};

class AppAuthorsAPI extends APIQueryBuilder {
	constructor() {
		super(endpoint, validQueryParameters);
	}

	first_name = (value: string) => {
		if (typeof value === "string" && value.length > 0 && value.length < 250) {
			this.addQueryParameter({ name: "first_name", value });
			return this;
		} else {
			return apiError("first_name", "string with a length between 0 & 250", value);
		}
	};

	last_name = (value: string) => {
		if (typeof value === "string" && value.length > 0 && value.length < 250) {
			this.addQueryParameter({ name: "last_name", value });
			return this;
		} else {
			return apiError("last_name", "string with a length between 0 & 250", value);
		}
	};
}

export default AppAuthorsAPI;