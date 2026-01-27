# Migration System Documentation

## Overview

The migration system implements a version-controlled database schema evolution using Knex.js migrations. It provides a structured approach to database changes with rollback capabilities and environment-specific configurations.

## Migration Architecture

### Migration Pattern

```
Migration File
├── up()   - Apply schema changes
└── down() - Reverse schema changes
```

### Migration Lifecycle

```
Development → Testing → Staging → Production
     ↓           ↓         ↓          ↓
  Create     Review    Deploy    Apply
```

## Migration Files

### Current Migrations

#### 1. Blog System Migration

**File**: `20260102215024_blog_tags_tables.ts`
**Purpose**: Create blog-related tables and relationships
**Tables Created**:

- `blogs` - Core blog entities
- `blog_translations` - Multilingual blog content
- `tags` - Shared categorization system
- `blog_tags` - Many-to-many blog-tag relationships

#### 2. Project System Migration

**File**: `20260124221813_project_table.ts`
**Purpose**: Create project-related tables and relationships
**Tables Created**:

- `projects` - Core project entities
- `project_translations` - Multilingual project content
- `project_tags` - Many-to-many project-tag relationships

## Migration Implementation

### Blog System Migration

#### Migration Structure

```typescript
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create blogs table
  await knex.schema.createTable("blogs", (table) => {
    table.increments("id").primary();
    table.text("image_path").notNullable();
    table.text("url").notNullable();
    table.timestamps(true, true);
  });

  // Create blog_translations table
  await knex.schema.createTable("blog_translations", (table) => {
    table.increments("id").primary();
    table.integer("blog_id").notNullable();
    table.string("title", 150).notNullable();
    table.text("description").notNullable();
    table.enum("language", ["EN", "ES"]).notNullable();
    table.foreign("blog_id").references("id").inTable("blogs");
  });

  // Create tags table
  await knex.schema.createTable("tags", (table) => {
    table.increments("id").primary();
    table.string("name", 50).notNullable().unique();
  });

  // Create blog_tags relationship table
  await knex.schema.createTable("blog_tags", (table) => {
    table.integer("tag_id").notNullable();
    table.integer("blog_id").notNullable();
    table.foreign("tag_id").references("id").inTable("tags");
    table.foreign("blog_id").references("id").inTable("blogs");
    table.primary(["tag_id", "blog_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop in reverse order of creation
  await knex.schema.dropTable("blog_tags");
  await knex.schema.dropTable("tags");
  await knex.schema.dropTable("blog_translations");
  await knex.schema.dropTable("blogs");
}
```

#### Design Decisions

##### Table Creation Order

1. **Core Entities First**: `blogs` and `tags` (no dependencies)
2. **Translation Tables Second**: `blog_translations` (depends on blogs)
3. **Relationship Tables Last**: `blog_tags` (depends on blogs and tags)

##### Field Design

- **Primary Keys**: Auto-incrementing SERIAL for all tables
- **Foreign Keys**: Explicit foreign key constraints with references
- **Data Types**: Optimized field types (TEXT for URLs, VARCHAR for names)
- **Constraints**: NOT NULL, UNIQUE, ENUM for data integrity

##### Relationship Design

- **Many-to-Many**: Composite primary key in blog_tags
- **Foreign Key Constraints**: Referential integrity enforcement
- **Cascade Behavior**: Default cascade for deletes

### Project System Migration

#### Migration Structure

```typescript
import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create projects table
  await knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.text("website").notNullable();
    table.text("repository").notNullable();
    table.timestamps(true, true);
  });

  // Create project_translations table
  await knex.schema.createTable("project_translations", (table) => {
    table.increments("id").primary();
    table.integer("project_id").notNullable();
    table.string("title", 150).notNullable();
    table.text("description").notNullable();
    table.enum("language", ["EN", "ES"]).notNullable();
    table.foreign("project_id").references("id").inTable("projects");
  });

  // Create project_tags relationship table
  await knex.schema.createTable("project_tags", (table) => {
    table.integer("tag_id").notNullable();
    table.integer("project_id").notNullable();
    table.foreign("tag_id").references("id").inTable("tags");
    table.foreign("project_id").references("id").inTable("projects");
    table.primary(["tag_id", "project_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop in reverse order
  await knex.schema.dropTable("project_tags");
  await knex.schema.dropTable("project_translations");
  await knex.schema.dropTable("projects");
}
```

#### Design Consistency

- **Pattern Consistency**: Same structure as blog system
- **Shared Resources**: Uses existing tags table
- **Translation Pattern**: Identical to blog_translations
- **Relationship Pattern**: Same many-to-many approach

## Migration Management

### Configuration Setup

#### Knexfile Configuration

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
    debug: true, // SQL query logging
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

