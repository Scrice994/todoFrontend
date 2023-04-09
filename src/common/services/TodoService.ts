import { IHttpClient } from "../interfaces/IHttpClient";
import { ITodoService } from "../interfaces/ITodoService";
import { TodoEntity } from "../interfaces/TodoEntity";

export class TodoService implements ITodoService{
    constructor(private _httpClient: IHttpClient, private _url: string, private _token: string){}

    async getTodosAPI(){
        const data = await this._httpClient.sendRequest(this._url + '/todo', { method: 'GET', headers: {'Authorization': this._token}})

        return data.response
    }

    async addTodoAPI(todo: any): Promise<TodoEntity> {
        const data = await this._httpClient.sendRequest(this._url + '/todo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': this._token },
            body: JSON.stringify({ text: todo.text }),
        })
        .catch(err => console.log(err))

        return data.response
    }

    async checkTodoAPI(id: string, completed: boolean): Promise<TodoEntity> {
        const data = await this._httpClient.sendRequest(`${this._url}/todo/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': this._token },
            body: JSON.stringify({ completed: !completed }),
        }).catch(err => console.log(err))

        return data.response
    }

    async deleteTodoAPI(id: string){
        const data = await this._httpClient.sendRequest(`${this._url}/todo/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': this._token }
        })

        return data.response
    }

    async deleteAllTodosAPI(){
        const data = await this._httpClient.sendRequest(`${this._url}/todo/deleteAll`, { method: "DELETE", headers: { 'Authorization': this._token }})
        .catch(err => console.log(err))

        return data.response
    }
    
}