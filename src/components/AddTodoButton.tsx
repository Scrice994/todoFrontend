export const AddTodoButton = (props: {taskCreator: Function}) => {
    return (
        <div onClick={() => props.taskCreator()} className="add-todo-button">+</div>
    )
}