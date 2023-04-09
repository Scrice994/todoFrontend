import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from 'react-hook-form'

interface TodoModalProps {
  todoModal: boolean;
  closeTodoModal: () => void;
  addTodo: (todo: any) => void;
}

interface FormValues{
  text: string
  customError?: string
}

const windowAnimation = {
  initial: { top: 600, opacity: 0 },
  animate: { top: 350, opacity: 1 },
  exit: { top: 600, opacity: 0, transition: {duration: 0.15}},
};


export const TodoModal: React.FC<TodoModalProps> = ({ closeTodoModal: closeTodoWindow, addTodo }) => {

  const { register, handleSubmit, clearErrors, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      text: ''
    }
  })

  const onSubmit = (formValues: FormValues) => {
    addTodo(formValues)
    closeTodoWindow()
  }

  useEffect(() => {
    const onEnterTodoModal = async (e: any) => {
      if(e.key === 'Enter'){
        await handleSubmit(onSubmit)()
      }
    }

    document.addEventListener('keydown', onEnterTodoModal);

    return () => document.removeEventListener('keydown', onEnterTodoModal);
    
  }, []);

  return (
    <>
      <AnimatePresence>
          <motion.div className="add-todo-window" data-cy="add-modal" {...windowAnimation}>
            <div
              onClick={() => {closeTodoWindow(); clearErrors()}}
              className="close-window"
            >
              X
            </div>

            <h2 className="window-title">Type your task: </h2>

            <input 
              {...register('text', {required: "The task field can't be empty"})}
              type='text'
              autoFocus
              className="task-text"
              placeholder="Enter your task..."
              data-cy="text-input"
            />
            <p style={{ color: 'red' }} data-cy="newTodo-error">{errors.text?.message}</p>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              data-cy="create-task"
              className="create-task-button"
            >
              Create task!
            </button>
          </motion.div>
      </AnimatePresence>
    </>
  );
};
