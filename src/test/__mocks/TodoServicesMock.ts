import { ITodoService } from "../../common/interfaces/ITodoService";

export class TodoServiceMock implements ITodoService{
    getTodosAPI = jest.fn()
    addTodoAPI = jest.fn()
    checkTodoAPI = jest.fn()
    deleteTodoAPI =  jest.fn()
    deleteAllTodosAPI = jest.fn()
}