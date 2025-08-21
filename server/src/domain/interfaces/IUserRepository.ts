import { User } from "../entities/User";
import { IPaginatedResponse } from "./IPaginatedResponse";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, userData: Partial<User>): Promise<User>;
  delete(id: number): Promise<void>;
  list(page?: number, limit?: number): Promise<IPaginatedResponse<User>>;
}
