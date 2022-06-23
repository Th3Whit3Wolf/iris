import { describe, expect, test, beforeEach } from 'vitest'

import TransmitterAPI from './TransmitterAPI';

describe.concurrent("TransmitterAPI", () => {
	let api: TransmitterAPI;
    const baseURL = "http://localhost:8080/api/v1/transmitter";
    const bools = [true, false];
    const five = [1, 2, 3, 4, 5];
    const numbers = [120, 150, 210, 250, 300, 345, 365, 400, 420, 450];

	beforeEach(() => {
		api = new TransmitterAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

    test(".id(1)", () => {
        api.id(1);
        expect(api.toURL()).toBe(`${baseURL}?id=1`);
    });

    test.each(five)(".antenna_id(%i)", (number) => {
        api.antenna_id(number);
		expect(api.toURL()).toBe(`${baseURL}?antenna_id=${number}`);
	});

	test.each(numbers)(".bandwidth(%i)", (number) => {
        api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

    test.each(numbers)(".frequency(%i)", (number) => {
        api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

	test.each(numbers)(".modem_number(%i)", (number) => {
        api.modem_number(number);
		expect(api.toURL()).toBe(`${baseURL}?modem_number=${number}`);
	});
    
    test.each(bools)(".operational(%s)", (b) => {
        api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

    test.each(numbers)(".power(%i)", (number) => {
        api.power(number);
		expect(api.toURL()).toBe(`${baseURL}?power=${number}`);
	});

    test.each(five)(".server_id(%i)", (number) => {
        api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

    test.each(five)(".team_id(%i)", (number) => {
        api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

    test.each(bools)(".transmitting(%s)", (b) => {
        api.transmitting(b);
		expect(api.toURL()).toBe(`${baseURL}?transmitting=${b}`);
	});

    test.each(five)(".unit(%i)", (number) => {
        api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});
});