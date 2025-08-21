import { UpdateUserUseCase } from "../../../application/useCases/UpdateUserUseCase";
import { UserRepositoryMock } from "../../mocks/UserRepositoryMock";
import { User } from "../../../domain/entities/User";
import { UserNotFoundError } from "../../../shared/errors/domain-errors";

describe("UpdateUserUseCase", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepositoryMock: UserRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock();
    updateUserUseCase = new UpdateUserUseCase(userRepositoryMock);
  });

  it("should update user successfully", async () => {
    const user = await userRepositoryMock.create(
      User.create({
        name: "Test User",
        email: "test@example.com",
      })
    );

    const updatedUser = await updateUserUseCase.execute(user.id!, {
      name: "Updated Name",
      address: "New Address",
    });

    expect(updatedUser.name).toBe("Updated Name");
    expect(updatedUser.email).toBe("test@example.com");
    expect(updatedUser.address).toBe("New Address");
  });

  it("should throw UserNotFoundError when user does not exist", async () => {
    await expect(
      updateUserUseCase.execute(999, {
        name: "Updated Name",
      })
    ).rejects.toThrow(UserNotFoundError);
  });

  it("should update only provided fields", async () => {
    const user = await userRepositoryMock.create(
      User.create({
        name: "Test User",
        email: "test@example.com",
        address: "Original Address",
      })
    );

    const updatedUser = await updateUserUseCase.execute(user.id!, {
      name: "Updated Name",
    });

    expect(updatedUser.name).toBe("Updated Name");
    expect(updatedUser.email).toBe("test@example.com");
    expect(updatedUser.address).toBe("Original Address");
  });
});
