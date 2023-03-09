import { Todos } from "./components/Todos";
import { CreateTodoWindow } from "./components/CreateTodoWindow";
import { Header } from "./components/Header";
import { OpenCreateTodoWindowButton } from "./components/OpenCreateTodoWindowButton";
import useTodo from "./hooks/useTodo";
import { HttpClient } from "./common/HttpClient";

export default function App() {
  const {
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
    lastTodoRef
  } = useTodo(
    new HttpClient(),
    "http://localhost:3005/todo"
  );

  return (
    <div className="App">
      <Header />
      <Todos 
        todos={todos} 
        deleteTodo={deleteTodo} 
        checkTodo={checkTodo}
        todoWindow={todoWindow}
        lastTodoRef={lastTodoRef}
      />
      <CreateTodoWindow
        todoWindow={todoWindow}
        closeTodoWindow={() => setTodoWindow(false)}
        inputOnChange={inputOnChange}
        newTodo={newTodo}
        addTodo={addTodo}
        addTodoError={addTodoError}
        removeError={() => setAddTodoError(false)}
      />
      <OpenCreateTodoWindowButton openTodoWindow={() => setTodoWindow(true)} />
    </div>
  );
}

