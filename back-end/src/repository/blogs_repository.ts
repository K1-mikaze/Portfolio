import db from "../database/database";
import { capitalizeFirstLetter } from "../util/string_manipulation";

const getBlogsByLang = async (language: string) => {
  const response = await db("blogs")
    .select(
      "blogs.id",
      "blogs.url",
      "blogs.image_path",
      "blog_translations.title",
      "blog_translations.description",
    )
    .join("blog_translations", "blog_translations.blog_id", "blogs.id")
    .where("blog_translations.language", "=", language);

  const blogWithTags = await Promise.all(
    response.map(async (row) => {
      const searchTags = await getTagsByBlogsId(row.id);
      searchTags.map((tag) => (tag.name = capitalizeFirstLetter(tag.name)));
      return {
        ...row,

        tags: searchTags,
      };
    }),
  );

  return blogWithTags;
};

const getBlogsByLangAndMatch = async (language: string, match: string) => {
  const response = await db("blogs")
    .select(
      "blogs.id",
      "blogs.url",
      "blogs.image_path",
      "blog_translations.title",
      "blog_translations.description",
    )
    .join("blog_translations", "blog_translations.blog_id", "blogs.id")
    .where("blog_translations.language", "=", language)
    .whereLike(
      "blog_translations.title",
      db.raw("? ESCAPE '\\'", [`%${match}%`]),
    );

  const blogWithTags = await Promise.all(
    response.map(async (row) => {
      const searchTags = await getTagsByBlogsId(row.id);
      searchTags.map((tag) => (tag.name = capitalizeFirstLetter(tag.name)));
      return {
        ...row,

        tags: searchTags,
      };
    }),
  );
  return blogWithTags;
};

const getBlogsByLangAndTag = async (language: string, tag: string) => {
  const response = await db("blogs")
    .select(
      "blogs.id",
      "blogs.url",
      "blogs.image_path",
      "blog_translations.title",
      "blog_translations.description",
    )
    .join("blog_translations", "blog_translations.blog_id", "blogs.id")
    .join("blog_tags", "blog_tags.blog_id", "blogs.id")
    .join("tags", "tags.id", "blog_tags.tag_id")
    .where("blog_translations.language", "=", language)
    .andWhere("tags.name", "=", tag);

  const blogWithTags = await Promise.all(
    response.map(async (row) => {
      const searchTags = await getTagsByBlogsId(row.id);
      searchTags.map((tag) => (tag.name = capitalizeFirstLetter(tag.name)));
      return {
        ...row,

        tags: searchTags,
      };
    }),
  );
  return blogWithTags;
};

const getTagsByBlogsId = async (id: number) => {
  return await db("blog_tags")
    .select("tags.name", "tags.id")
    .join("tags", "tags.id", "blog_tags.tag_id")
    .where("blog_tags.blog_id", "=", id);
};

export { getBlogsByLang, getBlogsByLangAndMatch, getBlogsByLangAndTag };
