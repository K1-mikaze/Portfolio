# Database Documentation Index

## Overview

This directory contains comprehensive architecture documentation for the database layer of the portfolio back-end API. The documentation covers database architecture, schema design, migration system, and seed data management.

## Documentation Structure

```
docs/database/
├── README.md                      # This file - Documentation index
├── DATABASE-ARCHITECTURE.md       # Overall database architecture
├── DATABASE-SCHEMA.md             # Detailed schema documentation
├── MIGRATION-SYSTEM.md            # Migration system documentation
├── SEED-SYSTEM.md                 # Seed system documentation
└── database-scheme.sql             # SQL schema file
```

## Document Descriptions

### 1. [Database Architecture](./DATABASE-ARCHITECTURE.md)

**Focus**: Overall database architecture and design patterns
**Content**:

- Database configuration and connection management
- Architecture patterns and design principles
- Knex.js integration and configuration
- Performance and security considerations
- Data flow and relationship patterns

**Key Sections**:

- Knex.js configuration
- Entity relationship overview
- Table architecture
- Data integrity and security
- Performance optimization strategies

### 2. [Database Scheme](./DATABASE-SCHEMA.md)

**Focus**: Detailed database schema and table definitions
**Content**:

- Complete table definitions and field descriptions
- Relationship diagrams and foreign key constraints
- Data integrity rules and validation
- Index strategies for performance
- Query patterns and examples

**Key Sections**:

- Core entity tables (blogs, projects)
- Translation tables (multilingual support)
- Categorization tables (tags and relationships)
- Performance optimization
- Data validation rules

### 3. [Migration System](./MIGRATION-SYSTEM.md)

**Focus**: Database migration system and version control
**Content**:

- Migration file structure and patterns
- Migration workflow and best practices
- Version control and rollback procedures
- Performance considerations for large migrations
- Testing strategies for migrations

**Key Sections**:

- Migration implementation patterns
- Migration management commands
- Error handling and recovery
- Production deployment procedures
- Troubleshooting common issues

### 4. [Seed System](./SEED-SYSTEM.md)

**Focus**: Seed system for data initialization and testing
**Content**:

- Seed file structure and patterns
- Comprehensive seed data documentation
- Environment-specific seeding strategies
- Data validation and integrity checks
- Performance optimization for large datasets

**Key Sections**:

- Seed implementation details
- Tag system and categorization
- Multilingual content seeding
- Relationship management
- Testing and validation procedures

### 5. [Database Scheme SQL File](./database-scheme.sql)

**Focus**: Complete SQL schema definition
**Content**:

- Raw SQL for all table definitions
- Index definitions and constraints
- Foreign key relationships
- Initial schema setup

## Database Architecture Overview

### Technology Stack

- **Database Engine**: PostgreSQL
- **Query Builder**: Knex.js
- **Migration Tool**: Knex.js migrations
- **Seeding**: Knex.js seeds
- **Connection Pooling**: Built-in connection management

### Core Design Patterns

#### 1. Multilingual Architecture

```
Core Entity (blogs/projects)
       ↓
Translation Table (blog_translations/project_translations)
       ↓
Language-Specific Content (EN/ES)
```

#### 2. Tag-Based Categorization

```
Shared Tags Table
       ↓
Many-to-Many Relationships
       ↓
Entity-Tag Mapping (blog_tags/project_tags)
```

#### 3. Normalized Design

- First Normal Form (1NF): Atomic values
- Second Normal Form (2NF): No partial dependencies
- Third Normal Form (3NF): No transitive dependencies

### Entity Relationships

#### Blog System

- **blogs** (core entity)
- **blog_translations** (multilingual content)
- **blog_tags** (tag relationships)
- **tags** (shared categorization)

#### Project System

- **projects** (core entity)
- **project_translations** (multilingual content)
- **project_tags** (tag relationships)
- **tags** (shared categorization)

## Key Features

### 1. Multilingual Support

- Separate translation tables for each content type
- Language validation (EN/ES only)
- Unique constraints on (entity_id, language)
- Cascading deletes for data integrity

