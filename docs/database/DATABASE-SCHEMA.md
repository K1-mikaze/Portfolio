# Database Schema Documentation

## Overview

The database schema implements a multilingual content management system with PostgreSQL as the database engine. It follows a normalized design pattern with clear separation between core entities and their translations, supported by a flexible tagging system.

## Schema Architecture

### Design Principles

- **Multilingual Support**: Separate translation tables for content localization
- **Normalization**: Third normal form with proper relationships
- **Tag-Based Categorization**: Many-to-many relationships for flexible tagging
- **Data Integrity**: Foreign key constraints and validation rules
- **Scalability**: Optimized for performance and future growth

### Entity Relationship Overview

```
┌──────────────┐    ┌──────────────────┐    ┌──────────┐
│   Core Entity │    │   Translations   │    │   Tags   │
│   (Blogs)     │◄───┤ Blog_Translations│    │ Tags     │
│   (Projects)  │◄───┤ Project_Translations│  └──────────┘
└──────────────┘    └──────────────────┘           │
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

## Table Definitions

### Core Entity Tables

#### 1. Blogs Table

**Purpose**: Store core blog entity information
**Table Name**: `blogs`

```sql
CREATE TABLE "blogs" (
  "id" SERIAL PRIMARY KEY,
  "image_path" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Field Descriptions**:

- **id** (SERIAL PRIMARY KEY): Auto-incrementing unique identifier
- **image_path** (TEXT NOT NULL): Path to blog featured image
- **url** (TEXT NOT NULL): URL-friendly blog identifier
- **created_at** (TIMESTAMP): Automatic creation timestamp
- **updated_at** (TIMESTAMP): Automatic update timestamp

**Constraints**:

- Primary key on `id`
- NOT NULL constraints on `image_path` and `url`
- Default timestamps for creation and updates

**Indexes**:

- Primary key index on `id`
- Recommended unique index on `url`

#### 2. Projects Table

**Purpose**: Store core project entity information
**Table Name**: `projects`

```sql
CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "website" TEXT NOT NULL,
  "repository" TEXT NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

**Field Descriptions**:

- **id** (SERIAL PRIMARY KEY): Auto-incrementing unique identifier
- **website** (TEXT NOT NULL): Live demo website URL
- **repository** (TEXT NOT NULL): Source code repository URL
- **created_at** (TIMESTAMP): Automatic creation timestamp
- **updated_at** (TIMESTAMP): Automatic update timestamp

**Constraints**:

- Primary key on `id`
- NOT NULL constraints on `website` and `repository`
- Default timestamps for creation and updates

**Indexes**:

- Primary key index on `id`
- Recommended index on `website` for lookups

### Translation Tables

#### 3. Blog_Translations Table

**Purpose**: Store multilingual blog content
**Table Name**: `blog_translations`

```sql
CREATE TABLE "blog_translations" (
  "id" SERIAL PRIMARY KEY,
  "blog_id" INTEGER NOT NULL,
  "title" VARCHAR(150) NOT NULL,
  "description" TEXT NOT NULL,
  "language" VARCHAR(2) NOT NULL CHECK (language IN ('EN', 'ES')),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE,
  UNIQUE("blog_id", "language")
);
```

**Field Descriptions**:

- **id** (SERIAL PRIMARY KEY): Auto-incrementing unique identifier
- **blog_id** (INTEGER NOT NULL): Foreign key reference to blogs.id
- **title** (VARCHAR(150) NOT NULL): Blog title in specific language
- **description** (TEXT NOT NULL): Blog description in specific language
- **language** (VARCHAR(2) NOT NULL): Language code (EN/ES)
- **created_at** (TIMESTAMP): Automatic creation timestamp
- **updated_at** (TIMESTAMP): Automatic update timestamp

**Constraints**:

- Primary key on `id`
- Foreign key constraint on `blog_id` with CASCADE delete
- CHECK constraint on `language` (EN/ES only)
- UNIQUE constraint on (`blog_id`, `language`) combination
- NOT NULL constraints on content fields

**Indexes**:

- Primary key index on `id`
- Foreign key index on `blog_id`
- Recommended index on `language` for filtering

#### 4. Project_Translations Table

**Purpose**: Store multilingual project content
**Table Name**: `project_translations`

```sql
CREATE TABLE "project_translations" (
  "id" SERIAL PRIMARY KEY,
  "project_id" INTEGER NOT NULL,
  "title" VARCHAR(150) NOT NULL,
  "description" TEXT NOT NULL,
  "language" VARCHAR(2) NOT NULL CHECK (language IN ('EN', 'ES')),
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
  UNIQUE("project_id", "language")
);
```

**Field Descriptions**:

- **id** (SERIAL PRIMARY KEY): Auto-incrementing unique identifier
- **project_id** (INTEGER NOT NULL): Foreign key reference to projects.id
- **title** (VARCHAR(150) NOT NULL): Project title in specific language
- **description** (TEXT NOT NULL): Project description in specific language
- **language** (VARCHAR(2) NOT NULL): Language code (EN/ES)
- **created_at** (TIMESTAMP): Automatic creation timestamp
- **updated_at** (TIMESTAMP): Automatic update timestamp

**Constraints**:

- Primary key on `id`
- Foreign key constraint on `project_id` with CASCADE delete
- CHECK constraint on `language` (EN/ES only)
- UNIQUE constraint on (`project_id`, `language`) combination
- NOT NULL constraints on content fields

**Indexes**:

- Primary key index on `id`
- Foreign key index on `project_id`
- Recommended index on `language` for filtering

### Categorization Tables

#### 5. Tags Table

**Purpose**: Store shared categorization tags
**Table Name**: `tags`

```sql
CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(50) NOT NULL UNIQUE
);
```

**Field Descriptions**:

- **id** (SERIAL PRIMARY KEY): Auto-incrementing unique identifier
- **name** (VARCHAR(50) NOT NULL): Tag name

**Constraints**:

- Primary key on `id`
- UNIQUE constraint on `name` to prevent duplicates
- NOT NULL constraint on `name`

**Indexes**:

- Primary key index on `id`
- Unique index on `name`

**Data Conventions**:

- Uppercase naming convention
- Maximum 50 characters
- Technology-focused tags

#### 6. Blog_Tags Table

**Purpose**: Many-to-many relationship between blogs and tags
**Table Name**: `blog_tags`

```sql
CREATE TABLE "blog_tags" (
  "blog_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  PRIMARY KEY ("blog_id", "tag_id"),
  FOREIGN KEY ("blog_id") REFERENCES "blogs"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE
);
```

**Field Descriptions**:

- **blog_id** (INTEGER NOT NULL): Foreign key reference to blogs.id
- **tag_id** (INTEGER NOT NULL): Foreign key reference to tags.id

**Constraints**:

- Composite primary key on (`blog_id`, `tag_id`)
- Foreign key constraint on `blog_id` with CASCADE delete
- Foreign key constraint on `tag_id` with CASCADE delete
- NOT NULL constraints on both fields

**Indexes**:

- Composite primary key index
- Individual indexes on `blog_id` and `tag_id` for efficient queries

#### 7. Project_Tags Table

**Purpose**: Many-to-many relationship between projects and tags
**Table Name**: `project_tags`

```sql
CREATE TABLE "project_tags" (
  "project_id" INTEGER NOT NULL,
  "tag_id" INTEGER NOT NULL,
  PRIMARY KEY ("project_id", "tag_id"),
  FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE,
  FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE
);
```

**Field Descriptions**:

- **project_id** (INTEGER NOT NULL): Foreign key reference to projects.id
- **tag_id** (INTEGER NOT NULL): Foreign key reference to tags.id

**Constraints**:

- Composite primary key on (`project_id`, `tag_id`)
- Foreign key constraint on `project_id` with CASCADE delete
- Foreign key constraint on `tag_id` with CASCADE delete
- NOT NULL constraints on both fields

**Indexes**:

- Composite primary key index
- Individual indexes on `project_id` and `tag_id` for efficient queries

## Relationship Diagram

### Visual Schema

```
┌─────────────────┐    ┌─────────────────────┐    ┌──────────────┐
│     blogs       │    │  blog_translations  │    │     tags      │
├─────────────────┤    ├─────────────────────┤    ├──────────────┤
│ id (PK)         │◄───┤ id (PK)             │    │ id (PK)       │
│ image_path      │    │ blog_id (FK)        │    │ name (UNIQUE) │
│ url             │    │ title (150)         │    └──────────────┘
│ created_at      │    │ description (TEXT)  │           │
│ updated_at      │    │ language (2)        │           │
└─────────────────┘    │ created_at         │           │
           │            │ updated_at         │           │
           │            └─────────────────────┘           │
           │                      │                       │
           │            ┌─────────────────────┐           │
           │            │     blog_tags       │           │
           │            ├─────────────────────┤           │
           │            │ blog_id (FK)        │◄──────────┘
           │            │ tag_id (FK)         │
           │            └─────────────────────┘
           │
