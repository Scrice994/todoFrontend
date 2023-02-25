import React from "react";
import { useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface CreateTodoWindowProps {
  todoWindow: boolean;
  addTodoError: boolean;
  setTodoWindow: Function;
  setAddTodoError: Function;
  newTodo: string;
  inputOnChange: Function;
  addTodo: Function;
}
export const CreateTodoWindow: React.FC<CreateTodoWindowProps> = ({
  addTodoError,
  todoWindow,
  setTodoWindow,
  setAddTodoError,
  newTodo,
  inputOnChange,
  addTodo,
}) => {
  const setFocus = useRef<HTMLInputElement>(null);
  useEffect(() => {
    setFocus.current?.focus();
  }, [todoWindow]);

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
              onClick={() => {
                setTodoWindow(false);
                setAddTodoError(false);
              }}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") addTodo();
              }}
              ref={setFocus}
            />
            {addTodoError && newTodo.length <= 0 && (
              <label className="error">The task can't be empty!</label>
            )}
            <button
              onClick={() => addTodo()}
              className="create-task-button"
              data-cy="create-task"
            >
              Create task!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
