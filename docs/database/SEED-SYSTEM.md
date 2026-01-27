# Seed System Documentation

## Overview

The seed system implements a reproducible data initialization strategy using Knex.js seeds. It provides structured test data for development environments and ensures consistent data across different environments.

## Seed Architecture

### Seed Pattern

```
Seed File
├── Clear existing data
├── Insert seed data
└── Verify data integrity
```

### Seed Lifecycle

```
Development → Testing → Staging → Production
     ↓           ↓         ↓          ↓
  Create     Test     Deploy    Initialize
```

## Seed Files

### Current Seeds

#### 1. Tags Seed

**File**: `add_tags.ts`
**Purpose**: Initialize shared tag system with comprehensive technology tags
**Tags Created**: 25 technology tags across multiple categories

#### 2. Projects Seed

**File**: `add_projects.ts`
**Purpose**: Initialize project data with multilingual translations and tag associations
**Projects Created**: 2 sample projects with full translations

#### 3. Blog Tags Seed

**File**: `insert_blog_tags.ts`
**Purpose**: Initialize blog data with complex tag relationships and translations
**Blogs Created**: 3 sample blogs with varied tag associations

## Seed Implementation

### Tags Seed Implementation

#### Seed Structure

```typescript
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing tags
  await knex("tags").del();

  // Insert comprehensive tag set
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
```

#### Tag Categories

##### Frontend Technologies

- **HTML**: Markup language
- **CSS**: Styling language
- **JAVASCRIPT**: Programming language
- **TYPESCRIPT**: Typed JavaScript
- **REACT**: JavaScript framework
- **VUE**: JavaScript framework
- **ANGULAR**: JavaScript framework
- **FLUTTER**: Mobile framework

##### Backend Technologies

- **EXPRESS**: Node.js framework
- **NODE**: JavaScript runtime
- **SPRING**: Java framework
- **DJANGO**: Python framework
- **JAVA**: Programming language
- **RUST**: Programming language
- **PYTHON**: Programming language

##### DevOps & Infrastructure

- **LINUX**: Operating system
- **NIXOS**: Linux distribution
- **NIX**: Package manager
- **DOCKER**: Container platform
- **KUBERNETES**: Container orchestrator
- **AWS**: Cloud platform
- **GIT**: Version control

##### Databases

- **POSTGRESQL**: Relational database
- **MONGODB**: NoSQL database

#### Design Decisions

- **Uppercase Convention**: Consistent uppercase naming
- **Comprehensive Coverage**: Technology stack representation
- **Shared Resource**: Used across blogs and projects
- **Categorization**: Logical grouping of technologies

### Projects Seed Implementation

#### Seed Structure

```typescript
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing project data
  await knex("project_tags").del();
  await knex("project_translations").del();
  await knex("projects").del();

  // Get relevant tags
  const tags = await knex("tags")
    .where("name", "in", ["HTML", "CSS", "REACT", "EXPRESS"])
    .select("id");

  // Insert projects
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

  // Create tag associations
  let project_tags = tags.map((tag) => ({
    tag_id: tag.id,
    project_id: projects[0].id,
  }));

  let project_tags2 = tags.map((tag) => ({
    tag_id: tag.id,
    project_id: projects[1].id,
  }));

  await knex("project_tags").insert(project_tags);
  await knex("project_tags").insert(project_tags2);

  // Insert translations
  await knex("project_translations").insert([
    // Portfolio translations
    {
      project_id: projects[0].id,
      language: "ES",
      title: "Portafolio y Personal Blog",
      description:
        "Portafolio y Blog personal en el cual busco compartir mis proyectos, conocimiento y pensamientos adquiridos durante la resolución de problemas. Este proyecto incorpora multiples lenguajes y diferentes temas de colores.",
    },
    {
      project_id: projects[0].id,
      language: "EN",
      title: "Portfolio & Personal Blog",
      description:
        "A personal Portfolio and Blog where I share my projects, knowledge, and insights gained while solving problems. This project integrates multiple languages and different color schemes.",
    },
    // Task Manager translations
    {
      project_id: projects[1].id,
      language: "ES",
      title: "Gestor de Tareas",
      description:
        "Aplicación web para gestión de tareas con drag & drop, notificaciones y sincronización en tiempo real. Construida con React, Node.js y WebSocket.",
    },
    {
      project_id: projects[1].id,
      language: "EN",
      title: "Task Manager",
      description:
        "Web application for task management with drag & drop, notifications, and real-time synchronization. Built with React, Node.js, and WebSocket.",
    },
  ]);
}
```

#### Project Details

##### Portfolio Website

- **Website**: https://sergioIA.dev
- **Repository**: https://github.com/sergioIA/portfolio
- **Tags**: HTML, CSS, REACT, EXPRESS
- **Technologies**: Full-stack web application
- **Features**: Multilingual support, color themes

##### Task Manager

- **Website**: https://taskmanager.dev
- **Repository**: https://github.com/sergioIA/task-manager
- **Tags**: HTML, CSS, REACT, EXPRESS
- **Technologies**: Real-time web application
- **Features**: Drag & drop, notifications, WebSocket

