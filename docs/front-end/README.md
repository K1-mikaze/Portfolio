# Front-End Documentation

## Project Overview

This is the front-end documentation for the Sergio IA Portfolio project - a React-based web application that serves as both a functional blog platform and a personal portfolio showcase.

## Technology Stack

- **Framework**: React 19.2.0
- **Routing**: React Router DOM 7.12.0
- **Build Tool**: Vite 7.2.4
- **Language**: JavaScript (ES6+)
- **Styling**: Vanilla CSS with CSS custom properties
- **Development**: ESLint for code quality

## Project Structure

This documentation is organized to provide different levels of understanding:

- **[Architecture](./ARCHITECTURE.md)** - How the application works as a system
- **[Components](./COMPONENTS.md)** - Component catalog and usage patterns
- **[State Management](./STATE-MANAGEMENT.md)** - Custom hooks and data flow
- **[Styling System](./STYLING-SYSTEM.md)** - CSS architecture and theming
- **[Api Integration](./API-INTEGRATION.md)** - Backend communication patterns

## Key Features

### 🌍 Multi-Language Support

- English and Spanish language options
- Persistent language preference
- Component-level text management

### 🎨 Theme System

- Multiple color schemes (Gruvbox Light/Dark, Catppuccin Mocha/Latte)
- Theme persistence across sessions
- Responsive design adaptation

### 📝 Blog Functionality

- Search by title and tag
- Dynamic content loading
- Error handling and loading states

### 👤 Portfolio Showcase

- Personal information display
- Projects showcase with links
- Contact form integration

## Getting Started

### Prerequisites

- Node.js 18+
- Modern web browser
- Local development server (back-end API)

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Configuration

- **API Endpoints**: Update in `src/App.jsx`
- **Color Schemes**: Modify in `src/style/colorschemes.css`
- **Language Support**: Add text objects in components

## Development Patterns

### Component Design

- Functional components with hooks
- Props interface documentation
- Reusable, single-responsibility design

### State Management

- Custom hooks for localStorage persistence
- Reducer pattern for API state
- Separation of concerns

### Styling Approach

- CSS custom properties for theming
- Mobile-first responsive design
- Component-scoped styling

### Error Handling

- Try-catch blocks for API calls
- User-friendly error messages
- Loading states for async operations

## Performance Considerations

### Optimizations

- Code splitting with lazy loading
- Image optimization in public folder
- Efficient state updates with useCallback/useMemo
- CSS custom properties for dynamic theming

### Monitoring

- Component re-render optimization
- API response caching strategies
- Bundle size management with Vite

## Browser Support

### Modern Browser Features Used

- ES6+ syntax
- CSS Grid and Flexbox
- CSS Custom Properties
- Fetch API
- LocalStorage API

### Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Security Considerations

### Front-End Security

- Input validation for forms
- XSS prevention in dynamic content
- HTTPS enforcement for API calls
- Content Security Policy headers

### API Communication

- HTTPS only API endpoints
- Error message sanitization
- Rate limiting awareness

---
