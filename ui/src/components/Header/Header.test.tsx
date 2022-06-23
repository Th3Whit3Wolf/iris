import { Header } from "#components";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, test, beforeEach } from "vitest";

test("renders learn react link", () => {
	render(
		<MemoryRouter>
			<Header />
		</MemoryRouter>
	);

	const titleElement = screen.getByText(/Iris/i);
	expect(titleElement).toBeInTheDocument();
});
