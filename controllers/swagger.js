const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const serverUrl = process.env.SERVER_URL || "http://localhost:3000/";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documents for developer",
      version: "1.0.2",
      description:
        "provide completely free apis for programers-developers to implement",
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
