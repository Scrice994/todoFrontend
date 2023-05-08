import { TodoEntity } from "./TodoEntity";
import { UserEntity } from "./UserEntity";

export interface ILoadedData{
    todos: TodoEntity[]
    user: UserEntity
}