# API Endpoints Documentation

## Content Types

- **Request**: `application/json`
- **Response**: `application/json`

## Supported Languages

- `EN` - English
- `ES` - Spanish

## Error Response Format

```json
{
  "error": "Error description"
}
```

## Blog Endpoints

### Get Blogs

**GET** `/blogs`

Retrieve blogs with various filtering options.

#### Parameters

| Parameter | Type   | Required | Description                              |
| --------- | ------ | -------- | ---------------------------------------- |
| lang      | string | Yes      | Language code (EN/ES)                    |
| match     | string | No       | Search in blog titles (case-insensitive) |
| tag       | string | No       | Filter by tag name                       |
| quantity  | number | No       | Limit number of results                  |

#### Query Combinations

- `?lang=EN` - Get all English blogs
- `?lang=ES&match=REACT` - Search Spanish blogs containing "REACT" in title
- `?lang=EN&tag=JAVASCRIPT` - Get English blogs tagged with "JAVASCRIPT"
- `?lang=EN&quantity=5` - Get 5 most recent English blogs
- `?lang=ES&tag=REACT&quantity=3` - Get 3 Spanish React blogs

#### Response Format

```json
[
  {
    "id": 1,
    "url": "blog-post-url",
    "image_path": "/images/blog.jpg",
    "title": "Blog Title",
    "description": "Blog description",
    "tags": [
      {
        "id": 1,
        "name": "React"
      }
    ]
  }
]
```

#### Example Request

```bash
GET /blogs?lang=EN&tag=JAVASCRIPT&quantity=5
```

### Get Blogs by Tag

**GET** `/blogs?lang=&tag=`

Retrieve blogs filtered by a specific tag.

#### Parameters

| Parameter | Type   | Required | Description                     |
| --------- | ------ | -------- | ------------------------------- |
| tag       | string | Yes      | Tag name (URL parameter)        |
| lang      | string | Yes      | Language code (query parameter) |

#### Example Request

```bash
GET /blogs?lang=en&tag=react
```

#### Response Format

Same as `/blogs` endpoint, filtered by specified tag.

---

## Project Endpoints

### Get Projects

**GET** `/projects`

Retrieve projects with optional language filtering.

#### Parameters

| Parameter | Type   | Required | Description             |
| --------- | ------ | -------- | ----------------------- |
| lang      | string | Yes      | Language code (EN/ES)   |
| quantity  | number | No       | Limit number of results |

#### Query Combinations

- `?lang=EN` - Get projects with English content
- `?lang=ES` - Get projects with Spanish content
- `?lang=EN&quantity=3` - Get 3 English projects

#### Response Format

```json
[
  {
    "id": 1,
    "website": "https://example.com",
    "repository": "https://github.com/user/repo",
    "title": "Project Title",
    "description": "Project description",
    "tags": [
      {
        "id": 1,
        "name": "React"
      }
    ]
  }
]
```

#### Example Request

```bash
GET /projects?lang=EN&quantity=5
```

---

## Tag Endpoints

### Get All Tags

**GET** `/tags`

Retrieve all available tags.

#### Response Format

```json
[
  {
    "id": 1,
    "name": "React"
  },
  {
    "id": 2,
    "name": "JavaScript"
  }
]
```

#### Example Request

```bash
GET /tags
```

---

## Rate Limiting

### Request Limits

- **100 requests per 15 minutes** per IP address
- **Progressive delay** after 50 requests in the same window

### Rate Limit Headers

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
```

### Error Response

When rate limit is exceeded:

```json
{
  "error": "Too many request"
}
```

Status: `429 Too Many Requests`

---

## Response Codes

| Status | Description                             |
| ------ | --------------------------------------- |
| 200    | Successful request                      |
| 400    | Bad Request (invalid parameters)        |
| 429    | Too Many Requests (rate limit exceeded) |
| 500    | Internal Server Error                   |

---

## Data Validation

### Language Validation

- Must be exactly `EN` or `ES` (lowercase or uppercase)
- Case-insensitive input accepted
- Invalid language returns 400 Bad Request

### Parameter Validation

- `quantity`: Must be positive integer if provided
- `match`: String search in titles (SQL escaped)
- `tag`: Must match existing tag name
- All string parameters are trimmed

---

## Search Functionality

### Title Search

- Uses SQL `ILIKE` for case-insensitive search
- Special characters are properly escaped
- Searches within blog titles only

### Tag Filtering

- Exact tag name matching
- Tags are returned with capitalized names
- Case-insensitive input accepted

---

## Response Examples

### Successful Blog Retrieval

```json
GET /blogs?lang=EN&quantity=2

[
  {
    "id": 1,
    "url": "react-hooks-tutorial",
    "image_path": "/images/react-hooks.jpg",
    "title": "Understanding React Hooks",
    "description": "A comprehensive guide to React Hooks",
    "tags": [
      {
        "id": 1,
        "name": "React"
      },
      {
        "id": 2,
        "name": "JavaScript"
      }
    ]
  },
  {
    "id": 2,
    "url": "nodejs-api-design",
    "image_path": "/images/nodejs.jpg",
    "title": "Building REST APIs with Node.js",
    "description": "Best practices for Node.js API development",
    "tags": [
      {
        "id": 2,
        "name": "JavaScript"
      },
      {
        "id": 3,
        "name": "Node.js"
      }
    ]
  }
]
```

### Successful Project Retrieval

```json
GET /projects?lang=EN&quantity=1

[
  {
    "id": 1,
    "website": "https://myportfolio.com",
    "repository": "https://github.com/user/portfolio",
    "title": "Portfolio Website",
    "description": "Personal portfolio built with React and Node.js",
    "tags": [
      {
        "id": 1,
        "name": "React"
      },
      {
        "id": 4,
        "name": "Node.js"
      }
    ]
  }
]
```

### Error Response

```json
GET /blogs?lang=INVALID

{
  "error": "Bad Request"
}
```

---

## Integration Examples

### JavaScript/TypeScript

```typescript
// Fetch English React blogs
const response = await fetch("/blogs?lang=EN&tag=REACT&quantity=5");
const blogs = await response.json();

// Fetch English projects
const projectResponse = await fetch("/projects?lang=EN");
const projects = await projectResponse.json();

// Get all available tags
const tagsResponse = await fetch("/tags");
const tags = await tagsResponse.json();

// Search blogs by title
const searchResponse = await fetch("/blogs?lang=EN&match=HOOKS");
const searchResults = await searchResponse.json();
```

### cURL

```bash
# Get all English blogs
curl -X GET "http://localhost:3000/blogs?lang=EN"

# Get 3 projects
curl -X GET "http://localhost:3000/projects?lang=EN&quantity=3"

# Get all available tags
curl -X GET "http://localhost:3000/tags"

# Search blogs by title
curl -X GET "http://localhost:3000/blogs?lang=EN&match=TUTORIAL"
```

### React Integration Example

```jsx
import React, { useState, useEffect } from "react";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/blogs?lang=EN&quantity=5");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>
          <p>{blog.description}</p>
          <div>
            {blog.tags.map((tag) => (
              <span key={tag.id}>{tag.name} </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
```

---
