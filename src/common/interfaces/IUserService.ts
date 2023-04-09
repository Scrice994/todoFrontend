export interface ResponseStatus{
    status: boolean
    message?: string
}

export interface IUserService{
    getUser: (url: any) => Promise<any>
    postValues: (values: any, url: string) => Promise<ResponseStatus>
}