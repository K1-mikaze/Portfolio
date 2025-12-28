import dotenv from "dotenv";

dotenv.configDotenv();

export default {
  API: process.env.API_PORT || 3000,
};
