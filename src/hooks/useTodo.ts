import { useState, useEffect, useRef } from "react";
import { TodoEntity } from "../../src/common/interfaces/ITodoEntity";
import { IHttpClient } from "../common/interfaces/IHttpClient";

export default function useTodo(httpClient: IHttpClient, url: string) {
  const [todos, setTodos] = useState<TodoEntity[]>([]);
  const [todoWindow, setTodoWindow] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");
  const [addTodoError, setAddTodoError] = useState<boolean>(false);

  useEffect(() => {
    const getAllTodos = async () => {
      const data = await httpClient.sendRequest(url, { method: "GET" });
      if (data?.response !== undefined) {
        setTodos(data.response);
      }
    };

    getAllTodos();

    document.addEventListener("keydown", OnEnter);
  }, []);

  const lastTodoRef = useRef<null | HTMLDivElement>(null);

  const OnEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter" && todoWindow === false) {
      setTodoWindow(true);
    }
  };

  const deleteTodo = async (id: string) => {
    const data = await httpClient.sendRequest(`${url}/${id}`, {
      method: "DELETE",
    });
    if (data?.response !== undefined) {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const checkTodo = async (id: string, completed: boolean) => {
    const data = await httpClient.sendRequest(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    if (data?.response !== undefined) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    }
  };

  const addTodo = async () => {
    const data = await httpClient.sendRequest(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    });

    if (newTodo === "") {
      setAddTodoError(true);
    }

    if (data?.response !== undefined) {
      setTodos((prevTodos) => [...prevTodos, data.response]);
      setNewTodo("");
      setTodoWindow(false);
      setAddTodoError(false);
      lastTodoRef.current?.scrollIntoView(true);
    }
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
    setAddTodoError(false);
  };

  return {
    todos,
    todoWindow,
    newTodo,
    addTodoError,
    deleteTodo,
    setTodoWindow,
    checkTodo,
    addTodo,
    inputOnChange,
    setAddTodoError,
    lastTodoRef,
  };
}
