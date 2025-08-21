import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreateUserDTO } from "../../../application/dtos/CreateUserDTO";
import { UpdateUserDTO } from "../../../application/dtos/UpdateUserDTO";
import { ParamsDTO } from "../../../application/dtos/ParamsDTO";
import { PaginationDTO } from "../../../application/dtos/PaginationDTO";

const userRoutes = Router();
const userController = new UserController();

userRoutes.put(
  "/users/:id",
  validationMiddleware(ParamsDTO, false, ["params"]),
  validationMiddleware(UpdateUserDTO),
  (req, res) => userController.update(req, res)
);

userRoutes.post("/users", validationMiddleware(CreateUserDTO), (req, res) =>
  userController.create(req, res)
);

userRoutes.get(
  "/users",
  validationMiddleware(PaginationDTO, true, ["query"]),
  (req, res) => userController.list(req, res)
);

userRoutes.get(
  "/users/:id",
  validationMiddleware(ParamsDTO, false, ["params"]),
  (req, res) => userController.findById(req, res)
);

userRoutes.delete(
  "/users/:id",
  validationMiddleware(ParamsDTO, false, ["params"]),
  (req, res) => userController.delete(req, res)
);

export { userRoutes };
