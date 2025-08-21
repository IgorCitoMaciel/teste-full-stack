import { Request, Response } from "express";
import { UserController } from "../../../infrastructure/http/controllers/UserController";
import { User } from "../../../domain/entities/User";
import {
  UserNotFoundError,
  UserAlreadyExistsError,
} from "../../../shared/errors/domain-errors";
import { UserRepositoryMock } from "../../mocks/UserRepositoryMock";

describe("UserController", () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Response;
  let responseObject: any = {};
  let userRepositoryMock: UserRepositoryMock;

  beforeEach(() => {
    userRepositoryMock = new UserRepositoryMock();
    userController = new UserController(userRepositoryMock);
    responseObject = {};

    const responseMethods = {
      json: jest.fn().mockImplementation((data) => {
        responseObject = data;
        return mockResponse;
      }),
      send: jest.fn().mockReturnThis(),
    };

    mockResponse = {
      status: jest.fn().mockImplementation(() => responseMethods),
      ...responseMethods,
    } as unknown as Response;
  });

  describe("create", () => {
    it("should create user successfully", async () => {
      mockRequest = {
        body: {
          name: "Test User",
          email: "test@example.com",
        },
      };

      await userController
        .create(mockRequest as Request, mockResponse)
        .catch((error) => {
          console.error("Test failed:", error);
          throw error;
        });

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toHaveProperty("name", "Test User");
      expect(responseObject).toHaveProperty("email", "test@example.com");
    });

    it("should handle duplicate email error", async () => {
      mockRequest = {
        body: {
          name: "Test User",
          email: "existing@example.com",
        },
      };

      await userController.create(mockRequest as Request, mockResponse);

      try {
        await userController.create(mockRequest as Request, mockResponse);
      } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
          mockResponse.status(400).json({ error: error.message });
        } else {
          throw error;
        }
      }

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toHaveProperty("error");
    });
  });

  describe("findById", () => {
    it("should find user by id", async () => {
      const createResponse = await userController.create(
        { body: { name: "Test User", email: "test@example.com" } } as Request,
        mockResponse
      );

      const userId = responseObject.id;

      mockRequest = {
        params: { id: userId.toString() },
      };

      await userController
        .findById(mockRequest as Request, mockResponse)
        .catch((error) => {
          console.error("Test failed:", error);
          throw error;
        });

      expect(responseObject).toHaveProperty("id", userId);
      expect(responseObject).toHaveProperty("name", "Test User");
    });

    it("should return 404 when user not found", async () => {
      mockRequest = {
        params: { id: "999" },
      };

      try {
        await userController.findById(mockRequest as Request, mockResponse);
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          mockResponse.status(404).json({ error: error.message });
        } else {
          throw error;
        }
      }

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty("error");
    });
  });

  describe("list", () => {
    it("should list all users with pagination", async () => {
      await userController.create(
        { body: { name: "User 1", email: "user1@example.com" } } as Request,
        mockResponse
      );

      await userController.create(
        { body: { name: "User 2", email: "user2@example.com" } } as Request,
        mockResponse
      );

      mockRequest = {
        query: {},
      };

      await userController.list(mockRequest as Request, mockResponse);

      expect(responseObject.data).toBeDefined();
      expect(Array.isArray(responseObject.data)).toBeTruthy();
      expect(responseObject.meta).toBeDefined();
      expect(responseObject.meta.page).toBe(1);
      expect(responseObject.meta.limit).toBe(30);
    });

    it("should handle invalid limit parameter", async () => {
      mockRequest = {
        query: {
          limit: "101",
        },
      };

      await userController.list(mockRequest as Request, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({
        status: "error",
        message: "Limit must be between 1 and 100",
      });
    });
  });

  describe("delete", () => {
    it("should delete user successfully", async () => {
      await userController.create(
        { body: { name: "Test User", email: "test@example.com" } } as Request,
        mockResponse
      );

      const userId = responseObject.id;

      mockRequest = {
        params: { id: userId.toString() },
      };

      await userController
        .delete(mockRequest as Request, mockResponse)
        .catch((error) => {
          console.error("Test failed:", error);
          throw error;
        });

      expect(mockResponse.status).toHaveBeenCalledWith(204);
    });

    it("should return 404 when trying to delete non-existent user", async () => {
      mockRequest = {
        params: { id: "999" },
      };

      try {
        await userController.delete(mockRequest as Request, mockResponse);
      } catch (error) {
        if (error instanceof UserNotFoundError) {
          mockResponse.status(404).json({ error: error.message });
        } else {
          throw error;
        }
      }

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toHaveProperty("error");
    });
  });
});
