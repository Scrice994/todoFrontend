import { useState, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { TodoEntity } from '../../src/common/interfaces/ITodoEntity';
import { IHttpClient } from '../common/interfaces/IHttpClient';
import { AuthToken } from '../common/services/AuthToken'
import { useNavigate } from 'react-router-dom'

export default function useTodo(httpClient: IHttpClient, url: string) {
    const [todos, setTodos] = useState<TodoEntity[]>([]);
    const [todoWindow, setTodoWindow] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState<string>('');
    const [addTodoError, setAddTodoError] = useState<boolean>(false);
    const [deleteAllModal, setDeleteAllModal] = useState<boolean>(false)
    const [user, setUser] = useState<String>('')

    const navigate = useNavigate()
    const initialData: any = useLoaderData()

    useEffect(() => {

        if(initialData){
            setTodos(initialData.todos)
            setUser(initialData.user)
        } else {
            navigate("/login")
        }

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
        const token = new AuthToken('user').getToken()

        if(!token){
            navigate('/login')
        }

        const data = await httpClient.sendRequest(`${url}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        })
       
        if (data.response) {
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        }
    };

    const deleteAllTodos = async () => {
        const token = new AuthToken('user').getToken()
        
        
        if(!token){
            navigate('/login')
        }

        const data = await httpClient.sendRequest(`${url}/deleteAll`, { method: "DELETE", headers: { 'Authorization': token }})
        .catch(err => console.log(err))
        
        if(data.response){
            setTodos([])
        }

        setDeleteAllModal(false)
    }

    const checkTodo = async (id: string, completed: boolean) => {
        const token = new AuthToken('user').getToken()
        
        
        if(!token){
            navigate('/login')
        }

        const data = await httpClient.sendRequest(`${url}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({ completed: !completed }),
        }).catch(err => console.log(err))

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

        const token = new AuthToken('user').getToken()

        if(!token){
            navigate('/login')
        }

        const data = await httpClient.sendRequest(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({ text: todo }),
        })
        .catch(err => console.log(err))

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
        user,
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
