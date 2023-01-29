import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useTodo from "../../hooks/useTodo"


describe("useTodo", () => {
    it("AddTodo should add a newTodo into todos",async () => {
       const { result } = renderHook(useTodo)
       //await act(() => result.current.addTodo())

    })
})