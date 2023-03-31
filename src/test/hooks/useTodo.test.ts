import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import useTodo from '../../hooks/useTodo';
import { HttpClientMock } from '../__mocks/HttpClientMock';

jest.mock("react-router-dom", () => ({
    ...(jest.requireActual("react-router-dom") as any), // technically it passes without this too, but I'm not sure if its there for other tests to use the real thing so I left it in
    useNavigate: () => jest.fn(),
    useLoaderData: () => ({
        todos: [
        { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
        { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },
       ],
        user: 'User'
    })
}));

describe('Hook useTodo tests', () => {
    const httpClient = new HttpClientMock();

    describe('deleteTodo()', () => {
        it('Should delete local data when delete is succesfull', async () => {
            const { result } = renderHook(() =>
                useTodo(httpClient, 'http://localhost:3005/todo')
            );

            console.log(result.current.todos)

            httpClient.sendRequest.mockImplementationOnce(() =>
                Promise.resolve({
                    response: {
                        text: 'mockText1',
                        completed: false,
                        id: 'mockId1',
                        userId: 'mockUserId1'
                    },
                })
            );

            act(() => {
                result.current.deleteTodo('mockId1');
            });

            const spy = jest.spyOn(httpClient, 'sendRequest');
            //const getSpyResult = () => spy.mock.results;

            await waitFor(() => {
                expect(result.current.todos).toEqual([
                    { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },
                ]);
            });
            expect(spy).toHaveBeenCalledTimes(1);
        });
    });

    describe('deleteAllTodos()', () => {
        it('Should delete all todos in the UI', async () => {
            const { result } = renderHook(() =>
                useTodo(httpClient, 'http://localhost:3005/todo')
            );

            httpClient.sendRequest.mockImplementationOnce(() =>
                Promise.resolve({
                    response: 2,
                })
            );

            act(() => {
                result.current.deleteAllTodos();
            });

            await waitFor(() => {
                expect(result.current.todos).toEqual([]);
            });
        });
    });

    describe('addTodo()', () => {
        it('should create a newTodo when addTodo is succesfull', async () => {

            const { result } = renderHook(() =>
                useTodo(httpClient, 'http://localhost:3005/todo')
            );

            httpClient.sendRequest.mockImplementationOnce(() =>
                Promise.resolve({
                    response: {
                        text: 'mockText3',
                        completed: false,
                        id: 'mockId3',
                        userId: 'mockUserId1'
                    },
                })
            );

            act(() => {
                result.current.addTodo('mockText3');
            });

            await waitFor(() => {
                expect(result.current.todos).toEqual([
                    { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                    { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },
                    { text: 'mockText3', completed: false, id: 'mockId3', userId: 'mockUserId1' },
                ]);
            });
        });

        it('addTodoError should become true when newTodo is empty', async () => {
            const { result } = renderHook(() =>
                useTodo(httpClient, 'http://localhost:3005/todo')
            );

            act(() => {
                result.current.addTodo('');
            });

            await waitFor(() => {
                expect(result.current.addTodoError).toBe(true);
            });
        });
    });

    describe('checkTodo()', () => {
        it('should update the given todo succesfully', async () => {
            const { result } = renderHook(() =>
                useTodo(httpClient, 'http://localhost:3005/todo')
            );

            httpClient.sendRequest.mockImplementationOnce(() =>
                Promise.resolve({
                    response: {
                        text: 'mockText2',
                        completed: true,
                        id: 'mockId2',
                        userId: 'mockUserId1'
                    },
                })
            );

            act(() => {
                result.current.checkTodo('mockId2', false);
            });

            await waitFor(() => {
                expect(result.current.todos).toEqual([
                    { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
                    { text: 'mockText2', completed: true, id: 'mockId2', userId: 'mockUserId1' },
                ]);
            });
        });
    });
});
