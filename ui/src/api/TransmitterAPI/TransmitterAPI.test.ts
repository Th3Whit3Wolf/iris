import { TransmitterAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("TransmitterAPI", () => {
	let api: TransmitterAPI;
	const baseURL = "http://localhost:8080/api/v1/transmitter";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new TransmitterAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(five)(".antenna_id(%i)", number => {
		api.antenna_id(number);
		expect(api.toURL()).toBe(`${baseURL}?antenna_id=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.antenna_id("five");
		expect(Error);
	});

	test.each(numbers)(".bandwidth(%i)", number => {
		api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.bandwidth("five");
		expect(Error);
	});

	test.each(numbers)(".frequency(%i)", number => {
		api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.frequency("five");
		expect(Error);
	});

	test.each(numbers)(".modem_number(%i)", number => {
		api.modem_number(number);
		expect(api.toURL()).toBe(`${baseURL}?modem_number=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.modem_number("five");
		expect(Error);
	});

	test.each(bools)(".operational(%s)", b => {
		api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

	test("it throws an error because antenna_id is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.operational("five");
		expect(Error);
	});

	test.each(numbers)(".power(%i)", number => {
		api.power(number);
		expect(api.toURL()).toBe(`${baseURL}?power=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.power("five");
		expect(Error);
	});

	test.each(five)(".server_id(%i)", number => {
		api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.server_id("five");
		expect(Error);
	});

	test.each(five)(".team_id(%i)", number => {
		api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.team_id("five");
		expect(Error);
	});

	test.each(bools)(".transmitting(%s)", b => {
		api.transmitting(b);
		expect(api.toURL()).toBe(`${baseURL}?transmitting=${b}`);
	});

	test("it throws an error because antenna_id is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.transmitting("five");
		expect(Error);
	});

	test.each(five)(".unit(%i)", number => {
		api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});

	test("it throws an error because antenna_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.unit("five");
		expect(Error);
	});
});
