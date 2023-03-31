import { IAuthToken } from '../interfaces/IAuthToken';
import { IDataLoader } from '../interfaces/IDataLoader';
import { IHttpClient } from '../interfaces/IHttpClient';
import { TodoEntity } from '../interfaces/ITodoEntity';

export class DataLoader implements IDataLoader{
    constructor(private _token: IAuthToken, private httpClient: IHttpClient, private url: string){}

    async loadData(){
        const findToken = this._token.getToken()

        if(!findToken){
            return null
        }

        const todos = await this.loadTodos(findToken)
        const username = await this.loadUser(findToken)

        return {
            todos: todos || [],
            user: username || 'User'
        }
    };

    async loadTodos(token: string): Promise<TodoEntity[]> {
        const todoData = await this.httpClient.sendRequest(this.url + '/todo', { method: 'GET', headers: {'Authorization': token}})
        .catch(err => console.log(err))

        return todoData.response
    };

    async loadUser(token: string){
        const userData = await this.httpClient.sendRequest(this.url + '/user/findUser', { method: 'GET', headers: {'Authorization': token}})

        return userData.response?.username
    };

}
