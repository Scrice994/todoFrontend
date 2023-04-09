import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { HttpClient } from '../common/services/HttpClient';
import useTodo from '../hooks/useTodo';
import useUser from '../hooks/useUser';
import { TodoModal } from './TodoModal';
import { Header } from './Header';
import { Todos } from './Todos';
import { DeleteAllModal } from './DeleteAllModal';


export default function Home() {
    const [deleteAllModal, setDeleteAllModal] = useState<boolean>(false)
    const [todoModal, setTodoModal] = useState<boolean>(false);

    const { user } = useUser()
    const { todos, deleteTodo, checkTodo, addTodo, deleteAllTodos, lastTodoRef } = useTodo(new HttpClient(), 'http://localhost:3005');

    useEffect(() => {
        const OnEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && !todoModal && !deleteAllModal) {
              setTodoModal(true);
            }
        };

        document.addEventListener('keydown', OnEnter);

        return () => document.removeEventListener('keydown', OnEnter);
        
    }, [todoModal, deleteAllModal]);

    return (
        <div className="App">
                <Header 
                    openModal={() => setDeleteAllModal(prevModal => !todoModal && !prevModal)}
                    user={user}
                />
                <Todos
                    todos={todos}
                    deleteTodo={deleteTodo}
                    checkTodo={checkTodo}
                    todoModal={todoModal}
                    lastTodoRef={lastTodoRef}
                    deleteAllModal={deleteAllModal}
                />

                {deleteAllModal && 
                    <DeleteAllModal
                        deleteAllTodos={() => deleteAllTodos()}
                        closeDeleteAllModal={() => setDeleteAllModal(false)}
                    />
                }

                {todoModal && 
                    <TodoModal
                        todoModal={todoModal}
                        closeTodoModal={() => setTodoModal(false)}
                        addTodo={addTodo}
                    />
                }
                
                <div className="addtodobtn-container">
                    <motion.button 
                      onClick={() => setTodoModal(todoModal => !todoModal)} 
                      className="add-todo-button" 
                      data-cy="+"
                      initial={{scale: 0}}
                      animate={{scale: 1}}
                      whileHover={{scale: 1.15}}
                      >
                      +
                    </motion.button>
                </div>
        </div>
    );
}
