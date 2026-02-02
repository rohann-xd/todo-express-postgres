const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "Todo API with Express, PostgreSQL and Prisma",
    },
    servers: [{ url: "/" }],
  },

  apis: [path.join(__dirname, "../routes/*.routes.js")],
});

module.exports = swaggerSpec;
