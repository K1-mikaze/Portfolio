import dotenv from "dotenv";

dotenv.configDotenv();

export default {
  API: process.env.API_PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  MODE: process.env.ENV_MODE || "development",
  DATABASE_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
};
