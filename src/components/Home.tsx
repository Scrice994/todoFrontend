import { motion } from 'framer-motion'
import { HttpClient } from '../common/services/HttpClient';
import useTodo from '../hooks/useTodo';
import { CreateTodoWindow } from './CreateTodoWindow';
import { Header } from './Header';
import { Todos } from './Todos';
import WarningDeleteAllModal from './WarningDeleteAllModal';

export default function Home() {
    const {
        todos,
        user,
        todoWindow,
        newTodo,
        addTodoError,
        deleteTodo,
        setTodoWindow,
        checkTodo,
        addTodo,
        inputOnChange,
        setAddTodoError,
        lastTodoRef,
        setNewTodo,
        deleteAllModal,
        setDeleteAllModal,
        deleteAllTodos
    } = useTodo(new HttpClient(), 'http://localhost:3005/todo');

    return (
        <div className="App">
                <Header 
                    openModal={() => setDeleteAllModal(prevModal => !todoWindow && !prevModal)}
                    user={user}
                />
                <Todos
                    todos={todos}
                    deleteTodo={deleteTodo}
                    checkTodo={checkTodo}
                    todoWindow={todoWindow}
                    lastTodoRef={lastTodoRef}
                    deleteAllModal={deleteAllModal}
                />
                {deleteAllModal && 
                    <WarningDeleteAllModal
                        deleteAllTodos={() => deleteAllTodos()}
                        closeModal={() => setDeleteAllModal(false)}
                    />
                }
                <CreateTodoWindow
                    todoWindow={todoWindow}
                    closeTodoWindow={() => {
                        setTodoWindow(false);
                        setAddTodoError(false);
                        setNewTodo('');
                    }}
                    inputOnChange={inputOnChange}
                    newTodo={newTodo}
                    addTodo={addTodo}
                    addTodoError={addTodoError}
                />
                
                <div className="addtodobtn-container">
                    <motion.button 
                      onClick={() => setTodoWindow(todoWindow => !todoWindow)} className="add-todo-button" data-cy="+"
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
