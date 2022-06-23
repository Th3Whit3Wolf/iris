import ActionAPI from "./ActionAPI";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("ActionAPI", () => {
	let api: ActionAPI;
	const baseURL = "http://localhost:8080/api/v1/action";
	const bools = [true, false];
	const five = [1, 2, 3, 4, 5];
	const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new ActionAPI();
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

	test.each(numbers)(".bandwidth(%i)", number => {
		api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

	test.each(numbers)(".frequency(%i)", number => {
		api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

	test.each(numbers)(".modem_number(%i)", number => {
		api.modem_number(number);
		expect(api.toURL()).toBe(`${baseURL}?modem_number=${number}`);
	});

	test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(
		".name(%s)",
		name => {
			api.name(name);
			expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
		}
	);

	test.each(bools)(".operational(%s)", b => {
		api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

	test.each(numbers)(".power(%i)", number => {
		api.power(number);
		expect(api.toURL()).toBe(`${baseURL}?power=${number}`);
	});

	test.each(five)(".server_id(%i)", number => {
		api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

	test.each(five)(".team_id(%i)", number => {
		api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
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

	test(".time() should fail when given an invalid date", () => {
		const date = new Date("24/12/2021");
		expect(() => api.time(date)).toThrowError(
			"[ActionAPI::time] Error(Invalid Type):\nExpected: Date.\nReceived: Invalid Date\n"
		);
	});

	test.each(five)(".unit(%i)", number => {
		api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});
});
