import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import {
  UserAlreadyExistsError,
  InvalidUserDataError,
} from "../../shared/errors/domain-errors";

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(data: CreateUserDTO): Promise<User> {
    if (!data.email) {
      throw new InvalidUserDataError("Email is required");
    }

    if (!data.name) {
      throw new InvalidUserDataError("Name is required");
    }

    const userExists = await this.userRepository.findByEmail(data.email);

    if (userExists) {
      throw new UserAlreadyExistsError(data.email);
    }

    const user = User.create(data);
    return this.userRepository.create(user);
  }
}
