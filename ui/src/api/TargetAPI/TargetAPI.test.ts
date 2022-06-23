import { TargetAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("TargetAPI", () => {
	let api: TargetAPI;
	const baseURL = "http://localhost:8080/api/v1/target";
	const targetOffset = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new TargetAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each([
		"ARKE 3G",
		"AURORA 2B",
		"AUXO STAR",
		"ENYO",
		"HASHCOMM 7",
		"HUF UHF FO",
		"MERCURY PAWN",
		"NYXSAT",
		"RASCAL",
		"WILL 1-AM"
	])(".name(%s)", name => {
		api.name(name);
		expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
	});

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.name(14);
		expect(Error);
	});

	test.each(targetOffset)(".offset(%i)", offsetNumber => {
		api.offset(offsetNumber);
		expect(api.toURL()).toBe(`${baseURL}?offset=${offsetNumber}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.offset("seven");
		expect(Error);
	});
});
