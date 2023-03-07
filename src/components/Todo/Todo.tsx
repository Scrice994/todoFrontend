import { FaTrash } from "react-icons/fa";
import { TodoEntity } from "../../common/interfaces/ITodoEntity"
import { CheckButton } from "./CheckButton";
import { motion } from "framer-motion";

interface TodoProps {
  todo: TodoEntity;
  checkTodo: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  todoWindow: boolean;
}

export const Todo: React.FC<TodoProps> = ({
  todo,
  checkTodo,
  deleteTodo,
  todoWindow,

}) => {
  const todoAnimation = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: 15, transition: { duration: 0.1 } },
  };

  return (
    <motion.div
      className="todo"
      data-cy="todo"
      variants={todoAnimation}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
    >
      <div className="todo-label">
        <CheckButton
          todo={todo}
          checkTodo={checkTodo}
          todoWindow={todoWindow}
        />
        <h3 className="todo-text">{todo.text}</h3>
      </div>

      <div className="todo-delete">
        <button
          className="delete-btn"
          data-cy="delete"
          onClick={(e) => {
            deleteTodo(todo.id);
            e.stopPropagation()
          }}
          disabled={todoWindow === true}
        >
          <FaTrash className="delete-icon" />
        </button>
      </div>
    </motion.div>
  );
}
