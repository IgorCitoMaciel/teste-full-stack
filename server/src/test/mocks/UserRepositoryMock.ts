import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { IPaginatedResponse } from "../../domain/interfaces/IPaginatedResponse";

export class UserRepositoryMock implements IUserRepository {
  private users: User[] = [];
  private nextId: number = 1;

  async create(userData: User): Promise<User> {
    const user = User.create({
      name: userData.name,
      email: userData.email,
      address: userData.address,
      birthdate: userData.birthdate,
    });
    Object.assign(user, { id: this.nextId++ });
    this.users.push(user);
    return user;
  }

  async findById(id: number): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new Error("User not found");

    const currentUser = this.users[index];
    const mergedData = {
      name: userData.name || currentUser.name,
      email: userData.email || currentUser.email,
      address: userData.address ?? currentUser.address,
      birthdate: userData.birthdate ?? currentUser.birthdate,
    };

    const updatedUser = User.create(mergedData);
    Object.assign(updatedUser, {
      id: currentUser.id,
      created_at: currentUser.created_at,
    });

    this.users[index] = updatedUser;
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }

  async list(
    page: number = 1,
    limit: number = 30
  ): Promise<IPaginatedResponse<User>> {
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedUsers = this.users.slice(start, end);

    return {
      data: paginatedUsers,
      meta: {
        total: this.users.length,
        page,
        limit,
        totalPages: Math.ceil(this.users.length / limit),
      },
    };
  }

  clear(): void {
    this.users = [];
    this.nextId = 1;
  }
}
