import { AntennaProvider, RxProvider, SignalProvider } from "#context";
import { Antenna } from "#components";
import { render } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";

describe("Antenna", () => {
	beforeAll(() => {
		window.sewApp = {
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
						<Antenna />
					</AntennaProvider>
				</RxProvider>
			</SignalProvider>
		);
		expect(() => view).not.toThrow();
	});
});
