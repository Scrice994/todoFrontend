import { Header } from "./components/Header";
import { useState, useEffect } from "react";
import { Todos } from "./components/Todos";
import { AddTodoWindow } from "./components/AddTodoWindow"
import { AddTodoButton } from "./components/AddTodoButton";
const API_PATH_BASE = "http://localhost:3005/todo";

function App() {
  const [todos, setTodos] = useState<any []>([]);
  const [taskCreator, setTaskCreator] = useState(false)

  useEffect(() => {
    getAllTodos();
  }, []);

  const getAllTodos = () => {
    fetch(API_PATH_BASE)
      .then((res) => res.json())
      .then((res) => setTodos(res))
      .catch((err) => console.error(err));
  };

  const deleteTodo = async (id: string) => {
    await fetch(API_PATH_BASE + `/${id}`, {method: 'DELETE'})
      .then(res => res.json())
      .catch(err => console.error(err))

    getAllTodos()
  }

  const tickTodo = async (id: string, completed: boolean) => {
    const data = await fetch(API_PATH_BASE + `/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
      })
      .then(res => res.json())
      .catch(err => console.error(err))
    console.log(data)
    getAllTodos()
  }

  const taskCreatorFalse = () => {
    setTaskCreator(false)
  }
  const taskCreatorTrue = () => {
    setTaskCreator(true)
  }

  return (
    <div className="App">
      <Header />
      <Todos 
        todos={todos}
        deleteTodo={deleteTodo}
        tickTodo={tickTodo}
      />
      {taskCreator && <AddTodoWindow taskCreator={taskCreatorFalse} />}
      <AddTodoButton taskCreator={taskCreatorTrue} />
    </div>
  );
}

export default App;
