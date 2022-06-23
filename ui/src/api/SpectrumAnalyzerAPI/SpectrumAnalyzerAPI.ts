import APIQueryBuilder from "../APIQueryBuilder";

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
			console.log(Error);
		}
	};

	frequency = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "frequency", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	marker1freq = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "marker1freq", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	marker2freq = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "marker2freq", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	number = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "number", value });
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

	rf = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "rf", value });
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

	span = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "span", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	team_id = (value: number) => {
		if (typeof value === "number") {
			this.addQueryParameter({ name: "team_id", value });
			return this;
		} else {
			console.log(Error);
		}
	};

	trace = (value: boolean) => {
		if (typeof value === "boolean") {
			this.addQueryParameter({ name: "trace", value });
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

export default SpectrumAnalyzerAPI;
