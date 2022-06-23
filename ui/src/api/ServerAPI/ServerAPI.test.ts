import { ServerAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("ServerAPI", () => {
	let api: ServerAPI;
	const baseURL = "http://localhost:8080/api/v1/server";

	beforeEach(() => {
		api = new ServerAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(["Morris", "Steven", "Mike"])(".name(%s)", name => {
		api.name(name);
		expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.name(3);
		expect(Error);
	});

	test.each([
		"2019-02-01T00:01:01.001Z",
		"2017-02-01T00:01:01.001Z",
		"2016-04-12T15:13:11.733Z"
	])(".start_time(new Date(%s))", dateString => {
		const date = new Date(dateString);
		api.start_time(date);
		expect(api.toURL()).toBe(`${baseURL}?start_time=${JSON.stringify(date)}`);
	});

	test("it throws an error because it is not a type Date", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.start_time("today");
		expect(Error);
	});
});
