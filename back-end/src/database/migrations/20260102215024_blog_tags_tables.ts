import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("blogs", (table) => {
    table.increments("id").primary();
    table.text("image_path").notNullable();
    table.text("url").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("blog_translations", (table) => {
    table.increments("id").primary();
    table.integer("blog_id").notNullable();
    table.string("title", 150).notNullable();
    table.text("description").notNullable();
    table.enum("language", ["EN", "ES"]).notNullable();

    table.foreign("blog_id").references("id").inTable("blogs");
  });

  await knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable().unique();
  });

  await knex.schema.createTable("blog_tags", (table) => {
    table.integer("tag_id").notNullable();
    table.integer("blog_id").notNullable();

    table.foreign("tag_id").references("id").inTable("tags");

    table.foreign("blog_id").references("id").inTable("blogs");

    table.primary(["tag_id", "blog_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("blog_tags");
  await knex.schema.dropTable("tags");
  await knex.schema.dropTable("blogs_translations");
  await knex.schema.dropTable("blogs");
}
