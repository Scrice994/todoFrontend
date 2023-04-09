import { ILocalStorageHandler } from '../interfaces/ILocalStorageHandler';
import { TodoService } from './TodoService';
import { UserService } from './UserService';
import { ITodoService } from '../interfaces/ITodoService';
import { IUserService } from '../interfaces/IUserService';

export class DataLoader {
    constructor(
        private _token: ILocalStorageHandler, 
        private todoService: ITodoService, 
        private userService: IUserService,
    ){}

    async loadData(){
        const findToken = this._token.getToken()

        if(!findToken){
            return null
        }

        const todos = await this.todoService.getTodosAPI()

        const user = await this.userService.getUser('/user/findUser')

        return {
            todos: todos,
            user: user.username
        }
    };

}
