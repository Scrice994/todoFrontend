import { ILocalStorageHandler } from "../interfaces/ILocalStorageHandler"
import { IHttpClient } from "../interfaces/IHttpClient"
import { IUserService, ResponseStatus } from "../interfaces/IUserService"

export class UserService implements IUserService{
    constructor(private _httpClient: IHttpClient, private _url: string, private _token: ILocalStorageHandler){}

    async getUser(url: string){
        const userData = await this._httpClient.sendRequest(this._url + url, { method: 'GET', headers: {'Authorization': this._token.getToken()}})

        return userData.response
    }

    async postValues(values: any, url: string): Promise<ResponseStatus> {
        const data = await this._httpClient.sendRequest(this._url + url,{
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



    async createNewMember(values: any): Promise<ResponseStatus> {
        const token = this._token.getToken()

        const data = await this.createNewMemberAPI(values, token)

        if('message' in data){
            return { status: false, message: data.message } 
        }

        return { status: true }
    }

    private async createNewMemberAPI(values: any, token: string | null): Promise<any> {
        const data = await this._httpClient.sendRequest(this._url + '/user/admin/create-member-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify(values)
        })

        return data
    }
}