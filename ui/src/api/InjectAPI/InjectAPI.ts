import APIQueryBuilder from "../APIQueryBuilder";

const endpoint = "inject";
const validQueryParameters = {
	equipment: { type: "string" },
	operational: { type: "boolean" },
	server_id: { type: "number" },
	time: { type: "Date" },
	unit: { type: "number" }
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
			console.log(Error);
		}
	};

	operational = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "operational", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	server_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "server_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	time = (value: Date) => {
		if (value instanceof Date && !isNaN(value.valueOf())) {
			this.addQueryParameter({ name: "time", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	unit = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "unit", value });
			return this;
		} else {
			console.log(Error);
		}
	};
}

export default InjectAPI;
