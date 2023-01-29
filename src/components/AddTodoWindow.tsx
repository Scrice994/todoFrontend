interface AddTodoWindowProps{
  taskCreator: Function;
  newTodo: string;
  inputOnChange: Function;
  addTodo: Function;
}

export const AddTodoWindow: React.FC<AddTodoWindowProps> = ({ taskCreator, newTodo, inputOnChange, addTodo }) => {
  return (
    <div className="add-todo-window">

      <div onClick={() => taskCreator(false)} className="close-window">
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
  );
};
