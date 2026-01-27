# Database Architecture Documentation

## Overview

The database layer implements a PostgreSQL-based architecture with Knex.js as the query builder and migration tool. It follows a multilingual content management pattern with clear separation of concerns between data entities and their translations.

## Database Architecture

### Core Design Principles

- **Multilingual Support**: Separate translation tables for content localization
- **Tag-Based Categorization**: Many-to-many relationships for flexible tagging
- **Migration-Driven Schema**: Version-controlled database schema evolution
- **Seed-Driven Development**: Reproducible test data for development

### Architecture Pattern

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────┐
│   Core Entities │    │   Translations   │    │   Tags   │
├─────────────────┤    ├──────────────────┤    ├──────────┤
│     Blogs       │◄───┤ Blog_Translations│    │ Tags     │
│     Projects    │◄───┤ Project_Translations│   └──────────┘
└─────────────────┘    └──────────────────┘           │
           │                      │                   │
           └──────────────────────┼───────────────────┘
                                  │
                    ┌──────────────────┐
                    │  Relationship    │
                    │  Tables          │
                    ├──────────────────┤
                    │  Blog_Tags       │
                    │  Project_Tags    │
                    └──────────────────┘
```

## Database Configuration

### Knex.js Configuration (`knexfile.ts`)

```typescript
const config: Record<string, Knex.Config> = {
  development: {
    client: "pg",
    connection: {
      host: environment.DB_HOST,
      port: Number(environment.DB_PORT),
      user: environment.DB_USER,
      password: environment.DB_PASS,
      database: environment.DB_NAME,
    },
    migrations: {
      directory: "./src/database/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/database/seeds",
    },
    debug: true,
  },
  production: {
    client: "pg",
    connection: environment.DATABASE_URL,
    migrations: {
      directory: "./src/database/migrations",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
```

### Database Connection (`database.ts`)

```typescript
import knex, { Knex } from "knex";
import config from "../../knexfile";
import environment from "../configuration/environment";

const env = environment.MODE;
const knexConfig: Knex.Config = config[env];

const db: Knex = knex(knexConfig);

export default db;
```

**Features**:

- **Environment-Based Configuration**: Development vs production settings
- **Connection Pooling**: Production connection management
- **Type Safety**: TypeScript integration
- **Debug Support**: SQL query logging in development

## Schema Architecture

### Entity Relationship Overview

#### 1. Blog System

```
┌──────────────┐    ┌──────────────────┐    ┌──────────┐
│     Blogs     │    │ Blog_Translations│    │   Tags   │
├──────────────┤    ├──────────────────┤    ├──────────┤
│ id (PK)      │◄───┤ id (PK)          │    │ id (PK)  │
│ image_path   │    │ blog_id (FK)     │    │ name     │
│ url          │    │ language         │    └──────────┘
│ created_at   │    │ title            │           │
│ updated_at   │    │ description      │           │
└──────────────┘    │ created_at       │           │
                    │ updated_at       │           │
                    └──────────────────┘           │
                           │                        │
                           │                        │
                    ┌──────────────────┐           │
                    │   Blog_Tags      │           │
                    ├──────────────────┤           │
                    │ blog_id (FK)     │◄──────────┘
                    │ tag_id (FK)      │
                    └──────────────────┘
```

#### 2. Project System

```
┌──────────────┐    ┌──────────────────┐    ┌──────────┐
│   Projects   │    │ Project_Translations│  │   Tags   │
├──────────────┤    ├──────────────────┤    ├──────────┤
│ id (PK)      │◄───┤ id (PK)          │    │ id (PK)  │
│ website      │    │ project_id (FK)  │    │ name     │
│ repository   │    │ language         │    └──────────┘
│ created_at   │    │ title            │           │
│ updated_at   │    │ description      │           │
└──────────────┘    │ created_at       │           │
                    │ updated_at       │           │
                    └──────────────────┘           │
                           │                        │
                           │                        │
                    ┌──────────────────┐           │
                    │  Project_Tags    │           │
                    ├──────────────────┤           │
                    │ project_id (FK)  │◄──────────┘
                    │ tag_id (FK)      │
                    └──────────────────┘
```

## Migration Architecture

### Migration Strategy

#### Migration Files Structure

```
src/database/migrations/
├── 20260102215024_blog_tags_tables.ts
└── 20260124221813_project_table.ts
```

### Migration Implementation

#### Blog System Migration (`20260102215024_blog_tags_tables.ts`)

**Tables Created**:

1. **blogs** - Core blog entities
2. **blog_translations** - Multilingual content
3. **tags** - Shared categorization
4. **blog_tags** - Many-to-many relationships

**Migration Order**:

- Core entities first (blogs, tags)
- Translation tables second
- Relationship tables last

#### Project System Migration (`20260124221813_project_table.ts`)

**Tables Created**:

1. **projects** - Core project entities
2. **project_translations** - Multilingual content
3. **project_tags** - Many-to-many relationships

**Design Consistency**:

- Same pattern as blog system
- Shared tags table
- Consistent foreign key relationships

### Migration Management

#### Migration Commands

```bash
# Create new migration
npm run migrate:make -- create_new_table

# Run pending migrations
npm run migrate:latest

# Rollback last migration
npm run migrate:rollback

# Check migration status
npm run migrate:status
```

#### Migration Best Practices

- **Incremental Changes**: One logical change per migration
- **Reversible Operations**: Always implement down() method
- **Dependency Order**: Create tables before relationships
- **Data Preservation**: Consider data loss in rollbacks

## Seed Architecture

### Seed Strategy

#### Seed Files Structure

```
src/database/seeds/
├── add_tags.ts
├── add_projects.ts
└── insert_blog_tags.ts
```

### Seed Implementation

#### Tags Seed (`add_tags.ts`)

**Purpose**: Initialize shared tag system
**Tags Created**:

- **Frontend**: HTML, CSS, REACT, VUE, ANGULAR
- **Backend**: EXPRESS, NODE, SPRING, DJANGO
- **Languages**: JAVASCRIPT, TYPESCRIPT, JAVA, RUST, PYTHON
- **DevOps**: DOCKER, KUBERNETES, LINUX, NIXOS, NIX
- **Databases**: POSTGRESQL, MONGODB
- **Cloud**: AWS
- **Tools**: GIT

**Design Features**:

- **Comprehensive Coverage**: Technology stack representation
- **Uppercase Convention**: Consistent naming
- **Shared Resource**: Used across blogs and projects

#### Projects Seed (`add_projects.ts`)

**Purpose**: Initialize project data with translations
**Projects Created**:

1. **Portfolio Website**: Personal portfolio and blog
2. **Task Manager**: Web application for task management

**Translation Strategy**:

- **Bilingual Content**: EN and ES translations
- **Consistent Structure**: Same content pattern
- **Tag Association**: Links to technology tags

#### Blog Tags Seed (`insert_blog_tags.ts`)

**Purpose**: Initialize blog data with complex tag relationships
**Blogs Created**:

1. **Linux Administration Guide**: System administration content
2. **React Web Development**: Frontend development guide
3. **Rust Performance Tips**: Performance optimization content

**Tag Association Strategy**:

- **Varied Tag Sets**: Different tag combinations per blog
- **Technology-Specific**: Relevant tags for each topic
- **Cross-Reference**: Shared tags across content

### Seed Management

#### Seed Commands

```bash
# Run all seeds
npm run seeds:run

# Create new seed file
npm run seeds:make -- new_seed_file
```

#### Seed Best Practices

- **Idempotent Operations**: Clear before insert
- **Dependency Order**: Create dependent data first
- **Realistic Data**: Representative of production data
- **Relationship Integrity**: Maintain foreign key constraints

