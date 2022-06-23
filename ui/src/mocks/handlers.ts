import { rest } from "msw";

// Mock Data
export const posts = [
	{
		userId: 1,
		id: 1,
		title: "first post title",
		body: "first post body"
	},
	{
		userId: 2,
		id: 5,
		title: "second post title",
		body: "second post body"
	},
	{
		userId: 3,
		id: 6,
		title: "third post title",
		body: "third post body"
	}
];

const apiUrl = "http://localhost:8080";

// Define handlers that catch the corresponding requests and returns the mock data.
export const handlers = [
	rest.get(`${apiUrl}/api/v1`, (req, res, ctx) => {
		return res(ctx.status(200), ctx.json(posts));
	})
];
