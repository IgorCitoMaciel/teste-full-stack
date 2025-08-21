import { Express, RequestHandler } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger";

interface SwaggerUiOptions {
  explorer?: boolean;
  customCssUrl?: string;
}

export const setupSwagger = (app: Express): void => {
  const options: SwaggerUiOptions = {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-material.css",
  };

  const swaggerHandler = swaggerUi.serve as unknown as RequestHandler[];
  const swaggerSetup = swaggerUi.setup(
    swaggerSpec,
    options
  ) as unknown as RequestHandler;

  app.use("/api-docs", swaggerHandler, swaggerSetup);
};
