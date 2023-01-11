import { FaTrash } from "react-icons/fa";

export const Todo = (props: {values: any, deleteTodo: Function, tickTodo: Function}) => {
    return (
        <div className="todo" onClick={() => props.tickTodo(props.values.id, props.values.completed)}>
            <div className="todo-label">
              <div className={props.values.completed === false ? "checkbox" : "checkbox-on"}></div>
              <h3 className="todo-text">{props.values.text}</h3>
            </div>
            <div onClick={(e) => {e.stopPropagation(); props.deleteTodo(props.values.id)}} className="todo-delete">
              <FaTrash />
            </div>
          </div>
    )
}