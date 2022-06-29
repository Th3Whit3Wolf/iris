// const queryBuilderThrow = (
// 	fnName: string,
// 	errorKind: string,
// 	expected: string,
// 	received: string | number | boolean
// ) => {
// 	throw new Error(
// 		`[API QueryBuilder::${fnName}] Error(${errorKind}):\nExpected: ${expected}.\nReceived: ${received}\n`
// 	);
// };

const mkFetchReq = (url: string, options: any): Promise<Response> => {
	return fetch(url, options).then((response: Response) => {
		if (response.ok) {
			return response;
		} else {
			throw new Error("Cannot convert response to json");
		}
	});
};

class APIQueryBuilder implements IAPIQueryBuilder {
	#queryParams: Array<string> = [];
	#_id: number | undefined;
	endpoint: string;
	validQueryParams: ValidQueryParameters;

	constructor(endpoint: string, validQueryParams: ValidQueryParameters) {
		this.endpoint = endpoint;
		this.validQueryParams = validQueryParams;
	}

	id = (num: number) => {
		if (typeof num === "number") {
			this.#_id = num;
			return this;
		} else {
			console.log("invalid type");
			// return queryBuilderThrow("id", "Invalid Parameter Type", "number", num);
		}
	};

	addBoolQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "boolean") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			// return queryBuilderThrow(
			// 	"addQueryParameter",
			// 	"Invalid Parameter Type",
			// 	"boolean",
			// 	param.value.toString()
			// );
			console.log(Error);
		}
	};

	addNumQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "number") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			// return queryBuilderThrow(
			// 	"addQueryParameter",
			// 	"Invalid Parameter Type",
			// 	"number",
			// 	param.value.toString()
			// );
			console.log(Error);
		}
	};

	addStrQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "string") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			// return queryBuilderThrow(
			// 	"addQueryParameter",
			// 	"Invalid Parameter Type",
			// 	"string",
			// 	param.value.toString()
			// );
			console.log(Error);
		}
	};

	addDateQueryParameter = (param: QueryParameter) => {
		if (param.value instanceof Date && !isNaN(param.value.valueOf())) {
			this.#queryParams.push(`${param.name}=${JSON.stringify(param.value)}`);
			return this;
		} else {
			// return queryBuilderThrow(
			// 	"addQueryParameter",
			// 	"Invalid Parameter Type",
			// 	"Date",
			// 	param.value.toString()
			// );
			console.log(Error);
		}
	};

	addQueryParameter = (param: QueryParameter) => {
		if (this.validQueryParams[param.name] !== undefined) {
			switch (this.validQueryParams[param.name].type) {
				case "boolean":
					return this.addBoolQueryParameter(param);
				case "number":
					return this.addNumQueryParameter(param);
				case "string":
					return this.addStrQueryParameter(param);
				case "Date":
					return this.addDateQueryParameter(param);
				default:
					// return queryBuilderThrow(
					// 	"addQueryParameter",
					// 	"Invalid Parameter Type",
					// 	"One of number, string, enum, or Date",
					// 	this.validQueryParams[param.name].type
					// );
					console.log(Error);
			}
		} else {
			// queryBuilderThrow(
			// 	"addQueryParameter",
			// 	"Invalid Parameter Name",
			// 	`One of ${Object.keys(this.validQueryParams).join(",")}`,
			// 	param.name
			// );
			console.log(Error);
		}
	};

	hasID = () => {
		return this.#_id !== undefined;
	};

	toURL = () => {
		const queryParams = [...this.#queryParams];
		if (this.hasID()) {
			queryParams.unshift(`id=${this.#_id}`);
		}

		return `${process.env.API_URL}/api/v1/${this.endpoint}${
			queryParams.length > 0 ? `?${queryParams.join("&")}` : ""
		}`;
	};

	baseURL = () => {
		return `${process.env.API_URL}/api/v1/${this.endpoint}`;
	};

	create = (data: any): Promise<Response> => {
		try {
			const body = JSON.stringify(data);
			const headers = new Headers({
				"Content-Type": "application/json; charset=UTF-8"
			});
			return mkFetchReq(this.toURL(), {
				method: "POST",
				mode: "cors",
				headers,
				body
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	delete = (): Promise<Response> => {
		try {
			if (this.#_id !== undefined) {
				throw new Error("Missing id...");
			}
			const headers = new Headers({});

			return mkFetchReq(this.toURL(), {
				method: "DELETE",
				mode: "cors",
				headers
			});
		} catch (err) {
			console.error(err);
			throw err;
		}

		// if (this.#_id !== undefined) {

		// } else {
		// 	// queryBuilderThrow(
		// 	// 	"delete",
		// 	// 	"method id never called",
		// 	// 	".id(num)\n.delete()",
		// 	// 	".delete()"
		// 	// );
		// 	console.log(Error);
		// }
	};

	get = (): Promise<Response> => {
		try {
			const headers = new Headers({});
			return mkFetchReq(this.toURL(), {
				method: "GET",
				mode: "cors",
				headers
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
	};

	/**
	 *
	 * @param data - Object containing the data to update
	 * @returns
	 */
	update = (data: any): Promise<Response> => {
		try {
			if (this.#_id !== undefined) {
				throw new Error("Missing id...");
			}
			const body = JSON.stringify(data);
			const headers = new Headers({
				"Content-Type": "application/json; charset=UTF-8"
			});
			return mkFetchReq(this.toURL(), {
				method: "PUT",
				mode: "cors",
				headers,
				body
			});
		} catch (err) {
			console.error(err);
			throw err;
		}
		// if (this.#_id !== undefined) {
		// 	const body = JSON.stringify(data);
		// 	const headers = new Headers({
		// 		"Content-Type": "application/json; charset=UTF-8"
		// 	});
		// 	return mkFetchReq(this.toURL(), {
		// 		method: "PUT",
		// 		mode: "cors",
		// 		headers,
		// 		body
		// 	});
		// } else {
		// 	// queryBuilderThrow(
		// 	// 	"update",
		// 	// 	"method id never called",
		// 	// 	".id(num)\n.update(data)",
		// 	// 	".update(data)"
		// 	// );
		// 	console.log(Error);
		// }
	};
}
export default APIQueryBuilder;
