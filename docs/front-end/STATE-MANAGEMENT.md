# State Management Documentation

## Overview

The application uses a **hybrid state management approach** combining React's built-in hooks with custom hooks for persistent data and API state management. This approach provides **predictable state patterns**, **data persistence**, and **clean separation of concerns**.

## State Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Global State Management                 │
├─────────────────────────────────────────────────────────────┤
│  Local Storage State    │    API State              │
│  (Persistence)         │    (Async Data)            │
│                       │                             │
│  ┌─ useStorageState   │    ┌─ useFetchData        │
│  └─ Theme, Language   │    └─ Blogs, Tags         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                Component State                          │
├─────────────────────────────────────────────────────────────┤
│  ┌─ Local useState                                   │
│  │  ├─ Form inputs (Portfolio.jsx)                  │
│  │  ├─ UI interactions (HomePage.jsx)                 │
│  │  └─ Component-specific data                        │
│  └─ Derived State                                     │
│     ├─ Computed values                                │
│     └─ Filtered results                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Custom Hooks

### 1. useStorageState Hook

#### Purpose

Provides **persistent state management** using browser's localStorage. Enables state to persist across browser sessions and page reloads.

#### Implementation

```javascript
const useStorageState = (key, initialState) => {
  // Initialize from localStorage or fallback
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  // Persist changes to localStorage
  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};
```

#### Usage Examples

**Theme Management:**

```javascript
// In App.jsx
const [theme, setTheme] = useStorageState(
  "theme",
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "GRUVBOX_DARK"
    : "",
);

// Theme change handler
const handleTheme = () => {
  setTheme(event.target.value);
};
```

**Language Management:**

```javascript
// Language preference persistence
const [language, setLanguage] = useStorageState(
  "language",
  userLanguage === "EN" ? "EN" : "ES",
);

// Language toggle
const handleLanguage = () => {
  if (language === "EN") {
    setLanguage("ES");
    setUrl(`${API.blogs}ES`);
  } else {
    setLanguage("EN");
    setUrl(`${API.blogs}EN`);
  }
};
```

**Search Term Persistence:**

```javascript
// In HomePage.jsx SearchAside
const [searchTerm, setSearchTerm] = useStorageState("search", "");

// Search input handler
const handleSearchInput = (event) => {
  setSearchTerm(event.target.value);
};
```

#### Data Structure

```javascript
// Stored in localStorage
{
  "theme": "GRUVBOX_DARK",
  "language": "EN",
  "search": "react hooks"
}
```

#### Performance Considerations

- **Synchronous localStorage access** (fast for small data)
- **Effect dependency optimization** with proper dependency arrays
- **Memory efficient** with minimal re-renders
- **Browser compatibility** for modern browsers

#### Error Handling

```javascript
// Enhanced version with error handling
const useStorageState = (key, initialState) => {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialState;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [value, key]);

  return [value, setValue];
};
```

---

### 2. useFetchData Hook

#### Purpose

Implements **reducer pattern** for managing asynchronous API data fetching with loading and error states. Provides consistent state structure for all API calls.

#### State Structure

```javascript
// Standardized state interface
const initialState = {
  data: [], // Fetched data
  isLoading: false, // Loading indicator
  isError: false, // Error state
};
```

#### Reducer Implementation

```javascript
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
```

#### Usage Examples

**Blogs Data Fetching:**

```javascript
// In HomePage.jsx
const [blogs, dispatchBlogs] = useReducer(useFetchData, {
  data: [],
  isError: false,
  isLoading: false,
});

// Fetch function with memoization
const handleFetchBlogs = useCallback(async () => {
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
    dispatchBlogs({ type: "FETCH_FAILURE" });
  }
}, [url]);
```

**Tags Data Fetching:**

```javascript
// In HomePage.jsx SearchAside
const [tags, dispatchTags] = useReducer(useFetchData, {
  data: [],
  isError: false,
  isLoading: false,
});

// Similar fetch pattern for tags
const handleFetchTags = useCallback(async () => {
  // ... same pattern as blogs
}, [tags_url]);
```

#### State Flow Pattern

```
User Action → handleFetch → FETCH_INIT → isLoading: true
    ↓
API Call → Success → FETCH_SUCCESS → data: [...], isLoading: false
    ↓
API Call → Error → FETCH_FAILURE → isError: true, isLoading: false
```

