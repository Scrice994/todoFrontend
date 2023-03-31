export interface IAuthToken{
    saveToken: (token: string) => void
    getToken: () => string | null
    removeToken: () => void
}