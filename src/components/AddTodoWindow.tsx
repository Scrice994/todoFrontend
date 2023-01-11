export const AddTodoWindow = (props: {taskCreator: Function}) => {
    return (
        <div className="add-todo-window">
            <div onClick={() => props.taskCreator()} className="close-window">X</div>
            <h2 className="window-title">Type your task: </h2>
            <input className="task-text" type="text"/>
            <button className="create-task-button">Create task!</button>
        </div>
    )
}