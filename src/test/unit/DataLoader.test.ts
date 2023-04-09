import { DataLoader } from "../../common/services/DataLoader";
import { LocalStorageHandler } from "../../common/services/LocalStorageHandler";
import { TodoServiceMock } from "../__mocks/TodoServicesMock";
import { UserServiceMock } from "../__mocks/UserServiceMock";

describe("DataLoader", () => {
    const localStorage = new LocalStorageHandler('test');
    const todoService = new TodoServiceMock()
    const userService = new UserServiceMock()
    const loader = new DataLoader(localStorage, todoService, userService);

    beforeEach(() => {
        localStorage.removeToken()
    })

    describe("loadData()", () => {
        it("Should return correct object when token is found", async () => {
            todoService.getTodosAPI.mockImplementationOnce(() => Promise.resolve(
                [
                    { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                    { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },               
                ]
            ))

            userService.getUser.mockImplementationOnce(() => Promise.resolve(
                {
                    username: 'testUsername',
                    password: 'testPassword123',
                    salt: 'mockSalt',
                    id: 'mockId',
                },
            ))

            localStorage.saveToken('mockToken')

            const result = await loader.loadData()

            console.log(result)

            expect(result).toEqual({
                todos: [
                    { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                    { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },               
                ],
                user: 'testUsername'
            })
        })

        it("should return null when token is not found", async () => {
            const result = await loader.loadData()

            expect(result).toBe(null)
        })
    })
})