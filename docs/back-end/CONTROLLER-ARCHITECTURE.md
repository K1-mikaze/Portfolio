# Controller Architecture Documentation

## Overview

The controller layer serves as the intermediary between HTTP requests and business logic, implementing the Controller Pattern to handle request processing, input validation, and response formatting.

## Controller Architecture

### Pattern Implementation

```
HTTP Request → Route → Controller → Repository → Response
      ↓         ↓        ↓          ↓         ↓
   Routing   Request  Business   Data     Formatted
   Logic    Validation  Logic   Access    JSON
```

### Controller Components

- **blogs_controller.ts**: Blog endpoint handlers
- **projects_controller.ts**: Project endpoint handlers
- **tags_controller.ts**: Tag endpoint handlers

## Design Patterns

### 1. Controller Pattern

**Purpose**: Handle user input and coordinate responses
**Implementation**: Express RequestHandler functions
**Benefits**:

- Clear separation of concerns
- Testable request handling
- Consistent request processing

### 2. Parameter Object Pattern

**Purpose**: Encapsulate request parameters
**Implementation**: Query parameter extraction and validation
**Benefits**:

- Type-safe parameter handling
- Centralized validation logic
- Consistent parameter processing

### 3. Error Handling Pattern

**Purpose**: Consistent error response format
**Implementation**: Try-catch blocks with standardized errors
**Benefits**:

- Uniform error responses
- Proper HTTP status codes
- Error logging for debugging

## Controller Implementation

### Base Controller Structure

```typescript
import { RequestHandler } from "express";

const controllerMethod: RequestHandler = async (request, response) => {
  try {
    // 1. Extract and validate parameters
    const params = extractParameters(request);

    // 2. Validate business rules
    if (!validateParameters(params)) {
      return response.status(400).json({ error: "Bad Request" });
    }

    // 3. Call repository/service
    const data = await repositoryMethod(params);

    // 4. Format and return response
    return response.status(200).json(data);
  } catch (error) {
    // 5. Error handling
    console.error("!!! Error controllerMethod:\n", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
};
```

#### Controller Features

##### 1. Parameter Extraction

```typescript
// Multi-parameter extraction with type conversion
const language: string | null = request.query.lang
  ? String(request.query.lang).trim().toUpperCase()
  : null;

const quantity: number | null = request.query.quantity
  ? Number(request.query.quantity)
  : null;
```

**Features**:

- **Type Safety**: Explicit type conversion
- **Normalization**: String trimming and case conversion
- **Null Handling**: Graceful handling of missing parameters

##### 2. Input Validation

```typescript
// Language validation
if (language == null)
  return response.status(400).json({ error: "Bad Request" });

if (language !== "EN" && language !== "ES") {
  return response.status(400).json({ error: "Bad Request" });
}
```

**Validation Rules**:

- **Required Parameters**: Language is mandatory
- **Enum Validation**: Only EN/ES allowed
- **Early Return**: Fail-fast validation approach

##### 3. Conditional Logic

```typescript
// Parameter-based repository selection
if (quantity != null && tag != null) {
  return response
    .status(200)
    .json(await getBlogsByLangAndTagAndQuantity(language, tag, quantity));
}

if (quantity != null) {
  return response
    .status(200)
    .json(await getBlogsByLangAndQuantity(language, quantity));
}
```

**Logic Flow**:

- **Specific to General**: Most specific conditions first
- **Parameter Combinations**: Handles multiple parameter scenarios
- **Default Behavior**: Fallback to basic query

##### 4. Security Considerations

```typescript
// SQL injection prevention
match = match.replace(/[%_\\]/g, "\\$&");
```

**Security Features**:

- **Input Sanitization**: Escapes special SQL characters
- **Pattern Matching**: Prevents wildcard abuse
- **Safe Queries**: Protects against injection attacks

## Error Handling Strategy

### Error Types and Handling

### 1. Validation Errors

```typescript
// Bad request handling
if (language == null) {
  return response.status(400).json({ error: "Bad Request" });
}

if (language !== "EN" && language !== "ES") {
  return response.status(400).json({ error: "Bad Request" });
}
```

**Features**:

- **Early Return**: Fail-fast validation
- **Consistent Format**: Standard error response
- **Appropriate Status**: HTTP 400 for client errors

### 2. System Errors

```typescript
// Unexpected error handling
} catch (error) {
  console.error("!!! Error getBlogs :\n", error);
  response.status(500).json({ error: "Internal Server Error" });
}
```

**Features**:

- **Error Logging**: Detailed error information
- **Generic Response**: Limited error exposure to clients
- **Standard Status**: HTTP 500 for server errors

### 3. Error Response Format

```typescript
// Consistent error structure
{
  "error": "Error description",
  "message": "Additional context (optional)"
}
```

## Input Validation Patterns

### 1. Type Conversion and Validation

```typescript
// Safe number conversion
const quantity: number | null = request.query.quantity
  ? Number(request.query.quantity)
  : null;

// Validation after conversion
if (quantity != null && isNaN(quantity)) {
  return response.status(400).json({ error: "Invalid quantity parameter" });
}
```

### 2. String Normalization

```typescript
// Consistent string processing
const language: string | null = request.query.lang
  ? String(request.query.lang).trim().toUpperCase()
  : null;
```

**Processing Steps**:

- **Type Conversion**: Ensure string type
- **Whitespace Removal**: Trim leading/trailing spaces
- **Case Normalization**: Convert to uppercase

## Response Patterns

### 1. Success Responses

```typescript
// Standard success response
return response.status(200).json(data);
```

**Features**:

- **Consistent Status**: HTTP 200 for successful requests
- **Direct Data**: Repository result passed through
- **JSON Format**: Automatic JSON serialization

### 2. Error Responses

```typescript
// Standard error response
return response.status(400).json({ error: "Bad Request" });
```

**Features**:

- **Appropriate Status**: HTTP status codes for error types
- **Error Object**: Consistent error response format
- **Minimal Information**: Limited error details for security

## Performance Considerations

### 1. Async Processing

- **Non-Blocking**: Async/await pattern throughout
- **Parallel Operations**: Potential for concurrent processing
- **Error Propagation**: Proper async error handling

### 2. Memory Efficiency

- **Parameter Processing**: Minimal object creation
- **Response Streaming**: Direct response from repository
- **Error Handling**: Efficient error propagation

### 3. Request Optimization

- **Early Validation**: Fail-fast parameter validation
- **Conditional Logic**: Avoid unnecessary repository calls
- **Response Caching**: Potential for response caching

## Best Practices

### 1. Single Responsibility

- **One Task**: Each controller handles one endpoint
- **Clear Purpose**: Focused responsibility
- **Minimal Logic**: Only request handling logic

### 2. Consistent Patterns

- **Standard Structure**: Consistent method implementation
- **Error Handling**: Uniform error response format
- **Parameter Processing**: Standardized validation

### 3. Testability

- **Dependency Injection**: Repository dependencies
- **Mockable**: Easy to mock for testing
- **Pure Functions**: Where possible, pure controller logic

### 4. Security

- **Input Validation**: Comprehensive parameter validation
- **Error Information**: Limited error exposure
- **Type Safety**: TypeScript for compile-time safety

