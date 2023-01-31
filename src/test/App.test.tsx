import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(
  rest.get("http://localhost:3005/todo", (req, res, ctx) => {
    return res(
      ctx.json({
        response: [{ text: "mockText", completed: false, id: "mockId" }],
      })
    );
  })
);

describe("Main App tests", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should receive data from DB", async () => {
    render(<App />);
    const data = await screen.findByRole("listitem");
    expect(data).toHaveTextContent("mockText");
  });
});
