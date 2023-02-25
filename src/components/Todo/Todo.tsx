import { FaTrash } from "react-icons/fa";
import { TodoEntity } from "../../../../backend/src/entities/TodoEntity";
import { CheckButton } from "./CheckButton";
import { motion } from "framer-motion";

interface TodoProps {
  todo: TodoEntity;
  checkTodo: Function;
  deleteTodo: Function;
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

      <button
        className="todo-delete"
        data-cy="delete"
        onClick={() => {
          deleteTodo(todo.id);
        }}
        disabled={todoWindow === true}
      >
        <FaTrash className="delete-icon" />
      </button>
    </motion.div>
  );
}
