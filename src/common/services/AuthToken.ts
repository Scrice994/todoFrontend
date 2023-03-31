import { IAuthToken } from "../interfaces/IAuthToken"

export class AuthToken implements IAuthToken{
    constructor(private tokenName: string){}

    saveToken(token: string){
        localStorage.setItem(this.tokenName, JSON.stringify(token))
    }


    getToken(){
    
        const storedUser = localStorage.getItem(this.tokenName)
        
        if(typeof storedUser === 'string'){
            return JSON.parse(storedUser)
        } else {
            return null
        }
    }
    
    removeToken(){
        localStorage.removeItem(this.tokenName)
    }
}
