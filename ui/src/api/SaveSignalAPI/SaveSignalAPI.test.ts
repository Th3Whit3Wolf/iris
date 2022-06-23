import { SaveSignalAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("SaveSignalAPI", () => {
	let api: SaveSignalAPI;
	const baseURL = "http://localhost:8080/api/v1/save_signal";
	const five = [1, 2, 3, 4, 5];
	beforeEach(() => {
		api = new SaveSignalAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(five)(".save_id(%i)", number => {
		api.save_id(number);
		expect(api.toURL()).toBe(`${baseURL}?save_id=${number}`);
	});

	test.each(five)(".signal_id(%i)", number => {
		api.signal_id(number);
		expect(api.toURL()).toBe(`${baseURL}?signal_id=${number}`);
	});

	test("it throws an error because save_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.save_id("five");
		expect(Error);
	});

	test("it throws an error because signal_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.signal_id("five");
		expect(Error);
	});
});
