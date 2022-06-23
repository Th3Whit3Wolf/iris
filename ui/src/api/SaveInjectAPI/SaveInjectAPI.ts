import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "save_inject";
const validQueryParameters = {
	save_id: { type: "number" },
	signal_id: { type: "number" }
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
			console.log(Error);
		}
	};

	signal_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "signal_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default SaveInjectAPI;
