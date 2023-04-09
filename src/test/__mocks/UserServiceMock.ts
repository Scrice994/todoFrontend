import { IUserService } from "../../common/interfaces/IUserService";

export class UserServiceMock implements IUserService{
    getUser = jest.fn();
    postValues = jest.fn()
}