┌─────────────────┐    ┌─────────────────────┐
│   projects      │    │ project_translations│
├─────────────────┤    ├─────────────────────┤
│ id (PK)         │◄───┤ id (PK)             │
│ website         │    │ project_id (FK)     │
│ repository      │    │ title (150)         │
│ created_at      │    │ description (TEXT)  │
│ updated_at      │    │ language (2)        │
└─────────────────┘    │ created_at         │
           │            │ updated_at         │
           │            └─────────────────────┘
           │                      │
           │            ┌─────────────────────┐
           │            │   project_tags      │
           │            ├─────────────────────┤
           │            │ project_id (FK)     │
           │            │ tag_id (FK)         │
           │            └─────────────────────┘
           │                      │
           └──────────────────────┘
                                  │
                         ┌─────────────────────┐
                         │     tags            │
                         ├─────────────────────┤
                         │ id (PK)             │
                         │ name (UNIQUE)       │
                         └─────────────────────┘
```

## Data Flow Patterns

### Multilingual Content Retrieval

#### Blog Content with Language

```sql
-- Get blogs with English translations
SELECT
  b.id, b.url, b.image_path,
  bt.title, bt.description,
  bt.language
FROM blogs b
JOIN blog_translations bt ON bt.blog_id = b.id
WHERE bt.language = 'EN'
ORDER BY b.created_at DESC;
```

#### Project Content with Language

```sql
-- Get projects with Spanish translations
SELECT
  p.id, p.website, p.repository,
  pt.title, pt.description,
  pt.language
