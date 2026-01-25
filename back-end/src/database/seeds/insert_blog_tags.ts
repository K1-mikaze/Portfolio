import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("blog_tags").del();
  await knex("blog_translations").del();
  await knex("blogs").del();

  const tags = await knex("tags")
    .where("name", "in", [
      "LINUX",
      "NIXOS",
      "NIX",
      "JAVA",
      "JAVASCRIPT",
      "TYPESCRIPT",
      "RUST",
      "FLUTTER",
    ])
    .select("id", "name");

  const blogs = await knex("blogs")
    .insert([
      {
        image_path: "linux-admin.webp",
        url: "blog/linux-administration-guide",
      },
      {
        image_path: "react-dev.webp",
        url: "blog/react-web-development",
      },
      {
        image_path: "rust-performance.webp",
        url: "blog/rust-performance-tips",
      },
    ])
    .returning("id");

  let blog_tags = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[0].id };
  });

  let blog_tags2 = tags.map((tag) => {
    return { tag_id: tag.id, blog_id: blogs[1].id };
  });

  const linuxRustTags = await knex("tags")
    .where("name", "in", ["RUST", "LINUX", "DOCKER"])
    .select("id");

  let blog_tags3 = linuxRustTags.map((tag) => ({
    tag_id: tag.id,
    blog_id: blogs[2].id,
  }));

  await knex("blog_tags").insert(blog_tags);
  await knex("blog_tags").insert(blog_tags2);
  await knex("blog_tags").insert(blog_tags3);

  let blogs_translations_es = {
    blog_id: blogs[0].id,
    language: "ES",
    title: "Guía de Administración de Linux",
    description:
      "Una guía completa sobre administración de sistemas Linux, incluyendo configuración de servidores, gestión de usuarios y optimización de rendimiento.",
  };

  let blogs_translations_en = {
    blog_id: blogs[0].id,
    language: "EN",
    title: "Linux Administration Guide",
    description:
      "A comprehensive guide to Linux system administration, including server setup, user management, and performance optimization.",
  };

  let blogs_translations_es2 = {
    blog_id: blogs[1].id,
    language: "ES",
    title: "Desarrollo Web con React",
    description:
      "Aprende a construir aplicaciones web modernas con React, incluyendo hooks, estado global y mejores prácticas.",
  };

  await knex("blog_translations").insert(blogs_translations_es);
  await knex("blog_translations").insert(blogs_translations_en);
  await knex("blog_translations").insert(blogs_translations_es2);

  await knex("blog_translations").insert({
    blog_id: blogs[2].id,
    language: "EN",
    title: "Rust Performance Tips",
    description:
      "Advanced techniques for optimizing Rust applications, including memory management and concurrency patterns.",
  });

  await knex("blog_translations").insert({
    blog_id: blogs[2].id,
    language: "ES",
    title: "Consejos de Rendimiento en Rust",
    description:
      "Técnicas avanzadas para optimizar aplicaciones Rust, incluyendo gestión de memoria y patrones de concurrencia.",
  });
}
