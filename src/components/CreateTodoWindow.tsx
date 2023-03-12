import React from "react";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CreateTodoWindowProps {
  todoWindow: boolean;
  addTodoError: boolean;
  closeTodoWindow: () => void;
  newTodo: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addTodo: (todo: string) => void;
}

export const CreateTodoWindow: React.FC<CreateTodoWindowProps> = ({
  addTodoError,
  todoWindow,
  closeTodoWindow,
  newTodo,
  inputOnChange,
  addTodo,
}) => {

  const setFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFocus.current?.focus();

    function onEnterPress(e: KeyboardEvent){
        if (e.key === "Enter" && todoWindow) {addTodo(newTodo)}
    }

    document.addEventListener("keydown", onEnterPress)

    return () => document.removeEventListener("keydown", onEnterPress)
    
  }, [todoWindow, addTodo, newTodo]);

  const windowAnimation = {
    initial: { top: 600, opacity: 0 },
    animate: { top: 350, opacity: 1 },
    exit: { top: 600, opacity: 0, transition: {duration: 0.15}},
  };
  
  return (
    <>
      <AnimatePresence>
        {todoWindow && (
          <motion.div className="add-todo-window" {...windowAnimation}>
            <div
              onClick={() => {closeTodoWindow()}}
              className="close-window"
            >
              X
            </div>

            <h2 className="window-title">Type your task: </h2>

            <input
              data-cy="text-input"
              className="task-text"
              placeholder="Enter your task..."
              type="text"
              value={newTodo}
              onChange={(e) => inputOnChange(e)}
              ref={setFocus}
            />
            {addTodoError && newTodo.length <= 0 && (
              <label className="error" data-cy="empty-input-msg">The task can't be empty!</label>
            )}
            <button
              onClick={() => addTodo(newTodo)}
              data-cy="create-task"
              className="create-task-button"
            >
              Create task!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
