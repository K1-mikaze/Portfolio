# Components Documentation

## Component Catalog

This document provides comprehensive documentation for all reusable components in the application. Components are designed with **single responsibility**, **reusability**, and **clear prop interfaces**.

## Component Overview

```
┌─────────────────┬──────────────────┬─────────────────┐
│   Component    │    Purpose       │    Usage        │
├─────────────────┼──────────────────┼─────────────────┤
│ StaticAside    │ Navigation &    │ All pages       │
│               │ User Controls    │                 │
├─────────────────┼──────────────────┼─────────────────┤
│ Loading        │ Loading State    │ Async data      │
│               │ Display         │ fetching         │
├─────────────────┼──────────────────┼─────────────────┤
│ SVG           │ Icon Assets     │ Throughout      │
│               │ Management      │ application     │
└─────────────────┴──────────────────┴─────────────────┘
```

---

## StaticAside.jsx

### Purpose

The **StaticAside** component provides persistent navigation and user controls across all pages. It displays personal information, social links, page navigation, and theme/language controls.

### Props Interface

| Prop             | Type       | Required | Description                     |
| ---------------- | ---------- | -------- | ------------------------------- |
| `language`       | `string`   | Yes      | Current language ('EN' or 'ES') |
| `handleLanguage` | `function` | Yes      | Language toggle callback        |
| `theme`          | `string`   | Yes      | Current theme identifier        |
| `handleTheme`    | `function` | Yes      | Theme change callback           |

### Implementation Details

#### Text Management

```javascript
// Bilingual text support
const ES_text = {
  title: "Desarrollador de Software",
  home_url: "Inicio",
  portfolio_url: "Portafolio",
  // ... more translations
};

const EN_text = {
  title: "Software Developer",
  home_url: "Home",
  portfolio_url: "Portfolio",
  // ... more translations
};
```

#### User Interface Structure

```jsx
<aside className="static-aside">
  <img src={meImg} alt="Me IMG" />
  <h1>Sergio IA</h1>
  <h3>{title}</h3>

  {/* Social Links */}
  <div className="icons-container">
    <GithubSVG />
    <LinkedInSVG />
  </div>

  {/* Navigation */}
  <ol className="aside-links">
    <li>
      <a href="/">{home_url}</a>
    </li>
    <li>
      <a href="/portfolio">{portfolio_url}</a>
    </li>
  </ol>

  {/* Controls */}
  <button onClick={handleLanguage}>{language_btn}</button>
  <select value={theme} onChange={handleTheme}>
    {/* Theme options */}
  </select>
</aside>
```

### Theme Options

- **Gruvbox Light** (default)
- **Catppuccin Latte**
- **Gruvbox Dark**
- **Catppuccin Mocha**

### State Management

- **Props-driven**: No internal state
- **Parent control**: All state passed from parent
- **Event delegation**: User actions passed to parent handlers

### Styling Approach

- **Component-scoped CSS** in `StaticAside.css`
- **Responsive design** with mobile-first approach
- **Theme-aware** using CSS custom properties

---

## Loading.jsx

### Purpose

The **Loading** component provides visual feedback during asynchronous operations. It displays a spinning sand clock icon to indicate data loading.

### Props Interface

| Prop     | Type | Required | Description         |
| -------- | ---- | -------- | ------------------- |
| No props | -    | -        | Stateless component |

### Implementation Details

#### SVG Icon Integration

```javascript
// Uses shared SVG icon from components
return (
  <div className="loading-container">
    <SandClockSVG />
  </div>
);
```

#### Animation Logic

```css
/* Loading animation in Loading.css */
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### Usage Patterns

```jsx
// During data fetching
{
  isLoading ? <Loading /> : <DataDisplay data={data} />;
}

