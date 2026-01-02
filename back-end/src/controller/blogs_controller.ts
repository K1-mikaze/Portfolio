import { RequestHandler } from "express";
import db from "../database/database";

const getBlogs: RequestHandler = async (request, response) => {
  try {
    const blog_tags = await db("blog_tags").join(
      "blogs",
      "blog_tags.blog_id",
      "blogs.id",
    );
    return response.status(200).json(blog_tags);
  } catch (error) {
    console.error("!!! Error getBlogs :\n", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export { getBlogs };
