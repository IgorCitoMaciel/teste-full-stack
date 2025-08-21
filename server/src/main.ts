import "reflect-metadata";
import express from "express";
import cors from "cors";
import { userRoutes } from "./infrastructure/http/routes/userRoutes";
import * as dotenv from "dotenv";
import AppDataSource from "./infrastructure/database";
import { setupSwagger } from "./infrastructure/http/middlewares/swagger.middleware";
import { errorHandler } from "./infrastructure/http/middlewares/error-handler.middleware";
import { securityMiddleware } from "./infrastructure/http/middlewares/security.middleware";
import {
  corsOptions,
  jsonOptions,
  urlencodedOptions,
} from "./infrastructure/http/config/security";

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json(jsonOptions));
app.use(express.urlencoded(urlencodedOptions));
app.use(securityMiddleware);

if (process.env.NODE_ENV !== "production") {
  setupSwagger(app);
}

const port = process.env.PORT ? parseInt(process.env.PORT) : 3001;

AppDataSource.initialize()
  .then(async () => {
    console.log("Database running");

    try {
      await AppDataSource.runMigrations();
      console.log("Migrations executed successfully");
    } catch (err) {
      console.error("Error running migrations:", err);
      process.exit(1);
    }

    app.use("/api", userRoutes);
    app.use(errorHandler);

    app.use((req, res) => {
      res.status(404).json({
        status: "error",
        message: "Endpoint not found",
      });
    });

    app.listen(port, () => {
      console.log(`Server running on port = ${port}`);
      if (process.env.NODE_ENV !== "production") {
        console.log(
          `Swagger documentation available at http://localhost:${port}/api-docs`
        );
      }
    });
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
    process.exit(1);
  });
