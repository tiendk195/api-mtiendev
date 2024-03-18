const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const serverUrl = process.env.SERVER_URL || "http://localhost:3000/";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MTienDev-APIs",
      version: "1.0.3",
      description: "API documents for developer",
      contact: {
        name: "mtiendev",
        email: "tiendk195@gmail.com",
      },
    },
    servers: [
      {
        url: serverUrl,
      },
    ],
  },
  apis: ["server.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
