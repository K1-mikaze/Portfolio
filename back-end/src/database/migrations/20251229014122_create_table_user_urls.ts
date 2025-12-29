import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("user_urls", (table) => {
    table.integer("user_id").notNullable();
    table.integer("url_id").notNullable();

    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE"); // Deletes link if project is deleted

    table
      .foreign("url_id")
      .references("id")
      .inTable("urls")
      .onDelete("CASCADE"); // Deletes link if URL is deleted

    table.primary(["user_id", "url_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("user_urls");
}
