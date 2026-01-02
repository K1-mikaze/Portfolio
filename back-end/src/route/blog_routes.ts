import { Router } from "express";
import * as BLOG from "../controller/blogs_controller";

const router = Router();

router.get("/blogs", BLOG.getBlogs);

export default router;
