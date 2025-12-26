-- Define a custom ENUM type for URL categories
CREATE TYPE url_type AS ENUM ('IMAGE', 'BLOG', 'SOCIAL', 'CURRICULUM', 'PROJECT');

CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  type url_type NOT NULL,
  url TEXT NOT NULL, -- Changed to TEXT for longer URLs
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL, -- Changed to TEXT for potentially longer descriptions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Join table for Projects and URLs
CREATE TABLE project_urls (
  project_id INT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  url_id INT NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, url_id) -- Composite PK to prevent duplicate links
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  surname VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Join table for Users and URLs (e.g., social media links for a user)
CREATE TABLE user_urls (
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  url_id INT NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, url_id)
);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(300) NOT NULL, -- Summary of the blog, content in static HTML
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag_name VARCHAR(50) NOT NULL UNIQUE 
);

-- Join table for Blogs and Tags
CREATE TABLE blog_tags (
  blog_id INT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  tag_id INT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, tag_id)
);

-- Join table for Blogs and URLs (e.g., featured images, external references for a blog)
CREATE TABLE blog_urls (
  blog_id INT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  url_id INT NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  PRIMARY KEY (blog_id, url_id)
);
