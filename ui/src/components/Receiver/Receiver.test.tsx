import { Receiver } from "#components";
import { AntennaProvider, RxProvider, SignalProvider } from "#context";
import { render } from "@testing-library/react";

describe("Receiver", () => {
	beforeAll(() => {
		win.iris = {
			socket: {
				on: jest.fn(),
				emit: jest.fn()
			}
		};
	});

	it("should render", () => {
		const view = render(
			<SignalProvider>
				<RxProvider>
					<AntennaProvider>
						<Receiver />
					</AntennaProvider>
				</RxProvider>
			</SignalProvider>
		);
		expect(() => view).not.toThrow();
	});
});
