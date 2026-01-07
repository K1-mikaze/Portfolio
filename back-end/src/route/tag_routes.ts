import { Router } from "express";
import * as TAGS from "../controller/tags_controller";

const tagsRouter = Router({ mergeParams: true });

tagsRouter.get("/tags", TAGS.getTags);

export default tagsRouter;
