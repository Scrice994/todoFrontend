import { useState, useEffect } from "react";
import { TodoEntity } from "../../../backend/src/entities/TodoEntity";
import { IHttpClient } from "../common/interfaces/IHttpClient";

export default function useTodo(httpClient: IHttpClient, url: string) {
  const [todos, setTodos] = useState<TodoEntity[]>([]);
  const [todoWindow, setTodoWindow] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");
  const [addTodoError, setAddTodoError] = useState<boolean>(false)

  useEffect(() => {
    getAllTodos();
    document.addEventListener("keydown", OnEnter);
  }, []);

  const OnEnter = (event: any) => {
    if (event.key === "Enter" && todoWindow === false) {
      setTodoWindow(true);
    }
  };

  const getAllTodos = async () => {
    const data = await httpClient.sendRequest(url, { method: "GET" });
    if (data?.response !== undefined) {
      setTodos(data.response);
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

    if(newTodo === ""){
      setAddTodoError(true)
    }
    if (data?.response !== undefined) {
      setTodos((prevTodos) => [...prevTodos, data.response]);
      setNewTodo("");
      setTodoWindow(false);
      setAddTodoError(false)
    } 
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
    setAddTodoError(false)
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
    setAddTodoError
  };
}
