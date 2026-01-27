import express from "express";
import blogRouter from "./route/blog_routes";
import tagRouter from "./route/tag_routes";
import projectRouter from "./route/projects_routes";
import { speedLimiter, requestLimiter } from "./configuration/limiter";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(
  cors({
    origin: [
      "https://portfoliofrontend-dkvq0mq5j-k1s-projects-ff94b943.vercel.app/",
    ],
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(speedLimiter);
app.use(requestLimiter);
app.use("/api/v1", blogRouter);
app.use("/api/v1", tagRouter);
app.use("/api/v1", projectRouter);

export default app;
