import { TodoEntity } from "./ITodoEntity"

export interface IDataLoader{
    loadData: () => {}
    loadTodos: (token: string) => Promise<TodoEntity[]>
    loadUser: (token: string) => Promise<string>
}