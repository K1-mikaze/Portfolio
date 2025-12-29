import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("blog_urls", (table) => {
    table.integer("blog_id").notNullable();
    table.integer("url_id").notNullable();
    table
      .foreign("blog_id")
      .references("id")
      .inTable("blogs")
      .onDelete("CASCADE"); // Deletes link if project is deleted

    table
      .foreign("url_id")
      .references("id")
      .inTable("urls")
      .onDelete("CASCADE"); // Deletes link if URL is deleted

    table.primary(["blog_id", "url_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("blog_urls");
}
