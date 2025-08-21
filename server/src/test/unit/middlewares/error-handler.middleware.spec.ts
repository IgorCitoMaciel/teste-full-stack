import { Request, Response, NextFunction } from "express";
import { errorHandler } from "../../../infrastructure/http/middlewares/error-handler.middleware";
import { AppError } from "../../../shared/errors/AppError";

describe("Error Handler Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    // Silencia o console.error durante os testes
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaura o console.error após cada teste
    consoleErrorSpy.mockRestore();
  });

  it("should handle AppError correctly", () => {
    const appError = new AppError("Test error", 400);

    errorHandler(
      appError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Test error",
    });
  });

  it("should handle unknown errors as internal server error", () => {
    const error = new Error("Unknown error");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    // Verifica se o erro foi logado
    expect(consoleErrorSpy).toHaveBeenCalledWith(error);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      status: "error",
      message: "Internal server error",
    });
  });
});
