import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/useCases/CreateUserUseCase";
import { UpdateUserUseCase } from "../../../application/useCases/UpdateUserUseCase";
import { UserRepository } from "../../database/repositories/UserRepository";
import {
  UserNotFoundError,
  UserAlreadyExistsError,
} from "../../../shared/errors/domain-errors";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class UserController {
  private createUserUseCase: CreateUserUseCase;
  private updateUserUseCase: UpdateUserUseCase;
  private userRepository: IUserRepository;

  constructor(userRepository?: IUserRepository) {
    this.userRepository = userRepository || new UserRepository();
    this.createUserUseCase = new CreateUserUseCase(this.userRepository);
    this.updateUserUseCase = new UpdateUserUseCase(this.userRepository);
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.createUserUseCase.execute(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(400).json({ error: error.message });
      }
      throw error;
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 30;

      if (page < 1) {
        return res.status(400).json({
          status: "error",
          message: "Page must be greater than 0",
        });
      }

      if (limit < 1 || limit > 100) {
        return res.status(400).json({
          status: "error",
          message: "Limit must be between 1 and 100",
        });
      }

      const users = await this.userRepository.list(page, limit);
      return res.json(users);
    } catch (error) {
      throw error;
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userRepository.findById(Number(req.params.id));

      if (!user) {
        return res
          .status(404)
          .json({ error: `User with id ${req.params.id} not found` });
      }

      return res.json(user);
    } catch (error) {
      throw error;
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user = await this.updateUserUseCase.execute(id, req.body);
      return res.json(user);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        return res.status(404).json({ error: error.message });
      }
      throw error;
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const user = await this.userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: `User with id ${id} not found` });
      }

      await this.userRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      throw error;
    }
  }
}
