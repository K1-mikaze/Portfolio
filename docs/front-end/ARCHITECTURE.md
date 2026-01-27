# Architecture Overview

## System Architecture

The front-end application follows a **component-based architecture** with **separation of concerns** and **clear data flow patterns**. The architecture is designed to be maintainable, scalable, and testable.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                     │
├─────────────────────────────────────────────────────────────┤
│  App.jsx (Root Component)                              │
│  ├── Global State Management                              │
│  ├── API Configuration                                   │
│  ├── Routing Setup                                       │
│  └── Theme & Language Management                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Page Layer                          │
├─────────────────────────────────────────────────────────────┤
│  HomePage.jsx                                          │
│  ├── Blog Display Logic                                  │
│  ├── Search Functionality                                │
│  └── Tag Filtering                                     │
│                                                        │
│  Portfolio.jsx                                         │
│  ├── Personal Showcase                                   │
│  ├── Projects Display                                   │
│  └── Contact Form                                      │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                 Component Layer                         │
├─────────────────────────────────────────────────────────────┤
│  StaticAside.jsx      │  Loading.jsx  │  SVG.jsx     │
│  ├── Navigation       │  ├── States   │  ├── Icons    │
│  ├── User Profile     │  ├── Loading  │  ├── Assets   │
│  └── Theme Controls   │  └── UI      │  └── Display   │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow Architecture

### 1. Global State Flow

```
User Action → Component → useStorageState → localStorage → Re-render
    ↓
State Persistence ← useStorageState ← localStorage ← Initial Load
```

### 2. API Data Flow

```
Component → useFetchData → API Call → Response → State Update → UI Render
    ↓
Error Handling ← Catch Error ← useFetchData ← API Error
```

### 3. Component Communication

```
Props (Parent → Child)
    │
Events (Child → Parent)
    │
Custom Hooks (Shared Logic)
```

## Core Architectural Patterns

### 1. Single Responsibility Principle

Each component has a single, well-defined purpose:

- **StaticAside**: Navigation and user controls
- **HomePage**: Blog content management and search
- **Portfolio**: Personal information showcase
- **Loading**: Loading state display

### 2. Separation of Concerns

- **Logic**: Custom hooks for reusable logic
- **Presentation**: Components focus on UI rendering
- **State**: Dedicated state management patterns
- **Data**: API communication isolated in hooks

### 3. Hierarchical Data Flow

```
App (Root)
├── State & Configuration
├── Routing Logic
└── Pages
    ├── Page-Specific State
    └── Components
        ├── Component Props
        └── Event Handlers
```

## Routing Architecture

### React Router Implementation

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/portfolio" element={<Portfolio />} />
  </Routes>
</BrowserRouter>
```

### Route Characteristics

- **Client-side routing** with React Router DOM
- **Static routes** for different pages
- **URL-based navigation** without page reloads
- **Component-level state** preserved on navigation

## State Management Architecture

### 1. Local Storage Pattern

```javascript
// Persistent state across sessions
const [value, setValue] = useStorageState(key, initialValue);

// Implementation
useState(localStorage.getItem(key) || initialValue);
useEffect(() => localStorage.setItem(key, value));
```

### 2. API State Pattern

```javascript
// Async data management with reducer
const [state, dispatch] = useReducer(useFetchData, initialState);

// State structure
{
  data: [],
  isLoading: false,
  isError: false
}
```

### 3. Component State Pattern

```javascript
// Local component state
const [localState, setLocalState] = useState(initialValue);

// Derived state
const computedValue = useMemo(() => computeValue(state), [state]);
```

## Component Architecture

### 1. Component Composition

```
App
├── StaticAside (Shared across pages)
└── Page Content
    ├── HomePage
    │   ├── Blog Grid
    │   └── Search Aside
    └── Portfolio
        ├── Personal Info
        ├── Projects Grid
        └── Contact Form
```

## API Integration Architecture

### 1. API Configuration

```javascript
const API = {
  blogs: "http://localhost:5678/blogs?lang=",
  tags: "http://localhost:5678/tags",
};
```

### 2. Request Pattern

```javascript
// Async data fetching with error handling
const handleFetch = useCallback(async () => {
  dispatch({ type: "FETCH_INIT" });
  try {
    const response = await fetch(url);
    const data = await response.json();
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FETCH_FAILURE" });
  }
}, [url]);
```

### 3. Error Handling Strategy

```
API Error → Catch Block → Error State → User Notification
    ↓
Loading State → Success State → Data Display → Success
```

## Styling Architecture

### 1. CSS Organization

```
style/
├── colorschemes.css    (Theme definitions)
├── HomePage.css       (Page-specific styles)
├── Portfolio.css      (Page-specific styles)
├── StaticAside.css    (Component-specific styles)
└── Loading.css        (Component-specific styles)
```

### 2. Theming System

```css
:root {
  --primary-color: #...;
  --background-color: #...;
  --text-color: #...;
}

/* Dynamic theme application */
[theme="GRUVBOX_DARK"] {
  --primary-color: #...;
}
```

### 3. Responsive Design Strategy

```css
/* Mobile-first approach */
.grid-container {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .grid-container {
    flex-direction: row;
  }
}
```

## Performance Architecture

### 1. Rendering Optimization

- **React.memo** for component memoization
- **useCallback** for function memoization
- **useMemo** for expensive computations
- **Lazy loading** for code splitting

### 2. Bundle Optimization

- **Vite build optimization**
- **Dynamic imports** for large components
- **Asset optimization** in public folder
- **Tree shaking** for unused code elimination

### 3. Runtime Performance

- **Efficient state updates**
- **Minimal re-renders**
- **Optimized API calls**
- **Image lazy loading**

## Security Architecture

### 1. Input Validation

```javascript
// Form validation patterns
const validateInput = (input) => {
  return input.trim() !== "" && input.length <= maxLength;
};
```

### 2. XSS Prevention

- **React's built-in XSS protection**
- **Proper text content rendering**
- **Sanitized API responses**
- **Secure form submission**

### 3. HTTPS Enforcement

```javascript
// Secure API communication
const secureApi = "https://api.example.com";
```

## Accessibility Architecture

### 1. Semantic HTML

```jsx
<article> <section> <nav> <aside> <header> <footer>
```

### 2. Accessibility Features

- **ARIA labels** for screen readers
- **Keyboard navigation** support
- **Focus management** in dynamic content
- **Color contrast** compliance

### 3. Progressive Enhancement

- **Base functionality** without JavaScript
- **Enhanced experience** with JavaScript
- **Graceful degradation** for older browsers

## Future Extensibility

### 1. Scalability Patterns

- **Component modularity** for new features
- **Hook reusability** for shared logic
- **API abstraction** for backend changes
- **Theme extensibility** for new color schemes

### 2. Maintenance Strategy

- **Clear separation** of concerns
- **Well-documented** patterns
- **Consistent coding** conventions
- **Testable architecture**

