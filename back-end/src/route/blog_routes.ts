import { Router } from "express";
import * as BLOGS from "../controller/blogs_controller";

const blogRouter = Router({ mergeParams: true });

blogRouter.get("/blogs", BLOGS.getBlogs);

export default blogRouter;
