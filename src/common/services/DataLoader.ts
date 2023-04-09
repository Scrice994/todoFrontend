import { ILocalStorageHandler } from '../interfaces/ILocalStorageHandler';
import { IHttpClient } from '../interfaces/IHttpClient';
import { TodoService } from './TodoService';
import { UserService } from './UserService';

export class DataLoader {
    constructor(private _token: ILocalStorageHandler, private httpClient: IHttpClient, private url: string){}

    async loadData(){
        const findToken = this._token.getToken()

        if(!findToken){
            return null
        }

        const todos = await new TodoService(this.httpClient, this.url, findToken).getTodosAPI()
        const username = await new UserService(this.httpClient, this.url, this._token).getUser('/user/findUser')

        return {
            todos: todos,
            user: username.username
        }
    };

}
