import { Body } from "#components";
import { render } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";

describe("Body", () => {
	it("should render", () => {
		const view = render(<Body />);
		expect(() => view).not.toThrow();
	});
});
