import { IHttpClient } from "../../common/interfaces/IHttpClient";


export class HttpClientMock implements IHttpClient {
    public sendRequest = jest.fn(async () => {
        return {}
    })
}