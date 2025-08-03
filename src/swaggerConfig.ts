import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    host: "topical-horribly-bulldog.ngrok-free.app",
    basePath: "/",
    info: {
      title: "Book API",
      version: "1.0.0",
      description: "API documentation for managing books",
    },
    servers: [
      {
        url: "https://topical-horribly-bulldog.ngrok-free.app",
        description: "Main server",
      },
      {
        url: "http://localhost:2000",
        description: "Local server",
      },
    ],
    tags: [
      {
        name: "Main",
        description: "Main route of the API",
      },
      {
        name: "Books",
        description: "API endpoints for managing books",
      },
      {
        name: "Auth",
        description: "Operations related to user authenticatio",
      },
      {
        name: "Users",
        description: "API endpoints for managing Users",
      },
      {
        name: "Authors",
        description: "API endpoints for managing authors",
      }
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67c25ec40d1d6d4297e07bde" },
            title: { type: "string", example: "The Great Gatsby" },
            author: { type: "string", example: "67c25dbb996cc1fdc2c08bd3" },
            description: { type: "string", example: "Excepteur excepteur aliquip eu velit ad et." },
            price: { type: "integer", example: 150 },
            cover: {
              type: "string",
              enum: ["soft cover", "hard cover"],
              example: "soft cover",
            },
          },
        },
        NewBook: {
          type: "object",
          properties: {
            title: { type: "string", example: "The Great Gatsby" },
            author: { type: "string", example: "67c25dbb996cc1fdc2c08bd3" },
            description: { type: "string", example: "Excepteur excepteur aliquip eu velit ad et." },
            price: { type: "integer", example: 150 },
            cover: {
              type: "string",
              enum: ["soft cover", "hard cover"],
              example: "soft cover",
            },
          },
        },
        Author: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67c25dbb996cc1fdc2c08bd3" },
            firstName: { type: "string", example: "Sief" },
            lastName: { type: "string", example: "Ali" },
            nationality: { type: "string", example: "Egyptian" },
            image: { type: "string", example: "default.png" },
          },
        },
        NewAuthor: {
          type: "object",
          properties: {
            firstName: { type: "string", example: "Sief" },
            lastName: { type: "string", example: "Ali" },
            nationality: { type: "string", example: "Egyptian" },
            image: { type: "string", example: "default.png" },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67c8c3fad13227f77d6924f8" },
            username: { type: "string", pattern: "^[a-zA-Z0-9_]+$", example: "sief_x" },
            email: { type: "string", format: "email", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", example: "somename@example.com" },
            password: { type: "string", format: "password", example: "user password [user password will hashed]" },
            isAdmin: { type: "boolean", example: false }
          }
        },
        NewUser: {
          type: "object",
          properties: {
            username: { type: "string", pattern: "^[a-zA-Z0-9_]+$", example: "sief_x" },
            email: { type: "string", format: "email", pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", example: "somename@example.com" },
            password: { type: "string", format: "password", example: "user password [user password will hashed]" },
            isAdmin: { type: "boolean", example: false }
          }
        },
        LoginRequest: {
          type: "object",
          properties: {
            email: { type: "string", example: "johndoe@example.com" },
            password: { type: "string", example: "StrongPassword123!" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            token: { type: "string", example: "eyJhbGciOiJIUzI1NiIsIn..." },
            user: {
              type: "object",
              properties: {
                _id: { type: "string", example: "67c25ec40d1d6d4297e07bde" },
                name: { type: "string", example: "John Doe" },
                email: { type: "string", example: "johndoe@example.com" },
              },
            },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            _id: { type: "string", example: "67c25ec40d1d6d4297e07bde" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "johndoe@example.com" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export function setupSwagger(app: Express) {
  app.use("/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log(`Swagger Docs available at https://topical-horribly-bulldog.ngrok-free.app/api-docs`);
}
