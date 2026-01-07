import { RequestHandler } from "express";
import db from "../database/database";

function capitalizeFirstLetter(val: String) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// Route: /tags
const getTags: RequestHandler = async (request, response) => {
  try {
    const dbResponse = await db("tags").select("name");
    if (dbResponse.length > 0) {
      dbResponse.map((tag) => {
        tag.name = capitalizeFirstLetter(tag.name.toLowerCase());
      });
    }

    return response.status(200).json(dbResponse);
  } catch (error) {
    console.error("!!! Error getBlogs :\n", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};

export { getTags };
