import { Todo } from "./Todo"

export const Todos = (props: {todos: any [], deleteTodo: Function, tickTodo: Function}) => {
    return (
        <div className="todos">
        {props.todos.map((todo) => (
            <Todo 
                values={todo}
                deleteTodo={props.deleteTodo} 
                tickTodo={props.tickTodo}
                key={todo.id} 
            />
          ))
        }
      </div>
    )
}