# Configuration and Security Documentation

## Overview

This document covers the configuration management and security implementation of the back-end API, focusing on environment-based configuration, security middleware, and rate limiting strategies.

## Configuration Architecture

### Configuration Layers

```
Environment Variables → Configuration Module → Application Components
                                ↓                           ↓
                         environment.ts            Controllers/Services
```

### Environment Configuration (`configuration/environment.ts`)

#### Configuration Object Structure

```typescript
export default {
  MODE: process.env.ENV_MODE || "development",
  API: process.env.API_PORT || 3000,
  DB_NAME: process.env.DB_NAME,
  DATABASE_URL: process.env.DB_URL,
  DB_HOST: process.env.DB_HOST || "127.0.0.1",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
};
```

#### Configuration Categories

##### 1. Runtime Configuration

- **MODE**: Application environment (development/production)
- **API**: Server port configuration
- **Default Values**: Fallback configurations for development

##### 2. Database Configuration

- **Connection Parameters**: Host, port, database name
- **Authentication**: User credentials
- **Connection URL**: Alternative connection string format

#### Environment Variable Strategy

- **Development**: Local environment variables
- **Production**: Environment-specific configuration
- **Security**: Sensitive data stored in environment variables

## Security Architecture

### Security Middleware Stack

```
Request → CORS → Helmet → Rate Limiting → Application Logic
   ↓         ↓        ↓         ↓              ↓
Origin   Security   Request   DoS          Business
Check    Headers    Throttle  Protection    Processing
```

### Security Implementation

#### 1. CORS Configuration

```typescript
app.use(cors());
```

**Purpose**: Cross-origin resource sharing management
**Features**:

- Allows cross-origin requests
- Configurable origin restrictions
- Header management for CORS

#### 2. Helmet.js Security Headers

```typescript
app.use(helmet());
```

**Security Headers Applied**:

- **X-Frame-Options**: Clickjacking protection
- **X-Content-Type-Options**: MIME type sniffing protection
- **X-XSS-Protection**: XSS filtering
- **Strict-Transport-Security**: HTTPS enforcement
- **Content-Security-Policy**: Resource loading restrictions

#### 3. Rate Limiting Strategy

##### Request Limiter (`configuration/limiter.ts`)

```typescript
const requestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // 100 requests per window
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  message: "Too many request",
});
```

**Features**:

- **Time Window**: 15-minute sliding window
- **Request Limit**: 100 requests per IP per window
- **IPv6 Support**: Subnet-based limiting for IPv6
- **Headers**: Standard rate limit headers
- **Custom Message**: User-friendly error response

##### Speed Limiter

```typescript
const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000, // 15 minutes
  delayAfter: 50, // Start delaying after 50 requests
  delayMs: (hits) => hits * 100, // Progressive delay
});
```

**Progressive Delay Strategy**:

- **Requests 1-50**: No delay
- **Request 51**: 100ms delay
- **Request 52**: 200ms delay
- **Request N**: (N-50) \* 100ms delay

### Security Features

#### 1. DoS Protection

- **Request Rate Limiting**: Prevents request flooding
- **Progressive Delays**: Discourages rapid requests
- **IP-based Tracking**: Per-client rate limiting

#### 2. Input Validation

- **Parameter Sanitization**: String trimming and case normalization
- **Type Validation**: Parameter type checking
- **Range Validation**: Numeric parameter validation

#### 3. Error Information Security

- **Limited Error Exposure**: Minimal error details to clients
- **Consistent Error Format**: Standardized error responses
- **Server-Side Logging**: Detailed error logging for debugging

## Rate Limiting Implementation

### Rate Limiting Architecture

```
Client Request → Rate Limiter → Speed Limiter → Application
       ↓              ↓              ↓              ↓
   IP Tracking    Request Count   Delay Calculation  Processing
```

### Rate Limiting Configuration

#### Request Limiter Configuration

