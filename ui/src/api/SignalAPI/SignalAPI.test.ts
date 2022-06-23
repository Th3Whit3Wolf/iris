import { SignalAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("SignalAPI", () => {
	let api: SignalAPI;
	const baseURL = "http://localhost:8080/api/v1/signal";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];
	const names = ["Persephone", "Sisyphus", "Tartarus", "Zagreus"];
	beforeEach(() => {
		api = new SignalAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(five)(".bandwidth(%i)", number => {
		api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.bandwidth("five");
		expect(Error);
	});

	test.each(names)(".fec(%s)", name => {
		api.fec(name);
		expect(api.toURL()).toBe(`${baseURL}?fec=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.fec(6);
		expect(Error);
	});

	test.each(names)(".feed(%s)", name => {
		api.feed(name);
		expect(api.toURL()).toBe(`${baseURL}?feed=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.feed(6);
		expect(Error);
	});

	test.each(numbers)(".frequency(%i)", number => {
		api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.frequency("five");
		expect(Error);
	});

	test.each(names)(".modulation(%s)", name => {
		api.modulation(name);
		expect(api.toURL()).toBe(`${baseURL}?modulation=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.modulation(5);
		expect(Error);
	});

	test.each(bools)(".operational(%s)", b => {
		api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.operational("false");
		expect(Error);
	});

	test.each(numbers)(".power(%s)", number => {
		api.power(number);
		expect(api.toURL()).toBe(`${baseURL}?power=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.power("five");
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

	test.each(five)(".target_id(%i)", number => {
		api.target_id(number);
		expect(api.toURL()).toBe(`${baseURL}?target_id=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.target_id("five");
		expect(Error);
	});
});
