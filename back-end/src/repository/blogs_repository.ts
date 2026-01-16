import db from "../database/database";

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
    response.map(async (row) => ({
      ...row,
      tags: await getTagsByBlogsId(row.id),
    })),
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
    response.map(async (row) => ({
      ...row,
      tags: await getTagsByBlogsId(row.id),
    })),
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
    response.map(async (row) => ({
      ...row,
      tags: await getTagsByBlogsId(row.id),
    })),
  );
  return blogWithTags;
};

const getTagsByBlogsId = async (id: number) => {
  return await db("blog_tags")
    .select("tags.name")
    .join("tags", "tags.id", "blog_tags.tag_id")
    .where("blog_tags.blog_id", "=", id);
};

export { getBlogsByLang, getBlogsByLangAndMatch, getBlogsByLangAndTag };
