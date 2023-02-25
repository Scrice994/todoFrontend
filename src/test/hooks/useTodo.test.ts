import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useTodo from "../../hooks/useTodo";
import { HttpClientMock } from "../__mocks/HttpClientMock";

describe("Hook useTodo tests", () => {
  const httpClient = new HttpClientMock();

  const dataFetchMock = () => {
    httpClient.sendRequest.mockImplementationOnce(() =>
      Promise.resolve({
        response: [
          { text: "mockText1", completed: false, id: "mockId1" },
          { text: "mockText2", completed: false, id: "mockId2" },
        ],
      })
    );
  };

  describe("getAlltodos()", () => {
    it("Should update data with result fetched from server", async () => {
      dataFetchMock();

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      await waitFor(async () => {
        expect(result.current.todos).toEqual([
          { text: "mockText1", completed: false, id: "mockId1" },
          { text: "mockText2", completed: false, id: "mockId2" },
        ]);
      });
    });

    it("Should do something when request goes wrong", async () => {
      httpClient.sendRequest.mockImplementationOnce(() =>
        Promise.resolve({
          data: { message: "Failed to fetch data from the server" },
        })
      );

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      const spy = jest.spyOn(httpClient, "sendRequest");
      const getSpyResult = () => spy.mock.results[0].value;
      const spyObject = await getSpyResult();

      await waitFor(() => {
        expect(result.current.todos).toEqual([]);
      });

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyObject.data).toEqual({
        message: "Failed to fetch data from the server",
      });
    });
  });

  describe("deleteTodo()", () => {
    it("Should delete local data when delete is succesfull", async () => {
      dataFetchMock();

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      httpClient.sendRequest.mockImplementationOnce(() =>
        Promise.resolve({
          response: { text: "mockText1", completed: false, id: "mockId1" },
        })
      );

      act(() => {
        result.current.deleteTodo("mockId1");
      });

      const spy = jest.spyOn(httpClient, "sendRequest");
      const getSpyResult = () => spy.mock.results[1].value;

      await waitFor(() => {
        expect(result.current.todos).toEqual([
          { text: "mockText2", completed: false, id: "mockId2" },
        ]);
      });
      expect(spy).toHaveBeenCalledTimes(2);
      await waitFor(async () => {
        expect(await getSpyResult()).toEqual({
          response: { text: "mockText1", completed: false, id: "mockId1" },
        });
      });
    });
  });

  describe("addTodo()", () => {
    it("should create a newTodo when addTodo is succesfull", async () => {
      dataFetchMock();

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      httpClient.sendRequest.mockImplementationOnce(() =>
        Promise.resolve({
          response: { text: "mockText3", completed: false, id: "mockId3" },
        })
      );

      act(() => {
        result.current.addTodo();
      });

      await waitFor(() => {
        expect(result.current.todos).toEqual([
          { text: "mockText1", completed: false, id: "mockId1" },
          { text: "mockText2", completed: false, id: "mockId2" },
          { text: "mockText3", completed: false, id: "mockId3" },
        ]);
      });
    });

    it("addTodoError should become true when newTodo is empty",async () => {
      dataFetchMock();

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      act(() => {
        result.current.addTodo();
      });

      await waitFor(() => {
        expect(result.current.addTodoError).toBe(true);
      });
    });
  });

  describe("checkTodo()", () => {
    it("should update the given todo succesfully", async () => {
      dataFetchMock();

      const { result } = renderHook(() =>
        useTodo(httpClient, "http://localhost:3005/todo")
      );

      httpClient.sendRequest.mockImplementationOnce(() =>
        Promise.resolve({
          response: { text: "mockText2", completed: true, id: "mockId2" },
        })
      );

      act(() => {
        result.current.checkTodo("mockId2", false);
      });

      const spy = jest.spyOn(httpClient, "sendRequest");
      const getSpyResult = () => spy.mock.results[1].value;

      await waitFor(() => {
        expect(result.current.todos).toEqual([
          { text: "mockText1", completed: false, id: "mockId1" },
          { text: "mockText2", completed: true, id: "mockId2" },
        ]);
      });
      expect(spy).toHaveBeenCalledTimes(2);
      await waitFor(async () => {
        expect(await getSpyResult()).toEqual({
          response: { text: "mockText2", completed: true, id: "mockId2" },
        });
      });
    });
  });
});
