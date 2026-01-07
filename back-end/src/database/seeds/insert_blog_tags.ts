import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tags").del();
  await knex("blogs").del();
  await knex("blog_tags").del();

  const tags = await knex("tags")
    .insert([
      { name: "LINUX" },
      { name: "NIXOS" },
      { name: "NIX" },
      { name: "JAVA" },
      { name: "JAVASCRIPT" },
      { name: "TYPESCRIPT" },
      { name: "RUST" },
      { name: "FLUTTER" },
    ])
    .returning("id");

  const blogs = await knex("blogs")
    .insert([
      {
        title: "test",
        description: "This is a testt",
        url: "www.google.com",
        language: "EN",
      },
      {
        title: "Prueba",
        description: "Esta es una prueba",
        url: "www.google.com",
        language: "ES",
      },
    ])
    .returning("id");

  let blog_tags_english = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[0].id };
  });

  let blog_tags_spanish = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[1].id };
  });
  await knex("blog_tags").insert(blog_tags_english);
  await knex("blog_tags").insert(blog_tags_spanish);
}
