import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("blog_tags", (table) => {
    table.integer("blog_id").notNullable();
    table.integer("tag_id").notNullable();
    table
      .foreign("blog_id")
      .references("id")
      .inTable("blogs")
      .onDelete("CASCADE"); // Deletes link if project is deleted

    table
      .foreign("tag_id")
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE"); // Deletes link if URL is deleted

    table.primary(["blog_id", "tag_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("blog_tags");
}
