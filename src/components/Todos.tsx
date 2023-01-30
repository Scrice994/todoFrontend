import { TodoEntity } from "../../../backend/src/entities/TodoEntity";
import { Todo } from "./Todo";

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
        <Todo
          todo={todo}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
          key={todo.id}
        />
      ))}
    </div>
  );
};
