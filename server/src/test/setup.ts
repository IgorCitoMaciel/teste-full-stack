import { UserRepositoryMock } from "./mocks/UserRepositoryMock";

export const userRepositoryMock = new UserRepositoryMock();

beforeEach(() => {
  userRepositoryMock.clear();
});
