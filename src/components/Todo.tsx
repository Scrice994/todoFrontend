import { FaCheck, FaTrash } from "react-icons/fa";
import { TodoEntity } from "../../../backend/src/entities/TodoEntity";

interface TodoProps {
  todo: TodoEntity;
  checkTodo: Function;
  deleteTodo: Function;
}

export const Todo: React.FC<TodoProps> = ({ todo, checkTodo, deleteTodo }) => {
  return (
    <div className="todo" key={todo.id}>
      <div className="todo-label">
        {todo.completed === false ? 
            ( <div
                className="checkbox"
                onClick={() => checkTodo(todo.id, todo.completed)}
              ></div>
            ) 
                : 
            (
              <FaCheck
                className="checkbox-checked"
                onClick={() => checkTodo(todo.id, todo.completed)}
              />
            )
        }

        <h3 className="todo-text">{todo.text}</h3>
      </div>

      <FaTrash
        onClick={() => {
          deleteTodo(todo.id);
        }}
        className="todo-delete"
      />
    </div>
  );
};
