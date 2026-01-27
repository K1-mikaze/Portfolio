# Styling System Documentation

## Overview

The application uses a **vanilla CSS architecture** with **CSS custom properties** for theming, **BEM methodology** for component styling, and **mobile-first responsive design**. The styling system is organized to support **multiple themes**, **responsive layouts**, and **maintainable code**.

## CSS Architecture

```
src/style/
├── colorschemes.css    │  Theme definitions
├── HomePage.css       │  Page-specific styles
├── Portfolio.css      │  Page-specific styles
├── StaticAside.css    │  Component-specific styles
└── Loading.css        │  Component-specific styles
```

---

## Theme System

### 1. Color Schemes Architecture

#### CSS Custom Properties

```css
:root {
  /* Base Light Theme */
  --primary-color: #282828;
  --secondary-color: #ebdbb2;
  --background-color: #fbf1c7;
  --text-color: #282828;
  --accent-color: #d79921;
  --border-color: #d5c4a1;
  --shadow-color: rgba(40, 40, 40, 0.1);

  /* Layout */
  --header-height: 80px;
  --sidebar-width: 280px;
  --border-radius: 8px;
  --spacing-unit: 1rem;
}
```

#### Theme Variants

**Gruvbox Light** (Default)

```css
:root {
  --primary-color: #282828;
  --background-color: #fbf1c7;
  --text-color: #282828;
}
```

**Catppuccin Latte**

```css
.CATPPUCCIN_LATTE {
  --primary-color: #4c4f69;
  --background-color: #eff1f5;
  --text-color: #4c4f69;
  --accent-color: #ea76cb;
}
```

**Gruvbox Dark**

```css
.GRUVBOX_DARK {
  --primary-color: #ebdbb2;
  --background-color: #1d2021;
  --text-color: #ebdbb2;
  --accent-color: #fabd2f;
}
```

**Catppuccin Mocha**

```css
.CATPPUCCIN_MOCHA {
  --primary-color: #cdd6f4;
  --background-color: #1e1e2e;
  --text-color: #cdd6f4;
  --accent-color: #f9e2af;
}
```

### 2. Theme Application

#### JavaScript Theme Switching

```javascript
// In App.jsx
const [theme, setTheme] = useStorageState(
  "theme",
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "GRUVBOX_DARK"
    : "",
);

const handleTheme = () => {
  setTheme(event.target.value);
};

// Theme selector in StaticAside.jsx
<select value={theme} onChange={handleTheme}>
  <option value="">Light</option>
  <option value="CATPPUCCIN_LATTE">Latte</option>
  <option value="GRUVBOX_DARK">Dark</option>
  <option value="CATPPUCCIN_MOCHA">Mocha</option>
</select>;
```

#### CSS Theme Integration

```css
/* Component styles use custom properties */
.grid-container {
  background-color: var(--background-color);
  color: var(--text-color);
}

.card {
  border: 1px solid var(--border-color);
  background: var(--primary-color);
  color: var(--secondary-color);
}

.btn-primary {
  background-color: var(--accent-color);
  color: var(--background-color);
}
```

### 3. Accessibility Compliance

#### Color Contrast

```css
/* Ensure sufficient contrast ratios */
.text-primary {
  color: var(--text-color);
  /* WCAG AA compliance check */
}

.accent-element {
  background-color: var(--accent-color);
  color: var(--background-color);
  /* 4.5:1 contrast ratio minimum */
}
```

#### Focus Management

```css
button:focus,
input:focus,
select:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

.btn-primary:focus {
  transform: scale(1.05);
  box-shadow: 0 0 0 3px var(--shadow-color);
}
```

---

## Layout System

### 1. Grid Layout Architecture

#### Main Grid Container

```css
.grid-container {
  display: grid;
  grid-template-columns: 280px 1fr 300px;
  gap: var(--spacing-unit);
  min-height: 100vh;

  grid-template-areas:
    "aside aside"
    "main aside"
    "aside aside";
}
```

#### Responsive Breakpoints

```css
@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: 280px 1fr;
    grid-template-areas:
      "aside main"
      "aside aside";
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: 280px 1fr 300px;
    grid-template-areas: "aside main aside";
  }
}
```

### 2. Component Layout Patterns

#### Article Layout

```css
/* HomePage and Portfolio layout */
.grid-page {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: var(--spacing-unit);
  min-height: 100vh;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.portfolio-section {
  margin-bottom: 4rem;
  scroll-margin-top: 2rem;
}
```

