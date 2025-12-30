export default {
  MODE: process.env.ENV_MODE || "development",
  API: process.env.API_PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  DATABASE_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
};
