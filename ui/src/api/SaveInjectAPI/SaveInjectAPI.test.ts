import { describe, expect, test, beforeEach } from 'vitest'

import SaveInjectAPI from './SaveInjectAPI';

describe.concurrent("SaveInjectAPI", () => {
	let api: SaveInjectAPI;
    const baseURL = "http://localhost:8080/api/v1/save_inject";
    const five = [1, 2, 3, 4, 5];
	beforeEach(() => {
		api = new SaveInjectAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

    test(".id(1)", () => {
        api.id(1);
        expect(api.toURL()).toBe(`${baseURL}?id=1`);
    });

    test.each(five)(".save_id(%i)", (number) => {
        api.save_id(number);
		expect(api.toURL()).toBe(`${baseURL}?save_id=${number}`);
	});

    test.each(five)(".signal_id(%i)", (number) => {
        api.signal_id(number);
		expect(api.toURL()).toBe(`${baseURL}?signal_id=${number}`);
	});
});