// Error state handling
{
  isError ? (
    <ErrorMessage />
  ) : isLoading ? (
    <Loading />
  ) : (
    <DataDisplay data={data} />
  );
}
```

### Styling Characteristics

- **Centered layout** with flexbox
- **Rotating animation** for visual feedback
- **Responsive sizing** that adapts to container
- **Theme-aware** colors

---

## SVG.jsx

### Purpose

The **SVG** component serves as a centralized icon library containing all SVG icons used throughout the application. Each icon is a separate functional component.

### Available Icons

#### Social Media Icons

**GithubSVG**

- **Purpose**: GitHub social link
- **Color**: Black fill (theme-adaptive)
- **Usage**: About section and portfolio

**LinkedInSVG**

- **Purpose**: LinkedIn social link
- **Color**: Black fill (theme-adaptive)
- **Usage**: About section and portfolio

#### UI Icons

**TagSVG**

- **Purpose**: Tag/category display
- **Color**: Light gray (#e3e3e3)
- **Usage**: Blog tags and search section

#### Technology Icons

- **ReactSVG**: React framework icon
- **NodeSVG**: Node.js runtime icon
- **JavascriptSVG**: JavaScript language icon
- **TypescriptSVG**: TypeScript language icon
- **NixSVG**: Nix package manager icon
- **SpringSVG**: Spring Boot framework icon
- **FlutterSVG**: Flutter framework icon
- **GitSVG**: Git version control icon
- **HtmlSVG**: HTML markup icon
- **JavaSVG**: Java language icon
- **DartSVG**: Dart language icon
- **CssSVG**: CSS styling icon
- **ExpressSVG**: Express.js framework icon
- **DebianSVG**: Debian OS icon
- **MintSVG**: Linux Mint OS icon
- **UbuntuSVG**: Ubuntu OS icon
- **CodeSVG**: Generic code icon

### Implementation Pattern

#### Component Structure

```javascript
const IconNameSVG = () => (
  <svg
    fill="#000000"
    width="800px"
    height="800px"
    viewBox="..."
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* SVG paths */}
  </svg>
);
```

#### Usage Examples

```javascript
// Import individual icons
import { GithubSVG, ReactSVG, NodeSVG } from "./SVG.jsx";

// Use in components
<a href="https://github.com/user">
  <GithubSVG />
</a>

// Technology display
<div className="tech-card">
  <ReactSVG />
  <span>React</span>
</div>
```

### Styling Integration

- **CSS Fill Color**: Adapts to theme via CSS custom properties
- **Responsive Sizing**: Uses relative units for scaling
- **Consistent Styling**: All icons share similar sizing patterns

### Performance Considerations

- **SVG inline**: No additional HTTP requests
- **Tree-shakable**: Individual imports reduce bundle size
- **Minimal code**: Optimized SVG paths
- **No dependencies**: Pure JavaScript/React

---

## Component Usage Guidelines

### Best Practices

1. **Props Validation**

   ```javascript
   // Validate required props
   Component.propTypes = {
     language: PropTypes.string.isRequired,
     handleLanguage: PropTypes.func.isRequired,
   };
   ```

2. **Event Handling**

   ```javascript
   // Use useCallback for performance
   const handleClick = useCallback(
     (value) => {
       onAction(value);
     },
     [onAction],
   );
   ```

3. **Styling Consistency**
   ```css
   /* Use BEM methodology */
   .component-name {
   }
   .component-name--modifier {
   }
   .component-name__element {
   }
   ```

### Component Communication

#### Parent → Child (Props)

```javascript
<StaticAside
  language={language}
  handleLanguage={handleLanguage}
  theme={theme}
  handleTheme={handleTheme}
/>
```

#### Child → Parent (Events)

```javascript
// Child component
const handleClick = () => {
  onThemeChange(newTheme);
};

// Parent component
<Child onThemeChange={handleThemeChange} />;
```

#### Shared Logic (Custom Hooks)

```javascript
// Reusable logic across components
const sharedLogic = useCustomHook();

<StaticAside config={sharedLogic.config} />
<HomePage data={sharedLogic.data} />
```

---

## Component Evolution

### Future Enhancements

1. **TypeScript Migration**: Add prop type definitions
2. **Accessibility**: ARIA labels and keyboard navigation
3. **Testing**: Unit tests for all components
4. **Storybook**: Component documentation and testing
5. **Performance**: Further optimization with memoization

### Maintenance Guidelines

1. **Single Responsibility**: Each component has one clear purpose
2. **Consistent API**: Standardized prop patterns
3. **Clear Documentation**: Keep this documentation updated
4. **Version Control**: Track component changes
5. **User Testing**: Validate component interactions

---

