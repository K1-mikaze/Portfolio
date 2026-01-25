import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("tags").del();

  await knex("tags").insert([
    { name: "HTML" },
    { name: "CSS" },
    { name: "JAVASCRIPT" },
    { name: "TYPESCRIPT" },
    { name: "REACT" },
    { name: "EXPRESS" },
    { name: "NODE" },
    { name: "LINUX" },
    { name: "NIXOS" },
    { name: "NIX" },
    { name: "JAVA" },
    { name: "RUST" },
    { name: "FLUTTER" },
    { name: "PYTHON" },
    { name: "DOCKER" },
    { name: "KUBERNETES" },
    { name: "POSTGRESQL" },
    { name: "MONGODB" },
    { name: "GIT" },
    { name: "AWS" },
    { name: "VUE" },
    { name: "ANGULAR" },
    { name: "SPRING" },
    { name: "DJANGO" },
  ]);
}
