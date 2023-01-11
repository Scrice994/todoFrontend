import { Header } from "./components/Header";
import { useState, useEffect } from "react";
import { TodoEntity } from "../../backend/src/entities/TodoEntity";
import { Todo } from "./components/Todo";
import { AddTodo } from "./components/AddTodo";
const API_PATH_BASE = "http://localhost:3005";

function App() {
  const [todos, setTodos] = useState<TodoEntity[]>([]);

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    fetch(API_PATH_BASE + "/todo")
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="App">
      <Header />
      <div className="todos">
        {todos.map((todo) => (
          <Todo values={todo} key={todo.id} />
        ))}
      </div>
      <AddTodo />
    </div>
  );
}

export default App;
