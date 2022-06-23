import { describe, expect, test, beforeEach } from 'vitest'

import ReceiverAPI from './ReceiverAPI';

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

    test.each(five)(".antenna_id(%i)", (number) => {
        api.antenna_id(number);
		expect(api.toURL()).toBe(`${baseURL}?antenna_id=${number}`);
	});

	test.each(numbers)(".bandwidth(%i)", (number) => {
        api.bandwidth(number);
		expect(api.toURL()).toBe(`${baseURL}?bandwidth=${number}`);
	});

    test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(".fec(%s)", (name) => {
        api.fec(name);
		expect(api.toURL()).toBe(`${baseURL}?fec=${name}`);
	});

    test.each(numbers)(".frequency(%i)", (number) => {
        api.frequency(number);
		expect(api.toURL()).toBe(`${baseURL}?frequency=${number}`);
	});

    test.each(["Persephone", "Sisyphus", "Tartarus", "Zagreus"])(".name(%s)", (name) => {
        api.modulation(name);
		expect(api.toURL()).toBe(`${baseURL}?modulation=${name}`);
	});

	test.each(numbers)(".number(%i)", (number) => {
        api.number(number);
		expect(api.toURL()).toBe(`${baseURL}?number=${number}`);
	});
    
    test.each(bools)(".operational(%s)", (b) => {
        api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

    test.each(five)(".server_id(%i)", (number) => {
        api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

    test.each(five)(".team_id(%i)", (number) => {
        api.team_id(number);
		expect(api.toURL()).toBe(`${baseURL}?team_id=${number}`);
	});

    test.each(five)(".unit(%i)", (number) => {
        api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});
});