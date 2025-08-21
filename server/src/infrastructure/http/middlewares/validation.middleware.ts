import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

type RequestPart = "body" | "query" | "params";

export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false,
  requestParts: RequestPart[] = ["body"]
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const part of requestParts) {
        const value = req[part];
        const dtoObj = plainToInstance(type, value);
        const errors = await validate(dtoObj, { skipMissingProperties });

        if (errors.length > 0) {
          const validationErrors = errors.reduce((acc, err) => {
            if (err.constraints) {
              return [...acc, ...Object.values(err.constraints)];
            }
            return acc;
          }, [] as string[]);

          return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: validationErrors,
          });
        }

        req[part] = dtoObj;
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: ["Invalid data format"],
      });
    }
  };
}
