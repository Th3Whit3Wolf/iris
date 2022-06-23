const queryBuilderThrow = (
	fnName: string,
	errorKind: string,
	expected: string,
	received: string | number | boolean
) => {
	throw new Error(
		`[API QueryBuilder::${fnName}] Error(${errorKind}):\nExpected: ${expected}.\nReceived: ${received}\n`
	);
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
			return queryBuilderThrow("id", "Invalid Parameter Type", "number", num);
		}
	};

	addBoolQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "boolean") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			return queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Type",
				"boolean",
				param.value.toString()
			);
		}
	};

	addNumQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "number") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			return queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Type",
				"number",
				param.value.toString()
			);
		}
	};

	addStrQueryParameter = (param: QueryParameter) => {
		if (typeof param.value === "string") {
			this.#queryParams.push(`${param.name}=${param.value}`);
			return this;
		} else {
			return queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Type",
				"string",
				param.value.toString()
			);
		}
	};

	addDateQueryParameter = (param: QueryParameter) => {
		if (param.value instanceof Date && !isNaN(param.value.valueOf())) {
			this.#queryParams.push(`${param.name}=${JSON.stringify(param.value)}`);
			return this;
		} else {
			return queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Type",
				"Date",
				param.value.toString()
			);
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
					return queryBuilderThrow(
						"addQueryParameter",
						"Invalid Parameter Type",
						"One of number, string, enum, or Date",
						this.validQueryParams[param.name].type
					);
			}
		} else {
			queryBuilderThrow(
				"addQueryParameter",
				"Invalid Parameter Name",
				`One of ${Object.keys(this.validQueryParams).join(",")}`,
				param.name
			);
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

	create = async (data: Record<string, unknown>) => {
		const headers = new Headers({
			"Content-Type": "application/json; charset=UTF-8"
		});
		const body = JSON.stringify(data);

		return fetch(this.toURL(), {
			method: "POST",
			mode: "cors",
			headers,
			body
		});
	};

	delete = async () => {
		if (this.#_id !== undefined) {
			const headers = new Headers({});

			return fetch(`${this.baseURL()}/${this.#_id}`, {
				method: "DELETE",
				mode: "cors",
				headers
			});
		} else {
			queryBuilderThrow(
				"delete",
				"method id never called",
				".id(num)\n.delete()",
				".delete()"
			);
		}
	};

	get = async () => {
		const headers = new Headers({});

		return fetch(this.toURL(), {
			method: "GET",
			mode: "cors",
			headers
		});
	};

	/**
	 *
	 * @param data - Object containing the data to update
	 * @returns
	 */
	update = async (data: Record<string, unknown>) => {
		if (this.#_id !== undefined) {
			const headers = new Headers({
				"Content-Type": "application/json; charset=UTF-8"
			});
			const body = JSON.stringify(data);
			return fetch(`${this.baseURL()}/${this.#_id}`, {
				method: "PUT",
				mode: "cors",
				headers,
				body
			});
		} else {
			queryBuilderThrow(
				"update",
				"method id never called",
				".id(num)\n.update(data)",
				".update(data)"
			);
		}
	};
}
export default APIQueryBuilder;
