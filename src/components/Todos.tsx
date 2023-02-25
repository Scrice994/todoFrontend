import { TodoEntity } from "../../../backend/src/entities/TodoEntity";
import { Todo } from "./Todo/Todo";
import { AnimatePresence } from "framer-motion";

interface TodosProps {
  todos: Required<TodoEntity[]>;
  deleteTodo: Function;
  checkTodo: Function;
  todoWindow: boolean;
}

export const Todos: React.FC<TodosProps> = ({
  todos,
  deleteTodo,
  checkTodo,
  todoWindow
}) => {


  return (
    <div className="todos">
      <AnimatePresence initial={false}>
        {todos?.map((todo) => (
            <Todo
              todo={todo}
              deleteTodo={deleteTodo}
              checkTodo={checkTodo}
              todoWindow={todoWindow}
              key={todo.id}
            />
        ))}
      </AnimatePresence>
    </div>
  );
}
