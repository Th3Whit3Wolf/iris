import { describe, expect, test, beforeEach } from 'vitest'

import SignalAPI from './SignalAPI';

describe.concurrent("SignalAPI", () => {
	let api: SignalAPI;
    const baseURL = "http://localhost:8080/api/v1/signal";
    const bools = [true, false];
    const five = [1, 2, 3, 4, 5];
    const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];
    const names = ["Persephone", "Sisyphus", "Tartarus", "Zagreus"];
	beforeEach(() => {
		api = new SignalAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

    test(".id(1)", () => {
        api.id(1);
        expect(api.toURL()).toBe(`${baseURL}?id=1`);
    });

    test.each(five)(".bandwidth(%i)", (number) => {
        api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

    test.each(names)(".fec(%s)", (name) => {
        api.fec(name);
		expect(api.toURL()).toBe(`${baseURL}?fec=${name}`);
	});

    test.each(names)(".feed(%s)", (name) => {
        api.feed(name);
		expect(api.toURL()).toBe(`${baseURL}?feed=${name}`);
	});

    test.each(numbers)(".frequency(%i)", (number) => {
        api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

    test.each(names)(".modulation(%s)", (name) => {
        api.modulation(name);
		expect(api.toURL()).toBe(`${baseURL}?modulation=${name}`);
	});
    
    test.each(bools)(".operational(%s)", (b) => {
        api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

    test.each(numbers)(".power(%s)", (number) => {
        api.power(number);
		expect(api.toURL()).toBe(`${baseURL}?power=${number}`);
	});


    test.each(five)(".server_id(%i)", (number) => {
        api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

    test.each(five)(".target_id(%i)", (number) => {
        api.target_id(number);
		expect(api.toURL()).toBe(`${baseURL}?target_id=${number}`);
	});
});