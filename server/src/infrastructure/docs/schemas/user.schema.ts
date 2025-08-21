export const userSchema = {
  type: "object",
  required: ["name", "email"],
  properties: {
    id: {
      type: "integer",
      format: "int64",
      description: "ID auto-gerado do usuário",
      example: 1003,
    },
    name: {
      type: "string",
      description: "Nome do usuário",
      example: "teste 2",
    },
    email: {
      type: "string",
      description: "Email do usuário",
      example: "teste@teste.com",
    },
    address: {
      type: "string",
      description: "Endereço do usuário",
      example: "rua teste",
    },
    birthdate: {
      type: "string",
      format: "date",
      description: "Data de nascimento do usuário",
      example: "2025-08-21",
    },
    created_at: {
      type: "string",
      format: "date-time",
      description: "Data de criação do registro",
      example: "2025-08-21T18:56:36.000Z",
    },
  },
};
