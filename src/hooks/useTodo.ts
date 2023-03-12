import { useState, useEffect, useRef } from 'react';
import { TodoEntity } from '../../src/common/interfaces/ITodoEntity';
import { IHttpClient } from '../common/interfaces/IHttpClient';

export default function useTodo(httpClient: IHttpClient, url: string) {
    const [todos, setTodos] = useState<TodoEntity[]>([]);
    const [todoWindow, setTodoWindow] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>('');
    const [addTodoError, setAddTodoError] = useState<boolean>(false);
    const [deleteAllModal, setDeleteAllModal] = useState<boolean>(false)

    useEffect(() => {
        const getAllTodos = async () => {
            const data = await httpClient.sendRequest(url, { method: 'GET' });
            if (data.response) {
                setTodos(data.response);
            }
        };

        getAllTodos();
    }, []);

    useEffect(() => {
        const OnEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && todoWindow === false && !deleteAllModal) {
              setNewTodo('')
              setTodoWindow(true);
            }
        };

        document.addEventListener('keydown', OnEnter);

        return () => document.removeEventListener('keydown', OnEnter);
    }, [todoWindow, deleteAllModal]);

    const lastTodoRef = useRef<null | HTMLDivElement>(null);

    const deleteTodo = async (id: string) => {
        const data = await httpClient.sendRequest(`${url}/${id}`, {
            method: 'DELETE',
        });
        if (data.response) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
    };

    const deleteAllTodos = async () => {
        const data = await httpClient.sendRequest(`${url}/deleteAll`, { method: "DELETE"} )
        
        if(data.response){
            setTodos([])
        }
        setDeleteAllModal(false)
    }

    const checkTodo = async (id: string, completed: boolean) => {
        const data = await httpClient.sendRequest(`${url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed }),
        });
        if (data.response) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !completed } : todo
                )
            );
        }
    };

    const addTodo = async (todo: string) => {
        if (todo === '') {
            return setAddTodoError(true);
        }

        const data = await httpClient.sendRequest(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: todo }),
        });

        setNewTodo('');
        setTodoWindow(false);
        setAddTodoError(false);
        setTodos((prevTodos) => [...prevTodos, data.response]);
        lastTodoRef.current?.scrollIntoView(true);
    };

    const inputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
        setAddTodoError(false);
    };

    return {
        todos,
        todoWindow,
        newTodo,
        setNewTodo,
        addTodoError,
        deleteTodo,
        setTodoWindow,
        checkTodo,
        addTodo,
        inputOnChange,
        setAddTodoError,
        lastTodoRef,
        deleteAllModal,
        setDeleteAllModal,
        deleteAllTodos
    };
}
