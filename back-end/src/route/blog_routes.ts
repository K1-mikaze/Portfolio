import { Router } from "express";
import * as BLOGS from "../controller/blogs_controller";

const blogRouter = Router({ mergeParams: true });

blogRouter.get("/blogs", BLOGS.getBlogs);
blogRouter.get("/blogs/:tag", BLOGS.getBlogsByTag);

export default blogRouter;