#### Performance Optimizations

```javascript
// Memoized callback to prevent unnecessary re-renders
const handleFetchBlogs = useCallback(async () => {
  // ... fetch logic
}, [url]); // Only recreate when URL changes

// Effect only runs when fetch function changes
useEffect(() => {
  handleFetchBlogs();
}, [handleFetchBlogs]);
```

---

## Component State Management

### 1. Local Component State

#### useState Patterns

```javascript
// Form inputs in Portfolio.jsx
const [contactData, setContactData] = React.useState({
  name: { info: "", error: false },
  email: { info: "", error: false },
  message: { info: "", error: false },
});

// Carousel state in Portfolio.jsx
const [currentIndex, setCurrentIndex] = useState(0);

// Form submission state
const [isSubmitted, setIsSubmitted] = useState(false);
```

#### Derived State

```javascript
// Computed values without extra state
const featuredBlogs = blogs.data.slice(0, blogs.data.length);

// Conditional styling based on state
const hasContent = blogs.data.length > 0;

// Filtered data
const filteredProjects = projects.filter((project) =>
  project.tags.includes(selectedTag),
);
```

### 2. Event-Driven State Updates

#### Form Handling

```javascript
// Controlled input pattern
const handleContactChange = (event) => {
  const { name, value } = event.target;
  setContactData((prev) => ({
    ...prev,
    [name]: { info: value, error: false },
  }));
};
```

#### Navigation State

```javascript
// Carousel navigation
const nextSlide = () => {
  setCurrentIndex((prev) => (prev + 1) % featuredBlogs.length);
};

const prevSlide = () => {
  setCurrentIndex((prev - 1 + featuredBlogs.length) % featuredBlogs.length);
};
```

---

## Data Flow Patterns

### 1. Top-Down Data Flow

```
App.jsx (Global State)
    ↓
HomePage.jsx (Page State)
    ↓
MidleSection & SearchAside (Component State)
    ↓
Card & Form Elements (UI State)
```

### 2. Event Bubbling Pattern

```
User Input → Component Handler → Parent Callback → Global Update
```

### 3. Async Data Flow

```
Component Mount → useEffect → API Call → State Update → Re-render
```

---

## Performance Optimization

### 1. State Update Optimization

#### useCallback for Functions

```javascript
// Memoize expensive functions
const handleSearchInput = useCallback((event) => {
  setSearchTerm(event.target.value);
}, []); // No dependencies - stable reference

const searchAction = useCallback(() => {
  setUrl(`${blogs_url}${language}&match=${searchTerm}`);
}, [searchTerm, blogs_url, language]);
```

#### useMemo for Computations

```javascript
// Memoize expensive calculations
const processedBlogs = useMemo(
  () =>
    blogs.data.map((blog) => ({
      ...blog,
      processedTitle: blog.title.trim(),
      shortDescription: blog.description.substring(0, 100),
    })),
  [blogs.data],
);
```

### 2. Re-render Optimization

#### Dependency Arrays

```javascript
// Only re-run when dependencies change
useEffect(() => {
  // Expensive operation
}, [dependency1, dependency2]); // Specific dependencies
```

#### State Batching

```javascript
// Batch multiple state updates
const handleMultipleUpdates = () => {
  setName(newName);
  setEmail(newEmail);
  setMessage(newMessage);
  // All updates batched together
};
```

---

## Error Handling in State Management

### 1. API Error Handling

```javascript
const handleFetchBlogs = async () => {
  dispatchBlogs({ type: "FETCH_INIT" });
  try {
    // API call
    const response = await fetch(url);
    const data = await response.json();
    dispatchBlogs({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    console.error("API Error:", error);
    dispatchBlogs({ type: "FETCH_FAILURE" });
    // Optional: User notification
  }
};
```

### 2. Form Validation

```javascript
const handleContactSubmit = async (event) => {
  event.preventDefault();

  // Validation
  const errors = validateForm(contactData);
  if (errors.hasErrors) {
    setContactData(errors.fieldErrors);
    return;
  }

  // Submit only if valid
  try {
    await submitForm(contactData);
    setIsSubmitted(true);
  } catch (error) {
    console.error("Submit error:", error);
  }
};
```

---

