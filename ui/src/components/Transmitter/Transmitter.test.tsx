import { TxProvider } from "#context";
import { Transmitter } from "#components";
import { render } from "@testing-library/react";
import { TransmitterAPI } from "#api";
import { describe, expect, test, beforeEach } from "vitest";

describe("Transmitter", () => {
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
			<TxProvider>
				<Transmitter />
			</TxProvider>
		);
		expect(() => view).not.toThrow();
	});
});
