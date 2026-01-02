import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("blogs", (table) => {
    table.increments("id").primary();
    table.string("title", 150).notNullable();
    table.text("description").notNullable();
    table.text("image");
    table.text("url").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable();
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
  await knex.schema.dropTable("blogs");
}