#### Translation Strategy

- **Bilingual Content**: EN and ES translations
- **Consistent Structure**: Same content pattern across languages
- **Descriptive Content**: Detailed project descriptions
- **Technical Accuracy**: Accurate technology descriptions

### Blog Tags Seed Implementation

#### Seed Structure

```typescript
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing blog data
  await knex("blog_tags").del();
  await knex("blog_translations").del();
  await knex("blogs").del();

  // Get relevant tags for first two blogs
  const tags = await knex("tags")
    .where("name", "in", [
      "LINUX",
      "NIXOS",
      "NIX",
      "JAVA",
      "JAVASCRIPT",
      "TYPESCRIPT",
      "RUST",
      "FLUTTER",
    ])
    .select("id", "name");

  // Insert blogs
  const blogs = await knex("blogs")
    .insert([
      {
        image_path: "linux-admin.webp",
        url: "blog/linux-administration-guide",
      },
      {
        image_path: "react-dev.webp",
        url: "blog/react-web-development",
      },
      {
        image_path: "rust-performance.webp",
        url: "blog/rust-performance-tips",
      },
    ])
    .returning("id");

  // Create tag associations for first two blogs
  let blog_tags = tags.map((tag) => ({
    tag_id: tag.id,
    blog_id: blogs[0].id,
  }));

  let blog_tags2 = tags.map((tag) => ({
    tag_id: tag.id,
    blog_id: blogs[1].id,
  }));

  // Get specific tags for third blog
  const linuxRustTags = await knex("tags")
    .where("name", "in", ["RUST", "LINUX", "DOCKER"])
    .select("id");

  let blog_tags3 = linuxRustTags.map((tag) => ({
    tag_id: tag.id,
    blog_id: blogs[2].id,
  }));

  await knex("blog_tags").insert(blog_tags);
  await knex("blog_tags").insert(blog_tags2);
  await knex("blog_tags").insert(blog_tags3);

  // Insert translations
  await knex("blog_translations").insert([
    // Linux Administration Guide translations
    {
      blog_id: blogs[0].id,
      language: "ES",
      title: "Guía de Administración de Linux",
      description:
        "Una guía completa sobre administración de sistemas Linux, incluyendo configuración de servidores, gestión de usuarios y optimización de rendimiento.",
    },
    {
      blog_id: blogs[0].id,
      language: "EN",
      title: "Linux Administration Guide",
      description:
        "A comprehensive guide to Linux system administration, including server setup, user management, and performance optimization.",
    },
    // React Web Development translations
    {
      blog_id: blogs[1].id,
      language: "ES",
      title: "Desarrollo Web con React",
      description:
        "Aprende a construir aplicaciones web modernas con React, incluyendo hooks, estado global y mejores prácticas.",
    },
    // Rust Performance Tips translations
    {
      blog_id: blogs[2].id,
      language: "EN",
      title: "Rust Performance Tips",
      description:
        "Advanced techniques for optimizing Rust applications, including memory management and concurrency patterns.",
    },
    {
      blog_id: blogs[2].id,
      language: "ES",
      title: "Consejos de Rendimiento en Rust",
      description:
        "Técnicas avanzadas para optimizar aplicaciones Rust, incluyendo gestión de memoria y patrones de concurrencia.",
    },
  ]);
}
```

## Seed Management

### Configuration Setup

#### Knexfile Seed Configuration

```typescript
const config: Record<string, Knex.Config> = {
  development: {
    // ... other config
    seeds: {
      directory: "./src/database/seeds",
    },
  },
  production: {
    // ... other config
    seeds: {
      directory: "./src/database/seeds",
    },
  },
};
```

### Seed Commands

#### Development Commands

```bash
# Run all seeds
npm run seeds:run

# Create new seed file
npm run seeds:make -- new_seed_file

# Run specific seed
npm run seeds:run -- 001_add_tags
```

#### Production Commands

```bash
# Run seeds with production config
NODE_ENV=production npm run seeds:run

# Run specific seed in production
NODE_ENV=production npm run seeds:run -- 001_add_tags
```

### Seed Workflow

#### Development Process

1. **Create Seed**: Generate seed file with timestamp
2. **Implement Seed**: Write data insertion logic
3. **Test Locally**: Run seed and verify data
4. **Review Data**: Check data integrity and relationships
5. **Deploy to Staging**: Test in staging environment
6. **Deploy to Production**: Initialize production database

#### Best Practices

- **Idempotent Operations**: Clear before insert
- **Dependency Order**: Create dependent data first
- **Realistic Data**: Representative of production data
- **Relationship Integrity**: Maintain foreign key constraints
- **Data Validation**: Verify seed data accuracy

## Seed Patterns

### Basic Seed Pattern

```typescript
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex("table_name").del();

  // Insert seed data
  await knex("table_name").insert([
    { field1: "value1", field2: "value2" },
    { field1: "value3", field2: "value4" },
  ]);
}
```

