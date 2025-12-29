import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.raw(
    "CREATE TYPE url_type AS ENUM ('IMAGE', 'BLOG', 'SOCIAL', 'CURRICULUM', 'PROJECT');",
  );

  await knex.schema.createTable("urls", (table) => {
    table.increments("id").primary();
    table.specificType("type", "url_type").notNullable();
    table.text("url").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("urls");
  await knex.raw("DROP TYPE IF EXISTS url_type CASCADE");
}
