type QueryParameter = {
	name: string;
	value: string | number | boolean | Date;
};

type ValidQueryParameter = {
	type: string;
	variants?: string[];
};

type ValidQueryParameters = {
	[key: string]: ValidQueryParameter;
};

interface IAPIQueryBuilder {
	endpoint: string;
	validQueryParams: ValidQueryParameters;
	id(num: number): APIQueryBuilder;
	addQueryParameter(param: QueryParameter): APIQueryBuilder | void;
}
