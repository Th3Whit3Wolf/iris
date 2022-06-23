import APIQueryBuilder from "./APIQueryBuilder";
import { describe, expect, test, beforeEach } from "vitest";

const endpoint = "posts";
const baseURL = "http://localhost:8080/api/v1/posts";
const validQueryParameters = {
	userID: { type: "number" },
	title: { type: "string" },
	createdAt: {
		type: "Date"
	},
	updatedAt: {
		type: "Date"
	}
};

describe.concurrent("API Query Builder Test", () => {
	let api: APIQueryBuilder;

	beforeEach(() => {
		api = new APIQueryBuilder(endpoint, validQueryParameters);
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test.each(["Morris", "Steven", "Mike"])(".title(%s)", name => {
		api.addQueryParameter({ name: "title", value: name });
		expect(api.toURL()).toBe(`${baseURL}?title=${name}`);
	});

	test.each([1, 2, 3, 4, 5, 6, 7, 8, 9])(".userID(%i)", idNumber => {
		api.addQueryParameter({ name: "userID", value: idNumber });
		expect(api.toURL()).toBe(`${baseURL}?userID=${idNumber}`);
	});
});
