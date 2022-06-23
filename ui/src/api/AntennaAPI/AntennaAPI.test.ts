import { AntennaAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("AntennaAPI", () => {
	let api: AntennaAPI;
	const baseURL = "http://localhost:8080/api/v1/antenna";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const targetOffset = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];
	const freqBands = [
		"TLF",
		"ELF",
		"SLF",
		"ULF",
		"VLF",
		"LF",
		"MF",
		"HF",
		"VHF",
		"UHF",
		"SHF",
		"EHF",
		"THF",
		"L",
		"S",
		"C",
		"X",
		"Ku",
		"K",
		"Ka",
		"V",
		"W",
		"mm"
	];

	beforeEach(() => {
		api = new AntennaAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(freqBands)(".band(%s)", name => {
		api.band(name);
		expect(api.toURL()).toBe(`${baseURL}?band=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.band(7);
		expect(Error);
	});

	test.each(bools)(".hpa(%s)", b => {
		api.hpa(b);
		expect(api.toURL()).toBe(`${baseURL}?hpa=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.hpa("true");
		expect(Error);
	});

	test.each(bools)(".locked(%s)", b => {
		api.locked(b);
		expect(api.toURL()).toBe(`${baseURL}?locked=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.locked("true");
		expect(Error);
	});

	test.each(bools)(".loopback(%s)", b => {
		api.loopback(b);
		expect(api.toURL()).toBe(`${baseURL}?loopback=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.loopback("true");
		expect(Error);
	});

	test.each(targetOffset)(".offset(%i)", offsetNumber => {
		api.offset(offsetNumber);
		expect(api.toURL()).toBe(`${baseURL}?offset=${offsetNumber}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.offset("five");
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

	test.each(five)(".team_id(%i)", number => {
		api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.team_id("five");
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
