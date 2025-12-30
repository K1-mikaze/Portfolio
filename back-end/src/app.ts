import express from "express";
import urlRoutes from "./route/urls_routes";
import { speedLimiter, requestLimiter } from "./configuration/limiter";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(speedLimiter);
app.use(requestLimiter);
app.use(urlRoutes);

export default app;
