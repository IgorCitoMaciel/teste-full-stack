import { Request, Response, NextFunction } from "express";

export interface SwaggerDocument {
  swagger?: string;
  openapi?: string;
  info: {
    title: string;
    version: string;
    description?: string;
  };
  paths: Record<string, any>;
}

export interface SwaggerUiOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCssUrl?: string;
}

export type SwaggerRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;
