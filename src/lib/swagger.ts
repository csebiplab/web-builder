import swaggerJsdoc from "swagger-jsdoc";
import { OpenAPIV3 } from "openapi-types";
import path from "path";
import { envConfig } from "./envConfig";

const swaggerDefinition: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "WEB BUILDER",
    version: "1.0.0",
    description: "API documentation for web-builder website",
  },
  servers: [
    {
      url: envConfig.url,
    },
  ],
  paths: {},
};

const options = {
  swaggerDefinition,
  apis: [path.join(process.cwd(), "src", "app", "api", "**", "*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