#### Card Layout

```css
/* Blog and project cards */
.card {
  display: flex;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 1.5rem;
  background: var(--primary-color);
  border: 1px solid var(--border-color);
  transition: transform 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px var(--shadow-color);
}
```

---

## Component Styling

### 1. StaticAside.css

#### Navigation Layout

```css
.static-aside {
  background: var(--primary-color);
  padding: 2rem;
  border-right: 1px solid var(--border-color);

  /* Scroll behavior */
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
```

#### Profile Section

```css
.static-aside img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid var(--accent-color);
  margin-bottom: 1rem;
}

.static-aside h1 {
  color: var(--secondary-color);
  font-size: 1.5rem;
  margin: 0.5rem 0;
}

.static-aside h3 {
  color: var(--accent-color);
  font-size: 1.1rem;
  margin-bottom: 2rem;
}
```

#### Icon Container

```css
.icons-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.icons-container svg {
  width: 24px;
  height: 24px;
  fill: var(--accent-color);
  transition: fill 0.2s ease;
}

.icons-container svg:hover {
  fill: var(--secondary-color);
  transform: scale(1.1);
}
```

### 2. HomePage.css

#### Blog Grid

```css
.center-article {
  padding: 2rem;
  min-height: calc(100vh - var(--header-height));
}

.center-article ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.center-article.no-elements {
  display: flex;
  align-items: center;
  justify-content: center;
}
```

#### Blog Cards

```css
.Card {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.Card a {
  color: inherit;
  text-decoration: none;
  display: block;
}

.Card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.Card h1 {
  color: var(--secondary-color);
  font-size: 1.25rem;
  margin: 1rem 0 0.5rem 0;
}

.Card p {
  color: var(--text-color);
  opacity: 0.8;
  line-height: 1.6;
}
```

#### Tag Styling

```css
.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.tag {
  background: var(--accent-color);
  color: var(--background-color);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}
```

### 3. Portfolio.css

#### Portfolio Sections

```css
.portfolio-section {
  background: var(--primary-color);
  border-radius: var(--border-radius);
  padding: 3rem;
  margin-bottom: 3rem;
}

.intro-section {
  background: linear-gradient(
    135deg,
    var(--primary-color),
    var(--accent-color)
  );
  color: var(--secondary-color);
}

.intro-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}
```

#### Technologies Grid

```css
.technologies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1.5rem;
}

.tech-card {
  text-align: center;
  padding: 1.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-color);
}

.tech-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.tech-name {
  font-size: 0.875rem;
  color: var(--text-color);
}
```

#### Projects Grid

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  background: var(--primary-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 2rem;
}
```

### 4. Loading.css

#### Loading Container

```css
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.loading-container svg {
  width: 48px;
  height: 48px;
  fill: var(--accent-color);
  animation: spin 2s linear infinite;
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

---

## Responsive Design

### Base Styles (Desktop)

```css
.grid-container {
  display: flex;
  flex-direction: column;
}

.Card {
  margin-bottom: 1rem;
}

.icons-container {
  justify-content: center;
}
```

### Mobile Styles

```css
@media (min-width: 768px) {
  .grid-container {
    display: grid;
    grid-template-columns: 280px 1fr;
  }

  .Card {
    margin-bottom: 0;
  }
}
```

#### Tablet Styles

```css
@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: 280px 1fr 300px;
  }

  .technologies-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
```

---

## CSS Organization

### 1. BEM Methodology

#### Block Element Modifier

```css
/* Block */
.card {
}

/* Elements */
.card__title {
}
.card__description {
}
.card__image {
}

/* Modifiers */
.card--featured {
}
.card--large {
}
```

#### Component Examples

```css
.search-aside {
}
.search-aside__input {
}
.search-aside__button {
}
.search-aside__tags {
}

.tech-grid {
}
.tech-grid__card {
}
.tech-grid__icon {
}
.tech-grid__name {
}
```

### 2. CSS Architecture Patterns

#### Imports and Structure

```css
/* colorschemes.css - Theme definitions */
:root {
  /* Light theme */
}
.GRUVBOX_DARK {
  /* Dark theme */
}

/* Component files */
@import "colorschemes.css";

.static-aside {
  /* Component styles */
}
.static-aside__navigation {
  /* Element */
}
.static-aside--collapsed {
  /* Modifier */
}
```

#### Utility Classes

```css
/* Utility classes for common patterns */
.text-center {
  text-align: center;
}
.flex {
  display: flex;
}
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  display: none;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

---

