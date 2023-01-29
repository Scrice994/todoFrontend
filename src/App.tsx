import { Todos } from "./components/Todos";
import { AddTodoWindow } from "./components/AddTodoWindow";
import useTodo from "./hooks/useTodo";

function App() {
  const {
    todos,
    taskCreator,
    newTodo,
    deleteTodo,
    setTaskCreator,
    checkTodo,
    addTodo,
    inputOnChange,
  } = useTodo("http://localhost:3005/todo");

  return (
    <div className="App">
      <h2 className="header">Welcome User, Your tasks are:</h2>
      <Todos todos={todos} deleteTodo={deleteTodo} checkTodo={checkTodo} />
      {taskCreator && (
        <AddTodoWindow
          taskCreator={setTaskCreator}
          inputOnChange={inputOnChange}
          newTodo={newTodo}
          addTodo={addTodo}
        />
      )}
      <div onClick={() => setTaskCreator(true)} className="add-todo-button">
        +
      </div>
    </div>
  );
}

export default App;
