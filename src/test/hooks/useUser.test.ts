import { renderHook } from '@testing-library/react';
import useUser from '../../hooks/useUser';

jest.mock("react-router-dom", () => ({
    useNavigate: () => jest.fn(),
    useLoaderData: () => ({
        todos: [
        { text: 'mockText1', completed: false, id: 'mockId1', userId: 'mockUserId1' },
        { text: 'mockText2', completed: false, id: 'mockId2', userId: 'mockUserId1' },
       ],
        user: 'TestUser'
    })
}));

describe("useUser", () => {

    it("Should display username when found", () => {
        const { result } = renderHook(() =>
            useUser()
        );
        
        expect(result.current.user).toEqual('TestUser')
    })
})