### Migration Commands

#### Development Commands

```bash
# Create new migration
npm run migrate:make -- create_new_table

# Run pending migrations
npm run migrate:latest

# Rollback last migration
npm run migrate:rollback

# Check migration status
npm run migrate:status

# Run specific migration
npm run migrate:up -- 20260102215024
```

#### Production Commands

```bash
# Apply migrations with production config
NODE_ENV=production npm run migrate:latest

# Rollback with caution
NODE_ENV=production npm run migrate:rollback
```

### Migration Workflow

#### Development Process

1. **Create Migration**: Generate migration file with timestamp
2. **Implement up()**: Write schema creation logic
3. **Implement down()**: Write rollback logic
4. **Test Locally**: Apply and rollback migrations
5. **Review Code**: Code review for migration logic
6. **Deploy to Staging**: Test in staging environment
7. **Deploy to Production**: Apply to production database

#### Best Practices

- **Incremental Changes**: One logical change per migration
- **Reversible Operations**: Always implement down() method
- **Data Preservation**: Consider data loss in rollbacks
- **Testing**: Test both up and down migrations
- **Documentation**: Document migration purpose and changes

## Migration Patterns

### Table Creation Pattern

```typescript
export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("table_name", (table) => {
    // Primary key
    table.increments("id").primary();

    // Data fields
    table.string("name", 100).notNullable();
    table.text("description");

    // Foreign keys
    table.integer("parent_id").references("id").inTable("parent_table");

    // Constraints
    table.unique(["name"]);

    // Timestamps
    table.timestamps(true, true);
  });
}
```

### Table Modification Pattern

```typescript
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("existing_table", (table) => {
    // Add new column
    table.string("new_field").default("default_value");

    // Modify existing column
    table.string("existing_field").alter();

    // Add index
    table.index(["field_name"]);
  });
}
```

### Data Migration Pattern

```typescript
export async function up(knex: Knex): Promise<void> {
  // Create new table
  await knex.schema.createTable("new_table", (table) => {
    // Table definition
  });

  // Migrate data
  await knex("new_table").insert(await knex("old_table").select("*"));

  // Drop old table
  await knex.schema.dropTable("old_table");
}
```

## Error Handling

### Common Migration Errors

#### Foreign Key Violations

```typescript
// Error: Foreign key constraint violation
// Solution: Drop dependent tables first
export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("dependent_table");
  await knex.schema.dropTable("parent_table");
}
```

#### Data Type Conflicts

```typescript
// Error: Column type change requires data conversion
// Solution: Use temporary column
export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("table", (table) => {
    table.string("new_field").temporary();
  });

  await knex("table").update({
    new_field: knex.raw("CAST(old_field AS VARCHAR)"),
  });

  await knex.schema.alterTable("table", (table) => {
    table.dropColumn("old_field");
    table.renameColumn("new_field", "field");
  });
}
```

### Error Recovery

```typescript
// Safe migration with error handling
export async function up(knex: Knex): Promise<void> {
  try {
    await knex.schema.createTable("table", (table) => {
      // Table definition
    });
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  }
}
```

## Performance Considerations

### Migration Performance

#### Large Table Operations

```typescript
// For large tables, use batch operations
export async function up(knex: Knex): Promise<void> {
  const batchSize = 1000;
  let offset = 0;

  while (true) {
    const batch = await knex("large_table").limit(batchSize).offset(offset);

    if (batch.length === 0) break;

    await knex("new_table").insert(batch);
    offset += batchSize;
  }
}
```

#### Index Creation

```typescript
// Create indexes after data migration
export async function up(knex: Knex): Promise<void> {
  // Create table
  await knex.schema.createTable("table", (table) => {
    // Table definition without indexes
  });

  // Migrate data

  // Create indexes
  await knex.raw("CREATE INDEX idx_table_field ON table(field)");
}
```

### Lock Management

```typescript
// Minimize table locks
export async function up(knex: Knex): Promise<void> {
  // Use CONCURRENTLY for index creation (PostgreSQL)
  await knex.raw("CREATE INDEX CONCURRENTLY idx_table_field ON table(field)");
}
```

## Version Control

### Migration Versioning

- **Timestamp Naming**: Migration files named with timestamps
- **Sequential Order**: Migrations applied in timestamp order
- **Version Tracking**: Knex tracks applied migrations
- **Rollback Support**: Can rollback to any previous version

### Branch Management

```bash
# Feature branch with new migration
git checkout -b feature/new-table
npm run migrate:make -- add_new_table
# Implement migration
git add migrations/
git commit -m "Add new table migration"

# Merge to main
git checkout main
git merge feature/new-table
npm run migrate:latest
```

