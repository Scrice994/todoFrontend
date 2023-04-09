import { TodoService } from "../../common/services/TodoService";
import { HttpClientMock } from "../__mocks/HttpClientMock";

describe("TodoService", () => {
    const httpClient = new HttpClientMock();
    const Service = new TodoService(httpClient, 'http://localhost:3005', 'mockToken');

    describe("getTodosAPI()", () => {
        it("Should return all todos", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                response: [
                    { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                    { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },               
                ]
            }))

            const result = await Service.getTodosAPI()

            expect(result).toEqual([
                { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },               
            ])
        })
    })

    describe("addTodoAPI()", () => {
        it("should return the created Todo", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                response: { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' }         
            }))

            const result = await Service.addTodoAPI({text: 'mockText1'})

            expect(result).toEqual({ text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' })
        })
    })

    describe("checkTodoAPI()", () => {
        it("should return updated Todo", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                response: { text: 'mockText1', completed: true, id: 'mockId1', userId: 'mockUserId1' }         
            }))

            const result = await Service.checkTodoAPI('mockId1', true)

            expect(result).toEqual({ text: 'mockText1', completed: true, id: 'mockId1', userId: 'mockUserId1' })
        })
    })

    describe("deleteTodoAPI()", () => {
        it("should return deleted Todo", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                response: { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' }         
            }))

            const result = await Service.deleteTodoAPI('mockId1')

            expect(result).toEqual({ text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' })
        })
    })

    describe("deleteAllTodosAPI()", () => {
        it("should return number of deleted Todos", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                response: 2         
            }))

            const result = await Service.deleteAllTodosAPI()

            expect(result).toEqual(2)
        })
    })
})