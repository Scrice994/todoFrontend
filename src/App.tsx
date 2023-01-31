import { Todos } from "./components/Todos";
import { CreateTodoWindow } from "./components/CreateTodoWindow";
import { Header } from "./components/Header";
import { OpenCreateTodoWindowButton } from "./components/OpenCreateTodoWindowButton";
import useTodo from "./hooks/useTodo";

function App() {
  const {
    todos,
    todoWindow,
    newTodo,
    deleteTodo,
    setTodoWindow,
    checkTodo,
    addTodo,
    inputOnChange,
  } = useTodo("http://localhost:3005/todo");

  return (
    <div className="App">
      <Header />
      <Todos todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
      <CreateTodoWindow
        todoWindow={todoWindow}
        setTodoWindow={setTodoWindow}
        inputOnChange={inputOnChange}
        newTodo={newTodo}
        addTodo={addTodo}
      />
      <OpenCreateTodoWindowButton setTodoWindow={setTodoWindow} />
    </div>
  );
}

export default App;
