import { describe, expect, test, beforeEach } from 'vitest'

import PlayerAPI from './PlayerAPI';

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

    test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(".name(%s)", (name) => {
        api.name(name);
		expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
	});

    test.each(five)(".server_id(%i)", (number) => {
        api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

    test.each(five)(".team_id(%i)", (number) => {
        api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});
});