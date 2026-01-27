# Back-End Architecture Documentation

## Overview

The back-end is a RESTful API built with Node.js and Express.js, providing content management functionality for blogs and projects. It follows a layered architecture pattern with clear separation of concerns, focusing on application architecture rather than database implementation details.

## Technology Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.2.1
- **Security**: Helmet.js, CORS, Express Rate Limiter
- **Development**: Nodemon, ts-node
- **Database Integration**: PostgreSQL via Knex.js (abstracted)

## Architecture Pattern

The application follows a **3-tier layered architecture** with dependency inversion:

```
┌─────────────────┐
│   Routes Layer  │  (Request handling & routing)
├─────────────────┤
│ Controllers     │  (Business logic & validation)
├─────────────────┤
│ Repository      │  (Data access abstraction)
├─────────────────┤
│ Database        │  (Data persistence - abstracted)
└─────────────────┘
```

## Directory Structure (Database-Agnostic)

```
src/
├── configuration/    # Environment and security configuration
├── controller/       # Request handlers and business logic
├── database/         # handle database persistency
├── repository/       # Data access layer (abstracts database)
├── route/            # API route definitions
├── util/             # Utility functions
├── app.ts            # Express application setup
└── index.ts          # Application entry point
```

## Core Architectural Components

### 1. Application Entry Point (`index.ts`)

- **Purpose**: Bootstrap the Express application
- **Responsibilities**:
  - Import and configure the Express app
  - Initialize server with environment-based port
  - Provide startup logging
- **Design Pattern**: Bootstrap pattern

### 2. Express Application (`app.ts`)

- **Purpose**: Configure Express middleware and routes
- **Middleware Stack**:
  1. **CORS**: Cross-origin resource sharing configuration
  2. **Helmet.js**: Security headers and protection
  3. **Body Parsing**: JSON and URL-encoded request handling
  4. **Rate Limiting**: Request throttling and DoS protection
  5. **Route Registration**: Modular route composition
- **Design Pattern**: Middleware chain pattern

### 3. Configuration Layer

#### Environment Management (`configuration/environment.ts`)

- **Purpose**: Centralized environment variable handling
- **Configuration Categories**:
  - Runtime mode (development/production)
  - API server configuration
  - Database connection parameters (abstracted)
- **Design Pattern**: Configuration object pattern

#### Security Configuration (`configuration/limiter.ts`)

- **Purpose**: Rate limiting and request throttling
- **Security Features**:
  - **Request Limiter**: 100 requests per 15 minutes per IP
  - **Speed Limiter**: Progressive delay after 50 requests
  - **IPv6 Support**: Subnet-based rate limiting
- **Design Pattern**: Decorator pattern for Express middleware

### 4. Repository Pattern (Data Access Layer)

#### Architecture Principles

- **Data Access Abstraction**: Hides database implementation details
- **Query Builder Integration**: Uses Knex.js for database-agnostic queries
- **Promise-Based API**: Async/await pattern for data operations

#### Repository Components

- **blogs_repository.ts**: Blog data operations with multilingual support
- **projects_repository.ts**: Project data operations
- **tags_repository.ts**: Tag data operations

#### Key Design Patterns

- **Repository Pattern**: Abstracts data source
- **Data Mapper Pattern**: Maps database rows to domain objects
- **Query Object Pattern**: Encapsulates query logic

### 5. Controller Layer (Business Logic)

#### Controller Architecture

- **Request-Response Handling**: Express RequestHandler interface
- **Input Validation**: Parameter sanitization and validation
- **Business Logic**: Core application rules and processing
- **Error Handling**: Centralized error management

#### Controller Components

- **blogs_controller.ts**: Blog endpoint handlers
- **projects_controller.ts**: Project endpoint handlers
- **tags_controller.ts**: Tag endpoint handlers

#### Design Patterns

- **Controller Pattern**: Handles user input and coordinates responses
- **Parameter Object Pattern**: Encapsulates request parameters
- **Error Handling Pattern**: Consistent error response format

### 6. Routing Layer

#### Route Architecture

- **Modular Routing**: Separate routers for each domain
- **RESTful Design**: HTTP method-based routing
- **Parameter Validation**: Route-level parameter handling

#### Route Components

- **blog_routes.ts**: Blog domain routes
- **projects_routes.ts**: Project domain routes
- **tag_routes.ts**: Tag domain routes

#### Design Patterns

- **Router Pattern**: Organizes related endpoints
- **Composition Pattern**: Combines multiple routers
- **Middleware Pattern**: Applies cross-cutting concerns

### 7. Utility Layer

#### Utility Functions (`util/string_manipulation.ts`)

- **Purpose**: Reusable helper functions
- **Functions**: String formatting and manipulation
- **Design Pattern**: Utility/Helper pattern

## Data Flow Architecture

### Request Processing Pipeline

```
HTTP Request → Routes → Controller → Repository → Database
                ↓         ↓          ↓           ↓
            Validation → Business → Data Access → Response
                ↓         ↓          ↓           ↓
            Error Handling → Formatting → Mapping → JSON Response
```

### Data Transformation Flow

