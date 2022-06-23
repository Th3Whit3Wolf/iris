import { InjectAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("InjectAPI", () => {
	let api: InjectAPI;
	const baseURL = "http://localhost:8080/api/v1/inject";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const names = ["Persephone", "Sisyphus", "Tartarus", "Zagreus"];
	beforeEach(() => {
		api = new InjectAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(names)(".equipment(%s)", name => {
		api.equipment(name);
		expect(api.toURL()).toBe(`${baseURL}?equipment=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.equipment(3);
		expect(Error);
	});

	test.each(bools)(".operational(%s)", b => {
		api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.operational("true");
		expect(Error);
	});

	test.each(five)(".server_id(%i)", number => {
		api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.server_id("five");
		expect(Error);
	});

	test.each([
		"2019-02-01T00:01:01.001Z",
		"2017-02-01T00:01:01.001Z",
		"2016-04-12T15:13:11.733Z"
	])(".time(new Date(%s))", dateString => {
		const date = new Date(dateString);
		api.time(date);
		expect(api.toURL()).toBe(`${baseURL}?time=${JSON.stringify(date)}`);
	});

	test("it throws an error because it is not a type Date", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.time("today");
		expect(Error);
	});

	test.each(five)(".unit(%i)", number => {
		api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.unit("five");
		expect(Error);
	});
});
