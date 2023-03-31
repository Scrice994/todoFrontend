import { IHttpClient } from "../interfaces/IHttpClient";
import { Request } from "../interfaces/IHttpClient";

export class HttpClient implements IHttpClient {
  async sendRequest(url: string, request: Request): Promise<any> {
    return (await fetch(url, this._requestToFetch(request)))
      .json()
  }

  private _requestToFetch(request: Request): RequestInit {
    return {
      method: request.method,
      headers: request.headers,
      body: request.body,
    };
  }
}
