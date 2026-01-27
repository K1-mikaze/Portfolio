import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.text("website").notNullable();
    table.text("repository").notNullable();
    table.timestamps(true, true);
  });

  await knex.schema.createTable("project_translations", (table) => {
    table.increments("id").primary();
    table.integer("project_id").notNullable();
    table.string("title", 150).notNullable();
    table.text("description").notNullable();
    table.enum("language", ["EN", "ES"]).notNullable();

    table.foreign("project_id").references("id").inTable("projects");
  });

  await knex.schema.createTable("project_tags", (table) => {
    table.integer("tag_id").notNullable();
    table.integer("project_id").notNullable();

    table.foreign("tag_id").references("id").inTable("tags");

    table.foreign("project_id").references("id").inTable("projects");

    table.primary(["tag_id", "project_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("project_tags");
  await knex.schema.dropTable("project_translations");
  await knex.schema.dropTable("projects");
}
