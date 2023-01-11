export const AddTodoWindow = (props: {
  taskCreator: Function;
  newTodo: string;
  inputOnChange: Function;
  addTodo: Function;
}) => {
  return (
    <div className="add-todo-window">
      <div onClick={() => props.taskCreator()} className="close-window">
        X
      </div>
      <h2 className="window-title">Type your task: </h2>
      <input
        className="task-text"
        type="text"
        value={props.newTodo}
        onChange={(e) => props.inputOnChange(e)}
      />
      <button onClick={() => props.addTodo()} className="create-task-button">
        Create task!
      </button>
    </div>
  );
};
