import { UserService } from '../../common/services/UserService';
import { HttpClientMock } from '../__mocks/HttpClientMock';
import { LocalStorageHandler } from '../../common/services/LocalStorageHandler';

describe('UserService', () => {
    const httpClient = new HttpClientMock();
    const tokenHandler = new LocalStorageHandler('test')
    const service = new UserService( httpClient, 'http://localhost:3005', tokenHandler);

    afterEach(() => {
        tokenHandler.removeToken()
    })

    describe('getUser()', () => {
            it("should return the user", async () => {
                httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                    response: {
                        user: {
                            username: 'testUsername',
                            password: 'testPassword123',
                            salt: 'mockSalt',
                            id: 'mockId',
                        },
                        token: 'mockToken',
                        expireIn: 100,
                    }
                })
            );

            const result = await service.getUser('/user/findUser')

            expect(result).toEqual({
                user: {
                    username: 'testUsername',
                    password: 'testPassword123',
                    salt: 'mockSalt',
                    id: 'mockId',
                },
                token: 'mockToken',
                expireIn: 100,
            })
        })
    });

    describe("postValues()", () => {
        it("should return status True and set token into localStorage when try to signup", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({
                    user: {
                        username: 'testUsername',
                        password: 'testPassword123',
                        salt: 'mockSalt',
                        id: 'mockId',
                    },
                    token: 'mockToken',
                    expireIn: 100,
            }))

            const result = await service.postValues('mockvalues', '/user/signup')

            const findToken = new LocalStorageHandler('test').getToken()

            expect(findToken).toBe('mockToken')
            expect(result.status).toBe(true)
        })

        it("shoudl return status False and return message when something went wrong", async () => {
            httpClient.sendRequest.mockImplementationOnce(() => Promise.resolve({ message: 'mockError' }))    

            const result = await service.postValues('mockvalues', '/user/signup')

            const findToken = new LocalStorageHandler('test').getToken()

            expect(findToken).toBe(null)
            expect(result.status).toBe(false)
            expect(result.message).toBe('mockError')
        })
    })
});
