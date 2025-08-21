import { userSchema } from "./schemas/user.schema";
import { userPaths } from "./paths/user.paths";

export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Usuários",
    description: "API para gerenciamento de usuários",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/api",
      description: "API Server",
    },
  ],
  components: {
    schemas: {
      User: userSchema,
    },
  },
  paths: userPaths,
};
