import { RequestHandler } from "express";
import db from "../database/database";

// Route: /blogs?lang= or /blogs?lang=&match=
const getBlogs: RequestHandler = async (request, response) => {
  try {
    const language: string | null =
      String(request.query.lang).toUpperCase() || null;

    const match: string | null = String(request.query.match) || null;

    if (language == null)
      return response.status(400).json({ error: "Bad Request" });

    if (language !== "EN" && language !== "ES") {
      return response.status(400).json({ error: "Bad Request" });
    }

    if (match != null) {
      const dbQuery = await db("blog_tags")
        .join("blogs", "blog_tags.blog_id", "blogs.id")
        .where("blogs.language", "=", language)
        .whereLike("blogs.title", db.raw("? ESCAPE '\\'", [`%${match}%`]));

      return response.status(200).json(dbQuery);
    }

    const dbResponse = await db("blog_tags")
      .join("blogs", "blog_tags.blog_id", "blogs.id")
      .where("blogs.language", "=", language);

    return response.status(200).json(dbResponse);
  } catch (error) {
    console.error("!!! Error getBlogs :\n", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

// Route: /blogs/tag?lang=
const getBlogsByTag: RequestHandler = async (request, response) => {
  try {
    const language: string | null =
      String(request.query.lang).toUpperCase() || null;

    const tag: string | null = String(request.params.tag).toUpperCase() || null;

    if (language == null || tag === null)
      return response.status(400).json({ error: "Bad Request" });

    if (language !== "EN" && language !== "ES") {
      return response.status(400).json({ error: "Bad Request" });
    }

    const dbResponse = await db("blog_tags")
      .join("blogs", "blog_tags.blog_id", "blogs.id")
      .join("tags", "blog_tags.tag_id", "tags.id")
      .where("blogs.language", "=", language)
      .andWhere("tags.name", "=", tag);

    return response.status(200).json(dbResponse);
  } catch (error) {
    console.error("!!! Error getBlogsByTag :\n", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { getBlogs, getBlogsByTag };
