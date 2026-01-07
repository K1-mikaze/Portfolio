import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("blogs", (table) => {
    table.enum("language", ["EN", "ES"]).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("blogs", (table) => {
    table.dropColumn("language");
  });
}
