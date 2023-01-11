import { FaTrash } from "react-icons/fa";

export const Todo = ({values}: any) => {
    return (
        <div className="todo">
            <div className="checkbox"></div>
            <h3 className="todo-text">{values.text}</h3>
            <div className="todo-delete">
              <FaTrash />
            </div>
          </div>
    )
}