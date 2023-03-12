import { Todos } from './components/Todos';
import { CreateTodoWindow } from './components/CreateTodoWindow';
import { Header } from './components/Header';
import { OpenCreateTodoWindowButton } from './components/OpenCreateTodoWindowButton';
import useTodo from './hooks/useTodo';
import { HttpClient } from './common/HttpClient';
import WarningDeleteAllModal from './components/WarningDeleteAllModal'

export default function App() {
    const {
        todos,
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
            />
            <Todos
                todos={todos}
                deleteTodo={deleteTodo}
                checkTodo={checkTodo}
                todoWindow={todoWindow}
                lastTodoRef={lastTodoRef}
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
            <OpenCreateTodoWindowButton
                openTodoWindow={() => !deleteAllModal && setTodoWindow(true)}
            />
        </div>
    );
}
