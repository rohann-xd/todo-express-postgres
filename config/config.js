// config/config.js
require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 5000,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  POSTGRES_URI: process.env.POSTGRES_URI,
  DATABASE_URL: process.env.DATABASE_URL,

  // JWT
  JWT_PRIVATE_KEY_PATH: process.env.JWT_PRIVATE_KEY_PATH,
  JWT_PUBLIC_KEY_PATH: process.env.JWT_PUBLIC_KEY_PATH,
  JWT_ACCESS_TOKEN_EXPIRE: process.env.JWT_ACCESS_TOKEN_EXPIRE,
  JWT_REFRESH_TOKEN_EXPIRE: process.env.JWT_REFRESH_TOKEN_EXPIRE,

  // ENV
  NODE_ENV: process.env.NODE_ENV || "development",
};
