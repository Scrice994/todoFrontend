import { TodoEntity } from "../../common/interfaces/ITodoEntity"
import { AnimatePresence, motion } from "framer-motion";

interface CheckButtonProps {
  todo: TodoEntity;
  checkTodo: (id: string, completed: boolean) => void;
  todoWindow: boolean;
}

export const CheckButton: React.FC<CheckButtonProps> = ({
  todo,
  checkTodo,
  todoWindow,
}) => {
  const animationCircle = {
    initial: { r: 0 },
    mid: { r: 47, transition: { duration: 0.15 } },
    exit: { r: 0, transition: { duration: 0.25, delay: 0.1 } },
  };

  const animationCheck = {
    initial: { pathLength: 0, opacity: 0 },
    mid: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.15, delay: 0.16 },
    },
    exit: { pathLength: 0, opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <button
      data-cy="check-btn"
      className={"checkbox checked"}
      disabled={todoWindow === true}
      onClick={() => checkTodo(todo.id, todo.completed!)}
    >
      <svg viewBox="0 0 100 100" className="circle-animation">
        <motion.circle
          r={46}
          cx="50"
          cy="50"
          stroke="black"
          strokeWidth={4}
          fillOpacity={0}
        />
        <AnimatePresence initial={false}>
          {todo.completed && (
            <>
              <motion.circle
                variants={animationCircle}
                initial="initial"
                animate="mid"
                exit="exit"
                cx="50"
                cy="50"
                stroke="#075D03"
                strokeWidth={4}
                fill="#0BFA00"
                data-cy="check-background"
              />
              <motion.path
                variants={animationCheck}
                initial="initial"
                animate="mid"
                exit="exit"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M 22 48 l 20 20 l 35 -35"
                stroke="black"
                fill="none"
                strokeWidth={10}
                data-cy="check"
              />
            </>
          )}
        </AnimatePresence>
      </svg>
    </button>
  );
};
