import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("project_url", (table) => {
    table.integer("project_id").notNullable();
    table.integer("url_id").notNullable();

    table
      .foreign("project_id")
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE"); // Deletes link if project is deleted

    table
      .foreign("url_id")
      .references("id")
      .inTable("urls")
      .onDelete("CASCADE"); // Deletes link if URL is deleted

    table.primary(["project_id", "url_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("project_urls");
}
