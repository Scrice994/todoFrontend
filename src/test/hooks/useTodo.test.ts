import { renderHook, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import useTodo from "../../hooks/useTodo";


const server = setupServer(
  rest.get("http://localhost:3005/todo", (req, res, ctx) => {
    return res(
      ctx.json({
        response: [{ text: "mockText1", completed: false, id: "mockId1" }, { text: "mockText2", completed: false, id: "mockId2" }],
      })
    );
  }),

  rest.delete("http://localhost:3005/todo/mockId1", (req, res, ctx) => {
    return res(
      ctx.json({response: { text: "mockText1", completed: false, id: "mockId1" }})
    );
  }),

  rest.put("http://localhost:3005/todo/mockId", (req, res, ctx) => {
    return res(
      ctx.json({
        response: { text: "mockText", completed: true, id: "mockId" },
      })
    );
  })
);

describe("Hook useTodo tests", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe("getAlltodos()", () => {
    it("should receive data from DB", async () => {
        const { result } = renderHook(() => useTodo("http://localhost:3005/todo"))
        await waitFor(async () => {
            expect(result.current.todos).toEqual([{ text: "mockText1", completed: false, id: "mockId1" }, { text: "mockText2", completed: false, id: "mockId2" }])    
        })
      });
  })

  describe("deleteTodo()", () => {
    it("should delete the todo with the given id", async () => {
      const { result } = renderHook(() => useTodo("http://localhost:3005/todo"))

      act(() => {
        result.current.deleteTodo("mockId1")
      })
      
      await waitFor(async () => {
        expect(result.current.todos).toEqual([{ text: "mockText2", completed: false, id: "mockId2" }])
      })
    })
  })
})