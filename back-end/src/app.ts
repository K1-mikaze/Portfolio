import express from "express";
import { getBlogs } from "./controller/blogs_controller";
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
app.use(getBlogs);

export default app;
