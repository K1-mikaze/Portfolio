# API Integration Documentation

## Overview

The application integrates with a **RESTful back-end API** using the native **Fetch API** with custom hooks for state management. The API integration is designed to be **reliable**, **error-resistant**, and **user-friendly**.

## API Configuration

### 1. API Endpoints

```javascript
// In App.jsx
const API = {
  blogs: "http://localhost:5678/blogs?lang=",
  tags: "http://localhost:5678/tags",
};

// Dynamic URL construction
const [url, setUrl] = React.useState(`${API.blogs + language}`);
```

### 2. API Usage Patterns

#### Blog Data Fetching

```javascript
// Base blog URL: http://localhost:5678/blogs?lang=EN
// With search: http://localhost:5678/blogs?lang=EN&match=react
// With tag: http://localhost:5678/blogs?lang=EN&tag=javascript
// With limit: http://localhost:5678/blogs?lang=EN&quantity=3
```

#### Tag Data Fetching

```javascript
// Tags URL: http://localhost:5678/tags
// Returns array of available tags
```

---

## Data Fetching Architecture

### 1. Custom Hook Pattern

#### useFetchData Implementation

```javascript
// Custom reducer for API state management
const useFetchData = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

// Usage in components
const [data, dispatch] = React.useReducer(useFetchData, {
  data: [],
  isError: false,
  isLoading: false,
});
```

### 2. Request Implementation

#### Basic Fetch Pattern

```javascript
const handleFetchBlogs = React.useCallback(async () => {
  dispatchBlogs({ type: "FETCH_INIT" });

  try {
    const response = await fetch(url);

    if (!response) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();

    dispatchBlogs({
      type: "FETCH_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.error("API Error:", error);
    dispatchBlogs({ type: "FETCH_FAILURE" });
  }
}, [url]);
```

#### URL Construction Pattern

```javascript
// Dynamic URL building
const searchAction = () => {
  setUrl(`${blogs_url}${language}&match=${searchTerm}`);
};

const searchByTag = () => {
  setUrl(`${blogs_url}${language}&tag=${event.target.value}`);
};

// In useEffect
React.useEffect(() => {
  handleFetchBlogs();
}, [handleFetchBlogs]);
```

---

## Component-Specific API Integration

### 1. HomePage.jsx Blog Fetching

#### Main Blog Display

```javascript
const HomePage = ({ url, setUrl, blogs_url, tags_url }) => {
  const [blogs, dispatchBlogs] = React.useReducer(useFetchData, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchBlogs = React.useCallback(async () => {
    dispatchBlogs({ type: "FETCH_INIT" });
    try {
      const response = await fetch(url);

      if (!response) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      dispatchBlogs({
        type: "FETCH_SUCCESS",
        payload: data,
        isLoading: false,
      });
    } catch (error) {
      dispatchBlogs({ type: "FETCH_FAILURE" });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchBlogs();
  }, [handleFetchBlogs]);
};
```

#### Search Integration

```javascript
const SearchAside = ({ language, setUrl, tags_url, blogs_url }) => {
  const searchAction = () => {
    setUrl(`${blogs_url}${language}&match=${searchTerm}`);
  };

  const searchByTag = (event) => {
    setUrl(`${blogs_url}${language}&tag=${event.target.value}`);
  };
};
```

### 2. Portfolio.jsx Featured Blogs

#### Featured Carousel Data

```javascript
const FeaturedCarousel = ({ blogs_url, text }) => {
  const [blogs, dispatchBlogs] = React.useReducer(useFetchData, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchBlogs = React.useCallback(async () => {
    dispatchBlogs({ type: "FETCH_INIT" });
    try {
      const response = await fetch(`${blogs_url}${language}&quantity=3`);

      if (!response) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      dispatchBlogs({
        type: "FETCH_SUCCESS",
        payload: data,
        isLoading: false,
        isError: false,
      });
    } catch (error) {
      dispatchBlogs({ type: "FETCH_FAILURE" });
    }
  }, [blogs_url]);

  React.useEffect(() => {
    handleFetchBlogs();
  }, [handleFetchBlogs]);
};
```

### 3. Tags Fetching

#### Tag Data Management

```javascript
// In SearchAside component
const [tags, dispatchTags] = React.useReducer(useFetchData, {
  data: [],
  isError: false,
  isLoading: false,
});

const handleFetchTags = React.useCallback(async () => {
  dispatchTags({ type: "FETCH_INIT" });
  try {
    const response = await fetch(tags_url);

    if (!response) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();

    dispatchTags({
      type: "FETCH_SUCCESS",
      payload: data,
      isLoading: true, // Note: Might be bug
    });
  } catch (error) {
    dispatchTags({ type: "FETCH_FAILURE" });
  }
}, [tags_url]);
```

---

## Error Handling Strategy

### 1. HTTP Error Handling

#### Response Validation

```javascript
const response = await fetch(url);

if (!response) {
  throw new Error(`Error ${response.status}`);
}

if (!response.ok) {
  throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
}
```

#### Network Error Handling

```javascript
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  if (error.name === "TypeError") {
    console.error("Network error:", error.message);
  } else if (error.name === "SyntaxError") {
    console.error("JSON parsing error:", error.message);
  } else {
    console.error("Unknown error:", error);
  }
}
```

### 2. User Error Display

#### Error States in UI

```javascript
// Loading state
{
  isLoading ? <Loading /> : <ContentDisplay />;
}

// Error state
{
  isError && <p>Something Went Wrong</p>;
}

// No content state
{
  data.length > 0 ? <BlogList blogs={data} /> : <h1>No Content Found</h1>;
}
```

### 3. Retry Mechanism

#### Basic Retry Pattern

```javascript
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;

      // Exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, Math.pow(2, i) * 1000),
      );
    }
  }
};
```

---