| Parameter       | Value              | Description                   |
| --------------- | ------------------ | ----------------------------- |
| windowMs        | 900000             | 15 minutes in milliseconds    |
| limit           | 100                | Maximum requests per window   |
| standardHeaders | "draft-8"          | Standard rate limit headers   |
| legacyHeaders   | false              | Disable legacy headers        |
| ipv6Subnet      | 56                 | IPv6 subnet for rate limiting |
| message         | "Too many request" | Error response message        |

#### Speed Limiter Configuration

| Parameter  | Value       | Description                   |
| ---------- | ----------- | ----------------------------- |
| windowMs   | 900000      | 15 minutes in milliseconds    |
| delayAfter | 50          | Requests before delay starts  |
| delayMs    | hits \* 100 | Progressive delay calculation |

### Rate Limiting Headers

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
X-RateLimit-Reset: 1640995200
```

### Rate Limiting Behavior

#### Normal Operation

- **Requests 1-50**: No delay, full speed
- **Requests 51-100**: Progressive delay applied
- **Request 101+**: Rejected with 429 status

#### Rate Limit Exceeded

```json
{
  "error": "Too many request"
}
```

**Status**: 429 Too Many Requests

## Environment-Based Configuration

### Development Environment

```typescript
{
  MODE: "development",
  API: 3000,
  DB_HOST: "127.0.0.1",
  DB_PORT: 5432,
  // Debug features enabled
}
```

### Production Environment

```typescript
{
 // this are required environment variables
  MODE: process.env.MODE, // "production"
  DATABASE_URL: process.env.DB_URL,
  API: process.env.API_PORT,
}
```

## Security Best Practices

### 1. Configuration Security

- **Environment Variables**: Sensitive data in environment variables
- **No Hardcoded Secrets**: Avoid credentials in code
- **Default Security**: Secure defaults for all settings

### 2. Request Security

- **Input Validation**: Comprehensive parameter validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization and output encoding

### 3. Network Security

- **CORS Configuration**: Controlled cross-origin access
- **Security Headers**: OWASP-recommended headers
- **Rate Limiting**: DoS attack prevention

## Configuration Management

### Environment Variables Setup

#### Development Environment (This variables should be in the Exposed in the Path, not .env file)

```bash
# Server Configuration
ENV_MODE=development
API_PORT=3000

# Database Configuration
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=portfolio_dev
DB_USER=dev_user
DB_PASS=dev_password
```

#### Production Environment

```bash
# Server Configuration
ENV_MODE=production
API_PORT=3000
DB_URL=postgresql://prod_user:prod_secure_password@prod-db-host:5432/portfolio_prod
```

### Configuration Validation

```typescript
// Validate required environment variables
const requiredEnvVars = ['DB_NAME', 'DB_USER', 'DB_PASS'];
const missingVars = requiredEnvVars.filter(var => !process.env[var]);

if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}
```

## Performance Considerations

### Rate Limiting Performance

- **Memory Efficiency**: In-memory rate limit storage
- **Fast Lookup**: IP-based rate limit tracking
- **Minimal Overhead**: Lightweight rate limit checks

### Configuration Performance

- **Lazy Loading**: Configuration loaded on startup
- **Caching**: Environment variables cached
- **Validation**: One-time configuration validation

## Security Compliance

### OWASP Considerations

1. **Injection**: Parameterized queries prevent SQL injection
2. **Broken Authentication**: Not applicable (public API)
3. **Sensitive Data Exposure**: Environment variables for secrets
4. **XML External Entities**: Not applicable (no XML processing)
5. **Broken Access Control**: Rate limiting prevents abuse
6. **Security Misconfiguration**: Helmet.js provides secure defaults
7. **Cross-Site Scripting**: Input validation prevents XSS
8. **Insecure Deserialization**: Not applicable
9. **Using Components with Known Vulnerabilities**: Regular dependency updates
10. **Insufficient Logging**: Error logging for security events

### Security Headers Implementation

```http
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```
