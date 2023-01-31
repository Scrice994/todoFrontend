import {useState, useEffect} from "react";
import { TodoEntity } from "../../../backend/src/entities/TodoEntity";



export default function useTodo(url: string) {
  const [todos, setTodos] = useState<TodoEntity[]>([]);
  const [todoWindow, setTodoWindow] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((res) => setTodos(res.response))
      .catch((err) => console.error(err));
  };

  const deleteTodo = async (id: string) => {
    const deleteTodoFetch = await fetch(url + `/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deleteTodoFetch.response.id))
  };

  const checkTodo = async (id: string, completed: boolean) => {
    await fetch(url + `/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));

    setTodos(prevTodos => prevTodos.map(todo => todo.id === id ? {...todo, completed: !completed} : todo))
  };

  const addTodo = async () => {
    const addTodoFetch = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTodo }),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    
    setTodos([...todos, addTodoFetch.response])
    setNewTodo("")
    setTodoWindow(false);
  };

  const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  return {todos, todoWindow, newTodo, deleteTodo, setTodoWindow, checkTodo, addTodo, inputOnChange}
}
