import db from "../database/database";
import { capitalizeFirstLetter } from "../util/string_manipulation";

const getTags = async () => {
  const dbResponse = await db("tags").select("name", "id");
  if (dbResponse.length > 0) {
    dbResponse.map((tag) => {
      tag.name = capitalizeFirstLetter(tag.name);
    });
  }
  return dbResponse;
};

export { getTags };
