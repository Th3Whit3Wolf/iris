import { Receiver } from "#components";
import { render } from "@testing-library/react";

describe("Receiver", () => {
	it("should render", () => {
		const view = render(<Receiver />);
		expect(() => view).not.toThrow();
	});
});
