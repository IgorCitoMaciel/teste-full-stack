import { AppError } from "./AppError";

export class UserNotFoundError extends AppError {
  constructor(id?: number) {
    super(`User ${id ? `with id ${id}` : ""} not found`, 404);
  }
}

export class UserAlreadyExistsError extends AppError {
  constructor(email: string) {
    super(`User with email ${email} already exists`, 409);
  }
}

export class InvalidUserDataError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(`Database error: ${message}`, 500);
  }
}
