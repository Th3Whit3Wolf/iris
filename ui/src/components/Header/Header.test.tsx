import { Header } from "#components";
import { render,screen } from '#utils';

test("renders learn react link", () => {
	render(<Header />);

	const titleElement = screen.getByText(/Iris/i);
	expect(titleElement).toBeInTheDocument();
});
