# API de Gerenciamento de Usuários

API RESTful desenvolvida com Node.js, Express, TypeScript e TypeORM para gerenciamento de usuários.

## 🚀 Funcionalidades

- ✅ CRUD completo de usuários
- ✅ Paginação na listagem
- ✅ Validação de dados
- ✅ Documentação Swagger
- ✅ Testes automatizados
- ✅ Tratamento de erros
- ✅ Migrations para banco de dados

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- MySQL
- Jest (Testes)
- Swagger (Documentação)

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MySQL
- Yarn ou NPM

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone [url-do-repositorio]
cd server
```

2. Instale as dependências:

```bash
yarn install
```

3. Configure as variáveis de ambiente:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=teste-db

# Server Configuration
PORT=3001

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

4. Execute as migrations:

```bash
yarn migration:run
```

5. Inicie o servidor:

```bash
yarn dev
```

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI em:

```
http://localhost:3001/api-docs
```

### Endpoints Principais

#### Usuários

- **POST /api/users** - Criar usuário

  ```typescript
  // Request body
  {
    "name": "string",     // obrigatório
    "email": "string",    // obrigatório
    "address": "string",  // opcional
    "birthdate": "Date"   // opcional
  }
  ```

- **GET /api/users** - Listar usuários (com paginação)

  ```
  /api/users?page=1&limit=30
  ```

  - page: número da página (default: 1)
  - limit: itens por página (default: 30, max: 100)

- **GET /api/users/:id** - Buscar usuário por ID
- **PUT /api/users/:id** - Atualizar usuário
- **DELETE /api/users/:id** - Deletar usuário

## 🧪 Testes

O projeto inclui testes unitários e de integração. Para executar os testes:

```bash
# Executar todos os testes
yarn test

# Executar testes com coverage
yarn test:cov

# Executar testes em modo watch
yarn test:watch
```

## 📁 Estrutura do Projeto

```
src/
├── application/        # Casos de uso da aplicação
├── domain/            # Entidades e interfaces
├── infrastructure/    # Implementações concretas
│   ├── database/     # Configuração e repositórios
│   ├── http/         # Controllers e rotas
│   └── middlewares/  # Middlewares Express
├── shared/           # Código compartilhado
└── test/            # Testes
    ├── unit/        # Testes unitários
    └── mocks/       # Mocks para testes
```

## 🔄 Scripts Disponíveis

- `yarn dev`: Inicia o servidor em modo desenvolvimento
- `yarn test`: Executa os testes
- `yarn test:cov`: Executa os testes com cobertura
- `yarn test:watch`: Executa os testes em modo watch
- `yarn migration:run`: Executa as migrations
- `yarn migration:revert`: Reverte a última migration
- `yarn docker-up`: Inicia os containers Docker
- `yarn docker-down`: Para os containers Docker

## 🐳 Docker

O projeto inclui configuração Docker para desenvolvimento. Para usar:

```bash
# Iniciar containers
yarn docker-up

# Parar containers
yarn docker-down
```

## 🔐 Segurança

- Validação de dados de entrada
- Proteção contra SQL Injection via TypeORM
- CORS configurado
- Tratamento de erros centralizado
