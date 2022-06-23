import { ReceiverAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("ReceiverAPI", () => {
	let api: ReceiverAPI;
	const baseURL = "http://localhost:8080/api/v1/receiver";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new ReceiverAPI();
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

	test("it throws an error because bandwidth is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.bandwidth("five");
		expect(Error);
	});

	test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(
		".fec(%s)",
		name => {
			api.fec(name);
			expect(api.toURL()).toBe(`${baseURL}?fec=${name}`);
		}
	);

	test("it throws an error because fec is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.fec(3);
		expect(Error);
	});

	test.each(numbers)(".frequency(%i)", number => {
		api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

	test("it throws an error because frequency is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.frequency("five");
		expect(Error);
	});

	test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(
		".name(%s)",
		name => {
			api.modulation(name);
			expect(api.toURL()).toBe(`${baseURL}?modulation=${name}`);
		}
	);

	test("it throws an error because modulation is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.modulation(3);
		expect(Error);
	});

	test.each(numbers)(".number(%i)", number => {
		api.number(number);
		expect(api.toURL()).toBe(`${baseURL}?number=${number}`);
	});

	test("it throws an error because number is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.number("five");
		expect(Error);
	});

	test.each(bools)(".operational(%s)", b => {
		api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

	test("it throws an error because operational is not a type boolean", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.operational("true");
		expect(Error);
	});

	test.each(five)(".server_id(%i)", number => {
		api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

	test("it throws an error because server_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.server_id("five");
		expect(Error);
	});

	test.each(five)(".team_id(%i)", number => {
		api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

	test("it throws an error because team_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.team_id("one");
		expect(Error);
	});

	test.each(five)(".unit(%i)", number => {
		api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});

	test("it throws an error because unit is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.unit("five");
		expect(Error);
	});
});
