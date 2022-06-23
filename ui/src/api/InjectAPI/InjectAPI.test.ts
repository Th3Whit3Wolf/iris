import { describe, expect, test, beforeEach } from 'vitest'

import InjectAPI from './InjectAPI';

describe.concurrent("InjectAPI", () => {
	let api: InjectAPI;
    const baseURL = "http://localhost:8080/api/v1/inject";
    const bools = [true, false];
    const five = [1, 2, 3, 4, 5];
    const names = ["Persephone", "Sisyphus", "Tartarus", "Zagreus"];
	beforeEach(() => {
		api = new InjectAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

    test(".id(1)", () => {
        api.id(1);
        expect(api.toURL()).toBe(`${baseURL}?id=1`);
    });

    test.each(names)(".equipment(%s)", (name) => {
        api.equipment(name);
		expect(api.toURL()).toBe(`${baseURL}?equipment=${name}`);
	});

    test.each(bools)(".operational(%s)", (b) => {
        api.operational(b);
		expect(api.toURL()).toBe(`${baseURL}?operational=${b}`);
	});

    test.each(five)(".server_id(%i)", (number) => {
        api.server_id(number);
		expect(api.toURL()).toBe(`${baseURL}?server_id=${number}`);
	});

    test.each(["2019-02-01T00:01:01.001Z", "2017-02-01T00:01:01.001Z", "2016-04-12T15:13:11.733Z"])(".time(new Date(%s))", (dateString) => {
		const date = new Date(dateString);
        api.time(date);
		expect(api.toURL()).toBe(`${baseURL}?time=${JSON.stringify(date)}`);
	});

    test(".time() should fail when given an invalid date", () => {
		const date = new Date("24/12/2021");
        expect(() => api.time(date)).toThrowError("[InjectAPI::time] Error(Invalid Type):\nExpected: Date.\nReceived: Invalid Date\n");
	});

    test.each(five)(".unit(%i)", (number) => {
        api.unit(number);
		expect(api.toURL()).toBe(`${baseURL}?unit=${number}`);
	});
});