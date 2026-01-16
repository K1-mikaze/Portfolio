import { RequestHandler } from "express";
import {
  getBlogsByLang,
  getBlogsByLangAndMatch,
  getBlogsByLangAndTag,
} from "../repository/blogs_repository";

// Route: /blogs?lang= or /blogs?lang=&match=
const getBlogs: RequestHandler = async (request, response) => {
  try {
    const language: string | null = request.query.lang
      ? String(request.query.lang).toUpperCase()
      : null;

    const match: string | null = request.query.match
      ? String(request.query.match)
      : null;

    const tag: string | null = request.query.tag
      ? String(request.query.tag).toUpperCase()
      : null;

    if (language == null)
      return response.status(400).json({ error: "Bad Request" });

    if (language !== "EN" && language !== "ES") {
      return response.status(400).json({ error: "Bad Request" });
    }

    if (match != null) {
      return response
        .status(200)
        .json(await getBlogsByLangAndMatch(language, match));
    }

    if (tag != null) {
      return response
        .status(200)
        .json(await getBlogsByLangAndTag(language, tag));
    }

    return response.status(200).json(await getBlogsByLang(language));
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

    // const dbResponse = await db("blog_tags")
    //   .join("blogs", "blog_tags.blog_id", "blogs.id")
    //   .join("tags", "blog_tags.tag_id", "tags.id")
    //   .where("blogs.language", "=", language)
    //   .andWhere("tags.name", "=", tag);
    //
    // return response.status(200).json(dbResponse);
  } catch (error) {
    console.error("!!! Error getBlogsByTag :\n", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { getBlogs, getBlogsByTag };
