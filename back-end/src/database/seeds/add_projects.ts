import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("project_tags").del();
  await knex("project_translations").del();
  await knex("projects").del();

  const tags = await knex("tags")
    .where("name", "in", ["HTML", "CSS", "REACT", "EXPRESS"])
    .select("id");

  const projects = await knex("projects")
    .insert([
      {
        website: "https://sergioIA.dev",
        repository: "https://github.com/sergioIA/portfolio",
      },
      {
        website: "https://taskmanager.dev",
        repository: "https://github.com/sergioIA/task-manager",
      },
    ])
    .returning("id");

  let project_tags = tags.map((tag) => {
    return { tag_id: tag.id, project_id: projects[0].id };
  });

  let project_tags2 = tags.map((tag) => {
    return { tag_id: tag.id, project_id: projects[1].id };
  });

  await knex("project_tags").insert(project_tags);
  await knex("project_tags").insert(project_tags2);

  let project_translations_es = {
    project_id: projects[0].id,
    language: "ES",
    title: "Portafolio y Personal Blog",
    description:
      "Portafolio y Blog personal en el cual busco compartir mis proyectos, conocimiento y pensamientos adquiridos durante la resolución de problemas. Este proyecto incorpora multiples lenguajes y diferentes temas de colores.",
  };

  let project_translations_en = {
    project_id: projects[0].id,
    language: "EN",
    title: "Portfolio & Personal Blog",
    description:
      "A personal Portfolio and Blog where I share my projects, knowledge, and insights gained while solving problems. This project integrates multiple languages and different color schemes.",
  };

  let project_translations_es2 = {
    project_id: projects[1].id,
    language: "ES",
    title: "Gestor de Tareas",
    description:
      "Aplicación web para gestión de tareas con drag & drop, notificaciones y sincronización en tiempo real. Construida con React, Node.js y WebSocket.",
  };

  let project_translations_en2 = {
    project_id: projects[1].id,
    language: "EN",
    title: "Task Manager",
    description:
      "Web application for task management with drag & drop, notifications, and real-time synchronization. Built with React, Node.js, and WebSocket.",
  };

  await knex("project_translations").insert(project_translations_es);
  await knex("project_translations").insert(project_translations_en);
  await knex("project_translations").insert(project_translations_es2);
  await knex("project_translations").insert(project_translations_en2);
}
