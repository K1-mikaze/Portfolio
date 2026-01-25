import db from "../database/database";
import { capitalizeFirstLetter } from "../util/string_manipulation";

const getProjectsByLang = async (language: string) => {
  const response = await db("projects")
    .select(
      "projects.id",
      "projects.website",
      "projects.repository",
      "project_translations.title",
      "project_translations.description",
    )
    .join(
      "project_translations",
      "project_translations.project_id",
      "projects.id",
    )
    .where("project_translations.language", "=", language);

  const projectWithTags = await Promise.all(
    response.map(async (row) => {
      const searchTags = await getTagsByProjectsId(row.id);
      searchTags.map((tag) => (tag.name = capitalizeFirstLetter(tag.name)));
      return {
        ...row,

        tags: searchTags,
      };
    }),
  );

  return projectWithTags;
};

const getTagsByProjectsId = async (id: number) => {
  return await db("project_tags")
    .select("tags.name", "tags.id")
    .join("tags", "tags.id", "project_tags.tag_id")
    .where("project_tags.project_id", "=", id);
};

export { getProjectsByLang };
