import { Antenna } from "#components";
import { render } from '#utils';

describe("Antenna", () => {
	it("should render", () => {
		const view = render(<Antenna />);
		expect(() => view).not.toThrow();
	});
});
