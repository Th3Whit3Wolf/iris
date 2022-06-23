import { TeamAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe.concurrent("TeamAPI", () => {
	let api: TeamAPI;
	const baseURL = "http://localhost:8080/api/v1/team";

	beforeEach(() => {
		api = new TeamAPI();
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

	test("it throws an error because it is not a type string", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		api.name(5);
		expect(Error);
	});
});
