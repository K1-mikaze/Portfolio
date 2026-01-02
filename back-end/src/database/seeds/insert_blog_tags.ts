import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("tags").del();
  await knex("blogs").del();
  await knex("blog_tags").del();

  const tags = await knex("tags")
    .insert([
      { name: "Linux" },
      { name: "NixOS" },
      { name: "Nix" },
      { name: "Java" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "Rust" },
    ])
    .returning("id");

  const blogs = await knex("blogs")
    .insert([
      { title: "test", description: "This is a testt", url: "www.google.com" },
    ])
    .returning("id");

  let blog_tags = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[0].id };
  });

  await knex("blog_tags").insert(blog_tags);
}
