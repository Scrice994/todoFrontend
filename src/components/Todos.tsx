import { TodoEntity } from "../../src/common/interfaces/ITodoEntity";
import { Todo } from "./Todo/Todo";
import { AnimatePresence } from "framer-motion";

interface TodosProps {
  todos: Required<TodoEntity[]>;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string, completed: boolean) => void;
  todoWindow: boolean;
  lastTodoRef: any;
}

export const Todos: React.FC<TodosProps> = ({
  todos,
  deleteTodo,
  checkTodo,
  todoWindow,
  lastTodoRef
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
      <div ref={lastTodoRef} className="prova"/>
    </div>
  );
};
