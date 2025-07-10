import { secureHeapUsed } from "crypto";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerui from "swagger-ui-express";

export const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Link Manager API",
            version: "1.0.0",
            description:
                "A modern backend API for managing personal or professional links — like Linktree.",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
export const swaggerDocs = swaggerui.serve;
export const swaggerDocsSetup = swaggerui.setup(swaggerSpec);
