import { TeamInfo } from "#components";
import { render, screen } from "@testing-library/react";
import { describe, expect, test, beforeEach } from "vitest";

window.sewApp = {
	teamInfo: {
		team: "blue"
	}
};

test("renders server and team name", () => {
	render(<TeamInfo />);
	expect(screen.getByText(/Team/i)).toBeInTheDocument();
	expect(screen.getByText(/Server/i)).toBeInTheDocument();
});
