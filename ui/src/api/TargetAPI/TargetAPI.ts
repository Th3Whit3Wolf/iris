import APIQueryBuilder from "../APIQueryBuilder";

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
			console.log(Error);
		}
	};

	offset = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "offset", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default TargetAPI;
