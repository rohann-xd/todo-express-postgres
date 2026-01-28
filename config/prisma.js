const { PrismaClient } = require("@prisma/client");
const { DATABASE_URL } = require("./config");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
});

module.exports = prisma;
