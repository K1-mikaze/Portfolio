import { Router } from "express";
import * as TAGS from "../controller/tags_controller";

const tagsRouter = Router();

tagsRouter.get("/tags", TAGS.tags);

export default tagsRouter;
