import { Router } from "express";
import { projects } from "../controller/projects_controller";

const projectRouter = Router();
projectRouter.get("/projects", projects);

export default projectRouter;
