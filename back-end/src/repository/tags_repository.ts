import db from "../database/database";

function capitalizeFirstLetter(val: String) {
  return val.charAt(0).toUpperCase() + val.slice(1);
}
const getTags = async () => {
  const dbResponse = await db("tags").select("name");
  if (dbResponse.length > 0) {
    dbResponse.map((tag) => {
      tag.name = capitalizeFirstLetter(tag.name.toLowerCase());
    });
  }
  return dbResponse;
};

export { getTags };
