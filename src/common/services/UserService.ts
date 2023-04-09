import { ILocalStorageHandler } from "../interfaces/ILocalStorageHandler"
import { IHttpClient } from "../interfaces/IHttpClient"
import { IUserService, ResponseStatus } from "../interfaces/IUserService"

export class UserService implements IUserService{
    constructor(private _httpClient: IHttpClient, private baseUrl: string, private _token: ILocalStorageHandler){}

    async getUser(url: string){
        const userData = await this._httpClient.sendRequest(this.baseUrl + url, { method: 'GET', headers: {'Authorization': this._token.getToken()}})

        return userData.response
    }

    async postValues(values: any, url: string): Promise<ResponseStatus> {
        const data = await this._httpClient.sendRequest(this.baseUrl + url,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(values)
          })
          .then(response => {
            if(response.token){

                this._token.saveToken(response.token)
                return { status: true }
            } else {
                return { status: false, message: response.message }
            }
          })
          .catch( error => ({ status: false }))

        return data
    }
}