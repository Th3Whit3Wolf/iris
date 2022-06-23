import { describe, expect, test, beforeEach } from 'vitest'

import ServerAPI from "./ServerAPI";

describe.concurrent("ServerAPI", () => {
	let api: ServerAPI;
    const baseURL = "http://localhost:8080/api/v1/server";

	beforeEach(() => {
		api = new ServerAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

    test(".id(1)", () => {
        api.id(1);
        expect(api.toURL()).toBe(`${baseURL}?id=1`);
    });

	test.each(["Morris", "Steven", "Mike"])(".name(%s)", (name) => {
        api.name(name);
		expect(api.toURL()).toBe(`${baseURL}?name=${name}`);
	});

	test.each(["2019-02-01T00:01:01.001Z", "2017-02-01T00:01:01.001Z", "2016-04-12T15:13:11.733Z"])(".start_time(new Date(%s))", (dateString) => {
		const date = new Date(dateString);
        api.start_time(date);
		expect(api.toURL()).toBe(`${baseURL}?start_time=${JSON.stringify(date)}`);
	});

    test(".start_time() should fail when given an invalid date", () => {
		const date = new Date("24/12/2021");
        expect(() => api.start_time(date)).toThrowError("[ServerAPI::start_time] Error(Invalid Type):\nExpected: Date.\nReceived: Invalid Date\n");
	});
});