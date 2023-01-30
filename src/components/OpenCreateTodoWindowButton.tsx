interface OpenCreateTodoWindowButtonProps{
    setTodoWindow: Function
}


export const OpenCreateTodoWindowButton: React.FC<OpenCreateTodoWindowButtonProps> = ({setTodoWindow}) => {
  return (
    <div onClick={() => setTodoWindow(true)} className="add-todo-button">
      +
    </div>
  );
};
