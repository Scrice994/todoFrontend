import { motion } from 'framer-motion'

interface OpenCreateTodoWindowButtonProps {
  setTodoWindow: Function;
}

export const OpenCreateTodoWindowButton: React.FC<
  OpenCreateTodoWindowButtonProps
> = ({ setTodoWindow }) => {
  return (
    <div className="addtodobtn-container">
      <motion.button 
        onClick={() => setTodoWindow(true)} className="add-todo-button" data-cy="+"
        initial={{scale: 0}}
        animate={{scale: 1}}
        whileHover={{scale: 1.15}}
        >
        +
      </motion.button>
    </div>
  );
};
