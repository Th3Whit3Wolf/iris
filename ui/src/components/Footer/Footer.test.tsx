import { Footer } from "#components";
import { render } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";

describe("Footer", () => {
	it("should render", () => {
		const view = render(<Footer />);
		expect(() => view).not.toThrow();
	});
});
