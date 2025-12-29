import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("name", 250).notNullable();
    table.text("description").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("projects");
}
