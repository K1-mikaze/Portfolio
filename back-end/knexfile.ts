import type { Knex } from "knex";
import environment from "./src/configuration/environment"; // Loads variables from .env file

const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: environment.DB_HOST || "127.0.0.1",
      port: Number(environment.DB_PORT) || 5432,
      user: environment.DB_USER,
      password: environment.DB_PASS,
      database: environment.DB_NAME,
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    debug: true, // logs SQL queries
  },

  production: {
    client: "pg",
    connection: environment.DATABASE_URL, // Often a single connection string
    migrations: {
      directory: "./src/database/migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};

export default config;
