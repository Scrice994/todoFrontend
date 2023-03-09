import { motion } from 'framer-motion'

interface OpenCreateTodoWindowButtonProps {
  openTodoWindow: () => void;
}

export const OpenCreateTodoWindowButton: React.FC<
  OpenCreateTodoWindowButtonProps
> = ({ openTodoWindow }) => {
  return (
    <div className="addtodobtn-container">
      <motion.button 
        onClick={openTodoWindow} className="add-todo-button" data-cy="+"
        initial={{scale: 0}}
        animate={{scale: 1}}
        whileHover={{scale: 1.15}}
        >
        +
      </motion.button>
    </div>
  );
};
