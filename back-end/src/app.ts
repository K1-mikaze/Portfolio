import express from "express";
import blogRouter from "./route/blog_routes";
import tagRouter from "./route/tag_routes";
import projectRouter from "./route/projects_routes";
import { speedLimiter, requestLimiter } from "./configuration/limiter";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(speedLimiter);
app.use(requestLimiter);
app.use(blogRouter);
app.use(tagRouter);
app.use(projectRouter);

export default app;
