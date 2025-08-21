import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import {
  UserNotFoundError,
  UserAlreadyExistsError,
  InvalidUserDataError,
} from "../../shared/errors/domain-errors";

interface UpdateUserDTO {
  name?: string;
  email?: string;
  address?: string;
  birthdate?: Date;
}

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: number, data: UpdateUserDTO): Promise<User> {
    if (Object.keys(data).length === 0) {
      throw new InvalidUserDataError("No data provided for update");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(id);
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new UserAlreadyExistsError(data.email);
      }
    }

    return this.userRepository.update(id, data);
  }
}