```
Database Row → Repository Mapping → Controller Processing → Response Formatting
      ↓                ↓                    ↓                    ↓
Raw Data → Domain Object → Business Logic → API Response
```

## Security Architecture

### Security Layers

1. **Network Security**: CORS configuration
2. **Application Security**: Helmet.js headers
3. **Request Security**: Rate limiting and throttling
4. **Input Security**: Parameter validation and sanitization

### Security Features

- **DoS Protection**: Rate limiting with progressive delays
- **Header Security**: OWASP-recommended security headers
- **Input Validation**: Type checking and sanitization
- **Error Information**: Limited error exposure

## Error Handling Architecture

### Error Handling Strategy

- **Global Error Handling**: Try-catch blocks in controllers
- **Consistent Error Format**: Standardized error response structure
- **Logging Strategy**: Error logging for debugging
- **Client-Friendly Errors**: User-appropriate error messages

### Error Types and Handling

- **400 Bad Request**: Invalid parameters or validation failures
- **500 Internal Server Error**: Unexpected application failures
- **429 Too Many Requests**: Rate limit exceeded

## Multilingual Architecture

### Language Support Design

- **Parameter-Based Selection**: URL query parameters for language
- **Content Localization**: Separate translations per language
- **Default Language Handling**: Fallback mechanisms
- **Validation**: Language code validation (EN/ES)

### Internationalization Features

- **Dynamic Content Loading**: Language-specific data retrieval
- **Consistent API**: Same endpoints, different language content
- **Validation**: Language code enforcement

## Performance Architecture

### Performance Optimization Strategies

- **Query Optimization**: Efficient database queries via repository layer
- **Rate Limiting**: Request throttling to prevent overload
- **Connection Management**: Database connection pooling (via Knex)
- **Response Optimization**: Selective data retrieval

### Caching Strategy

- **Application-Level Caching**: Potential for in-memory caching
- **Database Caching**: Connection pooling and query optimization
- **HTTP Caching**: Headers for client-side caching

## Scalability Architecture

### Scalability Features

- **Stateless Design**: No session state in application
- **Horizontal Scaling**: Support for multiple instances
- **Database Scaling**: Connection pooling and query optimization
- **Rate Limiting**: Prevents resource exhaustion

### Load Distribution

- **Request Distribution**: Stateless design enables load balancing
- **Database Load**: Connection pooling and efficient queries
- **Resource Management**: Rate limiting prevents overload

## Configuration Management

### Environment-Based Configuration

- **Development Environment**: Debug features and detailed logging
- **Production Environment**: Optimized settings and security
- **Configuration Injection**: Environment-based configuration loading

### Configuration Categories

- **Server Configuration**: Port and host settings
- **Security Configuration**: Rate limiting and CORS
- **Database Configuration**: Connection parameters (abstracted)

## Development Architecture

### Development Workflow

- **Development Environment**: Provided by Nix flakes for easy replicaction of the environment
- **Hot Reloading**: Nodemon for development efficiency
- **TypeScript Compilation**: Type safety and development experience
- **Modular Design**: Clear separation of concerns
- **Testing Architecture**: Structure for unit and integration testing

### Build Process

- **TypeScript Compilation**: Type checking and JavaScript generation
- **Dependency Management**: npm-based package management
- **Development Server**: Hot reloading for rapid development

## Integration Architecture

### API Design Principles

- **RESTful Conventions**: Standard HTTP methods and status codes
- **Consistent Interfaces**: Uniform endpoint design
- **Stateless Operations**: No client state maintenance
- **Resource-Based Design**: Clear resource identification

### Integration Patterns

- **Repository Pattern**: Database abstraction for integration
- **Controller Pattern**: Request handling for client integration
- **Middleware Pattern**: Cross-cutting concerns for integration

## Future Architectural Considerations

### Potential Enhancements

- **Microservice Decomposition**: Service separation by domain
- **Event-Driven Architecture**: Async communication patterns
- **API Gateway**: Centralized API management
- **Caching Layer**: Redis or similar caching solution

### Architectural Debt Management

- **Code Organization**: Maintain clear separation of concerns
- **Dependency Management**: Minimize coupling between layers
- **Testing Strategy**: Comprehensive test coverage
- **Documentation**: Maintain architectural documentation

## Architectural Quality Attributes

### Maintainability

- **Modular Design**: Clear separation of concerns
- **Consistent Patterns**: Standardized architectural patterns
- **Type Safety**: TypeScript for compile-time error prevention
- **Documentation**: Comprehensive architectural documentation

### Reliability

- **Error Handling**: Comprehensive error management
- **Input Validation**: Parameter validation and sanitization
- **Rate Limiting**: Protection against overload
- **Logging**: Error tracking and debugging support

### Security

- **Layered Security**: Multiple security layers
- **Input Validation**: Protection against injection attacks
- **Rate Limiting**: DoS protection
- **Header Security**: OWASP-compliant security headers

### Performance

- **Efficient Queries**: Optimized database access
- **Connection Pooling**: Database connection management
- **Rate Limiting**: Resource protection
- **Selective Data**: Minimal data retrieval
