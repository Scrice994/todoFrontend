import { TodoEntity } from "../common/interfaces/TodoEntity";
import { Todo } from "./Todo/Todo";
import { AnimatePresence } from "framer-motion";

interface TodosProps {
  todos: Required<TodoEntity[]>;
  deleteTodo: (id: string) => void;
  checkTodo: (id: string, completed: boolean) => void;
  todoModal: boolean;
  lastTodoRef: any;
  deleteAllModal: boolean
}

export const Todos: React.FC<TodosProps> = ({ todos, deleteTodo, checkTodo, todoModal, lastTodoRef, deleteAllModal }) => {
  return (
    <div className="todos">
      <AnimatePresence initial={false}>
        {todos?.map((todo) => (
          <Todo
            todo={todo}
            deleteTodo={deleteTodo}
            checkTodo={checkTodo}
            todoModal={todoModal}
            deleteAllModal={deleteAllModal}
            key={todo.id}
          />
        ))}
      </AnimatePresence>
      <div ref={lastTodoRef} className="prova"/>
    </div>
  );
};
