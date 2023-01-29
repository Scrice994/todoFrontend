import { FaCheck, FaTrash } from "react-icons/fa";
import { TodoEntity } from "../../../backend/src/entities/TodoEntity";

interface TodosProps {
  todos: Required<TodoEntity[]>;
  deleteTodo: Function;
  checkTodo: Function;
}

export const Todos: React.FC<TodosProps> = ({
  todos,
  deleteTodo,
  checkTodo,
}) => {
  return (
    <div className="todos">
      {todos?.map((todo) => (
        <div className="todo" key={todo.id}>
          <div className="todo-label">
            {todo.completed === false ? (
              <div
                className="checkbox"
                onClick={() => checkTodo(todo.id, todo.completed)}
              ></div>
            ) : (
              <FaCheck
                className="checkbox-checked"
                onClick={() => checkTodo(todo.id, todo.completed)}
              />
            )}

            <h3 className="todo-text">{todo.text}</h3>
          </div>

          <div
            onClick={() => {
              deleteTodo(todo.id);
            }}
            className="todo-delete"
          >
            <FaTrash />
          </div>
        </div>
      ))}
    </div>
  );
};
