export interface ILocalStorageHandler{
    saveToken: (token: string) => void
    getToken: () => string | null
    removeToken: () => void
}