### 2. Flexible Tagging System

- Shared tags table across all content types
- Many-to-many relationships for flexible categorization
- Uppercase naming convention for consistency
- Comprehensive technology coverage

### 3. Data Integrity

- Foreign key constraints with cascade deletes
- Check constraints for validation
- Unique constraints for duplicate prevention
- Timestamps for audit trails

### 4. Performance Optimization

- Strategic indexing for common query patterns
- Composite primary keys for relationship tables
- Query optimization guidelines
- Connection pooling for production

## Schema Summary

### Tables Overview

| Table                  | Purpose                      | Key Features                    |
| ---------------------- | ---------------------------- | ------------------------------- |
| `blogs`                | Core blog entities           | URL, image path, timestamps     |
| `projects`             | Core project entities        | Website, repository, timestamps |
| `blog_translations`    | Multilingual blog content    | Title, description, language    |
| `project_translations` | Multilingual project content | Title, description, language    |
| `tags`                 | Shared categorization        | Unique tag names                |
| `blog_tags`            | Blog-tag relationships       | Composite primary key           |
| `project_tags`         | Project-tag relationships    | Composite primary key           |

### Relationships

#### Foreign Key Relationships

- `blog_translations.blog_id` → `blogs.id`
- `project_translations.project_id` → `projects.id`
- `blog_tags.blog_id` → `blogs.id`
- `blog_tags.tag_id` → `tags.id`
- `project_tags.project_id` → `projects.id`
- `project_tags.tag_id` → `tags.id`

#### Constraints

- **Cascading Deletes**: Remove translations and relationships when parent is deleted
- **Language Validation**: Only EN/ES allowed in language fields
- **Uniqueness**: No duplicate tag names, one translation per language per entity

## Data Flow Patterns

### Content Retrieval

```sql
-- Multilingual blog retrieval
SELECT b.*, bt.title, bt.description, bt.language
FROM blogs b
JOIN blog_translations bt ON bt.blog_id = b.id
WHERE bt.language = 'EN';
```

### Tag Filtering

```sql
-- Blog filtering by tags
SELECT b.*, bt.title, bt.description
FROM blogs b
JOIN blog_translations bt ON bt.blog_id = b.id
JOIN blog_tags btag ON btag.blog_id = b.id
JOIN tags t ON t.id = btag.tag_id
WHERE t.name = 'REACT';
```

## Configuration

### Knex.js Configuration

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

## Quick Start

1. **Architecture**: Start with [DATABASE-ARCHITECTURE.md](./DATABASE-ARCHITECTURE.md) for overview
2. **Schema Details**: Review [DATABASE-SCHEMA.md](./DATABASE-SCHEMA.md) for table definitions
3. **Migrations**: Study [MIGRATION-SYSTEM.md](./MIGRATION-SYSTEM.md) for schema changes
4. **Seeding**: Use [SEED-SYSTEM.md](./SEED-SYSTEM.md) for data initialization

## Commands Reference

### Migration Commands

```bash
# Create new migration
npm run migrate:make -- migration_name

# Run all migrations
npm run migrate:latest

# Rollback last migration
npm run migrate:rollback

# Check migration status
npm run migrate:status
```

### Seed Commands

```bash
# Run all seeds
npm run seeds:run

# Create new seed file
npm run seeds:make -- seed_name

# Run specific seed
npm run seeds:run -- seed_name
```

## Best Practices

### Schema Design

- **Normalization**: Follow normal forms for data integrity
- **Indexing**: Create indexes for common query patterns
- **Constraints**: Use foreign keys and check constraints
- **Naming**: Use consistent naming conventions

### Migration Management

- **Incremental Changes**: One logical change per migration
- **Reversible**: Always implement down() methods
- **Testing**: Test migrations in development first
- **Backup**: Backup before production migrations

### Data Seeding

- **Idempotent**: Clear before insert
- **Environment-Specific**: Different data per environment
- **Validation**: Verify seed data integrity
- **Documentation**: Document seed data purpose

