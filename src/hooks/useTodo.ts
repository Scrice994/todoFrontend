import { useState, useEffect, useRef } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { TodoService } from '../common/services/TodoService';
import { TodoEntity } from '../common/interfaces/TodoEntity';
import { IHttpClient } from '../common/interfaces/IHttpClient';
import { LocalStorageHandler } from '../common/services/LocalStorageHandler'



export default function useTodo(httpClient: IHttpClient, url: string) {
    const [todos, setTodos] = useState<TodoEntity[]>([]);

    const navigate = useNavigate()
    const initialData: any = useLoaderData()
    const lastTodoRef = useRef<null | HTMLDivElement>(null);

    useEffect(() => {

        if(initialData){
            setTodos(initialData.todos)
        } else {
            navigate("/login")
        }

    }, []);

    const addTodo = async (todo: any) => {
        const token = new LocalStorageHandler('user').getToken()

        if(!token){
            navigate('/login')
        }

        const data = await new TodoService(httpClient, url, token).addTodoAPI(todo)
 
        if(data) setTodos((prevTodos) => [...prevTodos, data]);

        lastTodoRef.current?.scrollIntoView(true);
    };

    const checkTodo = async (id: string, completed: boolean) => {
        const token = new LocalStorageHandler('user').getToken()
        
        
        if(!token){
            navigate('/login')
        }

        const data = await new TodoService(httpClient, url, token).checkTodoAPI(id, completed)

        if (data) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !completed } : todo
                )
            );
        }
    };

    const deleteTodo = async (id: string) => {
        const token = new LocalStorageHandler('user').getToken()

        if(!token){
            navigate('/login')
        }

        const data = await new TodoService(httpClient, url, token).deleteTodoAPI(id)

        if (data) setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const deleteAllTodos = async () => {
        const token = new LocalStorageHandler('user').getToken()
        
        
        if(!token){
            navigate('/login')
        }

        const data = await new TodoService(httpClient, url, token).deleteAllTodosAPI()
        
        if(data){
            setTodos([])
        }
    }

    return {
        todos,
        lastTodoRef,
        deleteTodo,
        checkTodo,
        addTodo,
        deleteAllTodos
    };
}
