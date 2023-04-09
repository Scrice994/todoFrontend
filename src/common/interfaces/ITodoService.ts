import { TodoEntity } from "./TodoEntity";

export interface ITodoService{
    getTodosAPI:() => Promise<TodoEntity[]>
    addTodoAPI: (todo: any) => Promise<TodoEntity>
    checkTodoAPI: (id: string, completed: boolean) => Promise<TodoEntity>
    deleteTodoAPI: (id: string) => Promise<TodoEntity>
    deleteAllTodosAPI: () => Promise<number>
}