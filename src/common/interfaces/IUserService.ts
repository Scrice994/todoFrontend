export interface ResponseStatus{
    status: boolean
    message?: string
}

export interface IUserService{
    getUser: (url: string) => Promise<string>
    postValues: (values: any, url: string) => Promise<ResponseStatus>
}