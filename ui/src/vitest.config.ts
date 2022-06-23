// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { RfEnvironment } from "./RfEnvironment";
import { antennas, satellites } from "./constants";
import { server } from "./mocks/server";
import "@testing-library/jest-dom";
import { SocketServerMock } from "socket.io-mock-ts";
import { vi } from "vitest";

beforeAll(async () => {
	const socket = new SocketServerMock();

	window.iris = {
		socket,
		constants: {
			satellites,
			antennas
		},
		environment: new RfEnvironment(),
		announceSpecAChange: vi.fn(),
		getSpectrumAnalyzer: vi.fn(),
		init: vi.fn(),
		socketInit: vi.fn(),

		specA1: undefined,
		specA2: undefined,
		specA3: undefined,
		specA4: undefined,

		team: "",
		teamInfo: {
			team: "",
			server: ""
		}
	};

	server.listen({ onUnhandledRequest: "error" });
});

afterAll(() => server.close());
afterEach(() => server.resetHandlers());
