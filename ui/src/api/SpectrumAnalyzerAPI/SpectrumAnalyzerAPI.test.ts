import { SpectrumAnalyzerAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("SpectrumAnalyzerAPI", () => {
	let api: SpectrumAnalyzerAPI;
	const baseURL = "http://localhost:8080/api/v1/spec_a";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new SpectrumAnalyzerAPI();
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

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.antenna_id("five");
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

	test.each(numbers)(".marker1freq(%i)", number => {
		api.marker1freq(number);
		expect(api.toURL()).toBe(`${baseURL}?marker1freq=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.marker1freq("five");
		expect(Error);
	});

	test.each(numbers)(".marker2freq(%i)", number => {
		api.marker2freq(number);
		expect(api.toURL()).toBe(`${baseURL}?marker2freq=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.marker2freq("five");
		expect(Error);
	});

	test.each(numbers)(".number(%i)", number => {
		api.number(number);
		expect(api.toURL()).toBe(`${baseURL}?number=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.number("five");
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

	test.each(bools)(".rf(%s)", b => {
		api.rf(b);
		expect(api.toURL()).toBe(`${baseURL}?rf=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.rf("true");
		expect(Error);
	});

	test.each(five)(".span(%i)", number => {
		api.span(number);
		expect(api.toURL()).toBe(`${baseURL}?span=${number}`);
	});

	test("it throws an error because it is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.span("five");
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

	test.each(bools)(".trace(%s)", b => {
		api.trace(b);
		expect(api.toURL()).toBe(`${baseURL}?trace=${b}`);
	});

	test("it throws an error because it is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.trace("true");
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
