import { CreateUserUseCase } from "../../../application/useCases/CreateUserUseCase";
import { UserRepositoryMock } from "../../mocks/UserRepositoryMock";
import { User } from "../../../domain/entities/User";
import {
  UserAlreadyExistsError,
  InvalidUserDataError,
} from "../../../shared/errors/domain-errors";

describe("CreateUserUseCase", () => {
  let userRepository: UserRepositoryMock;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("should create a new user successfully", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      address: "Test Address",
      birthdate: new Date("1990-01-01"),
    };

    const user = await createUserUseCase.execute(userData);

    expect(user).toBeDefined();
    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.address).toBe(userData.address);
    expect(user.birthdate).toEqual(userData.birthdate);
  });

  it("should not create a user with duplicate email", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toThrow(
      UserAlreadyExistsError
    );
  });

  it("should not create a user without required fields", async () => {
    const invalidUserData = {
      name: "Test User",
    };

    await expect(
      createUserUseCase.execute(invalidUserData as any)
    ).rejects.toThrow(InvalidUserDataError);
  });
});