FROM projects p
JOIN project_translations pt ON pt.project_id = p.id
WHERE pt.language = 'ES'
ORDER BY p.created_at DESC;
```

### Tag-Based Filtering

#### Blogs by Tag

```sql
-- Get English blogs tagged with 'REACT'
SELECT
  b.id, b.url, b.image_path,
  bt.title, bt.description
FROM blogs b
JOIN blog_translations bt ON bt.blog_id = b.id
JOIN blog_tags btag ON btag.blog_id = b.id
JOIN tags t ON t.id = btag.tag_id
WHERE bt.language = 'EN'
  AND t.name = 'REACT'
ORDER BY b.created_at DESC;
```

#### Projects by Tag

```sql
-- Get Spanish projects tagged with 'NODE'
SELECT
  p.id, p.website, p.repository,
  pt.title, pt.description
FROM projects p
JOIN project_translations pt ON pt.project_id = p.id
JOIN project_tags ptag ON ptag.project_id = p.id
JOIN tags t ON t.id = ptag.tag_id
WHERE pt.language = 'ES'
  AND t.name = 'NODE'
ORDER BY p.created_at DESC;
```

### Relationship Queries

#### All Tags for a Blog

```sql
-- Get all tags for a specific blog
SELECT t.name, t.id
FROM tags t
JOIN blog_tags bt ON bt.tag_id = t.id
WHERE bt.blog_id = 1
ORDER BY t.name;
```

#### All Tags for a Project

```sql
-- Get all tags for a specific project
SELECT t.name, t.id
FROM tags t
JOIN project_tags pt ON pt.tag_id = t.id
WHERE pt.project_id = 1
ORDER BY t.name;
```

#### Blogs with Multiple Tags

```sql
-- Get blogs tagged with both 'REACT' and 'NODE'
SELECT DISTINCT
  b.id, b.url, b.image_path,
  bt.title, bt.description
FROM blogs b
JOIN blog_translations bt ON bt.blog_id = b.id
JOIN blog_tags bt1 ON bt1.blog_id = b.id
JOIN blog_tags bt2 ON bt2.blog_id = b.id
JOIN tags t1 ON t1.id = bt1.tag_id
JOIN tags t2 ON t2.id = bt2.tag_id
WHERE bt.language = 'EN'
  AND t1.name = 'REACT'
  AND t2.name = 'NODE';
```

## Data Integrity

### Foreign Key Constraints

#### Referential Integrity Rules

- **CASCADE DELETE**: Removing a blog/project removes its translations and tag relationships
- **RESTRICT UPDATE**: Foreign key references prevent updates to primary keys
- **NOT NULL**: All foreign key fields must have valid references

#### Constraint Enforcement

```sql
-- Example of constraint violation
INSERT INTO blog_translations (blog_id, title, description, language)
VALUES (999, 'Test', 'Test', 'EN');
-- ERROR: foreign key violation - blog_id 999 does not exist
```

### Check Constraints

#### Language Validation

```sql
-- Language field check constraint
CHECK (language IN ('EN', 'ES'))

-- Example of constraint violation
INSERT INTO blog_translations (blog_id, title, description, language)
VALUES (1, 'Test', 'Test', 'FR');
-- ERROR: check constraint "language_check" violated
```

### Unique Constraints

#### Duplicate Prevention

```sql
-- Unique constraint on tags.name
UNIQUE("name")

-- Example of constraint violation
INSERT INTO tags (name) VALUES ('REACT');
-- ERROR: duplicate key value violates unique constraint "tags_name_unique"
```

#### Translation Uniqueness

```sql
-- Unique constraint on (blog_id, language)
UNIQUE("blog_id", "language")

-- Example of constraint violation
INSERT INTO blog_translations (blog_id, title, description, language)
VALUES (1, 'Another Title', 'Another Description', 'EN');
-- ERROR: duplicate key value violates unique constraint
```

