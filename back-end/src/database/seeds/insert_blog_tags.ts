import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("blog_tags").del();
  await knex("blog_translations").del();
  await knex("tags").del();
  await knex("blogs").del();

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
        image_path: "../image",
        url: "www.google.com",
      },
      {
        image_path: "../image2",
        url: "www.hello.com",
      },
      {
        image_path: "../image2",
        url: "www.hola2.com",
      },
    ])
    .returning("id");

  let blog_tags = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[0].id };
  });

  let blog_tags2 = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[1].id };
  });

  let blog_tag3 = { tag_id: tags[0].id, blog_id: blogs[2].id };

  await knex("blog_tags").insert(blog_tags);
  await knex("blog_tags").insert(blog_tags2);
  await knex("blog_tags").insert(blog_tag3);

  let blogs_translations_es = {
    blog_id: blogs[0].id,
    language: "ES",
    title: "Esto es una Prueba",
    description: "Hola esto es una gran prueba",
  };

  let blogs_translations_en = {
    blog_id: blogs[1].id,
    language: "EN",
    title: "This a Test",
    description: "Hello this a Test",
  };

  let blogs_translations_es2 = {
    blog_id: blogs[2].id,
    language: "ES",
    title: "Esta es otra prueba mas",
    description: "Otras prueba masssssss",
  };

  await knex("blog_translations").insert(blogs_translations_es);
  await knex("blog_translations").insert(blogs_translations_en);
  await knex("blog_translations").insert(blogs_translations_es2);
}
