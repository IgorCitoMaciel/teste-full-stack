export const userPaths = {
  "/users/{id}": {
    put: {
      summary: "Atualizar usuário",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do usuário",
          example: 1003,
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  example: "teste 2",
                },
                email: {
                  type: "string",
                  example: "teste@teste.com",
                },
                address: {
                  type: "string",
                  example: "rua teste",
                },
                birthdate: {
                  type: "string",
                  format: "date",
                  example: "2025-08-21",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Usuário atualizado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  message: {
                    type: "string",
                    example: "User with id 1003 not found",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Dados inválidos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  message: {
                    type: "string",
                    example: "Invalid data provided",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Buscar usuário por ID",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do usuário",
        },
      ],
      responses: {
        200: {
          description: "Usuário encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        404: {
          description: "Usuário não encontrado",
        },
      },
    },
    delete: {
      summary: "Deletar usuário",
      tags: ["Users"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "integer",
          },
          description: "ID do usuário",
        },
      ],
      responses: {
        204: {
          description: "Usuário deletado",
        },
        404: {
          description: "Usuário não encontrado",
        },
      },
    },
  },
  "/users": {
    post: {
      summary: "Criar um novo usuário",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["name", "email"],
              properties: {
                name: {
                  type: "string",
                  example: "teste 2",
                },
                email: {
                  type: "string",
                  example: "teste@teste.com",
                },
                address: {
                  type: "string",
                  example: "rua teste",
                },
                birthdate: {
                  type: "string",
                  format: "date",
                  example: "2025-08-21",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Usuário criado com sucesso",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
        },
        400: {
          description: "Dados inválidos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  status: {
                    type: "string",
                    example: "error",
                  },
                  message: {
                    type: "string",
                    example: "Email is required",
                  },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Listar todos os usuários",
      tags: ["Users"],
      parameters: [
        {
          in: "query",
          name: "page",
          schema: {
            type: "integer",
            minimum: 1,
          },
          description: "Número da página (padrão 1)",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
            minimum: 1,
            maximum: 100,
          },
          description: "Quantidade de itens por página (padrão 30)",
        },
      ],
      responses: {
        200: {
          description: "Lista paginada de usuários",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      $ref: "#/components/schemas/User",
                    },
                  },
                  meta: {
                    type: "object",
                    properties: {
                      total: {
                        type: "integer",
                        description: "Total de registros",
                      },
                      page: {
                        type: "integer",
                        description: "Página atual",
                      },
                      limit: {
                        type: "integer",
                        description: "Itens por página",
                      },
                      totalPages: {
                        type: "integer",
                        description: "Total de páginas",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
