interface CreateTodoWindowProps {
  todoWindow: boolean;
  setTodoWindow: Function;
  newTodo: string;
  inputOnChange: Function;
  addTodo: Function;
}

export const CreateTodoWindow: React.FC<CreateTodoWindowProps> = ({
  todoWindow,
  setTodoWindow,
  newTodo,
  inputOnChange,
  addTodo,
}) => {
  return (
    <>
      {todoWindow && (
        <div className="add-todo-window">
          <div onClick={() => setTodoWindow(false)} className="close-window">
            X
          </div>

          <h2 className="window-title">Type your task: </h2>

          <input
            className="task-text"
            placeholder="Enter your task..."
            type="text"
            value={newTodo}
            onChange={(e) => inputOnChange(e)}
          />

          <button onClick={() => addTodo()} className="create-task-button">
            Create task!
          </button>
        </div>
      )}
    </>
  );
};
