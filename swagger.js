const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const serverUrl = process.env.SERVER_URL || "http://localhost:3000/";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Top Treding Videos API",
      version: "1.0.1",
      description: "API to get top videos trending",
      contact: {
        name: "mtiendev",
        emal: "tiendk195@gmail.com",
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
