import { PlayerAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("PlayerAPI", () => {
	let api: PlayerAPI;
	const baseURL = "http://localhost:8080/api/v1/player";
	const five = [1, 2, 3, 4, 5];

	beforeEach(() => {
		api = new PlayerAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(
		".name(%s)",
		name => {
			api.name(name);
			expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
		}
	);

	test.each(five)(".server_id(%i)", number => {
		api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

	test.each(five)(".team_id(%i)", number => {
		api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

	test.each([1, 2, 3, 4])(".name(%s)", name => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.name(name);
		expect(Error);
	});

	test("it throws an error because server_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.server_id("five");
		expect(Error);
	});

	test("it throws an error because team_id is not a type number", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.team_id("one");
		expect(Error);
	});
});
