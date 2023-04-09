import { LocalStorageHandler } from "../../common/services/LocalStorageHandler";

describe("LocalStorageHandler", () => {
    const localStorage = new LocalStorageHandler('token')

    afterEach(() => {
        localStorage.removeToken()
    })

    describe("saveToken()", () => {
        it("Should save token into the LocalStorage", () => {
            localStorage.saveToken('mockToken')
    
            const retriveToken = localStorage.getToken()
    
            expect(retriveToken).toBe('mockToken')
        })
    })

    describe("getToken()", () => {
        it("should return null if token not found", () => {
            const retriveToken = localStorage.getToken()
    
            expect(retriveToken).toBe(null)
        })
    })

    describe("removeToken()", () => {
        it("should remove token from localStorage", () => {
            localStorage.saveToken('mockToken')

            localStorage.removeToken()

            const retriveToken = localStorage.getToken()
    
            expect(retriveToken).toBe(null)
        })
    })
})