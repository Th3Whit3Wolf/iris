import { AppAuthorsAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("ServerAPI", () => {
	let api: AppAuthorsAPI;
	const baseURL = "http://localhost:8080/api/v1/app_authors";
	const emptyName = "";
	const longName =
		"This is a very long string that is longer than 250 characters. Why would you enter a name so long? I see no need for a name that is so long, perhaps your parents wanted to win some kind of record? You will need to truncate your name so that is smaller than 250 characters.";

	beforeEach(() => {
		api = new AppAuthorsAPI();
	});

	test("returns the base URL when no parameters are supplied", () => {
		expect(api.toURL()).toBe(baseURL);
	});

	test(".id(1)", () => {
		api.id(1);
		expect(api.toURL()).toBe(`${baseURL}?id=1`);
	});

	test.each(["Obi-Wan", "Luke", "Darth"])(".first_name(%s)", name => {
		api.first_name(name);
		expect(api.toURL()).toBe(`${baseURL}?first_name=${name}`);
	});

	test(".first_name() should fail when given an empty string", () => {
		expect(() => api.first_name(emptyName)).toThrowError(
			"[AppAuthorsAPI::first_name] Error(Invalid Type):\nExpected: string with a length between 0 & 250.\nReceived: \n"
		);
	});

	test(".first_name() should fail when given a string over 250 characters", () => {
		expect(() => api.first_name(longName)).toThrowError(
			`[AppAuthorsAPI::first_name] Error(Invalid Type):\nExpected: string with a length between 0 & 250.\nReceived: ${longName}\n`
		);
	});

	test.each(["Kenobi", "Skywalker", "Vader"])(".last_name(%s)", name => {
		api.last_name(name);
		expect(api.toURL()).toBe(`${baseURL}?last_name=${name}`);
	});

	test(".last_name() should fail when given an empty string", () => {
		expect(() => api.last_name(emptyName)).toThrowError(
			"[AppAuthorsAPI::last_name] Error(Invalid Type):\nExpected: string with a length between 0 & 250.\nReceived: \n"
		);
	});

	test(".last_name() should fail when given a string over 250 characters", () => {
		expect(() => api.last_name(longName)).toThrowError(
			`[AppAuthorsAPI::last_name] Error(Invalid Type):\nExpected: string with a length between 0 & 250.\nReceived: ${longName}\n`
		);
	});
});
