# Deployment Guide

## Overview

This guide covers the deployment process for the Node.js/Express back-end API in various environments, focusing on application deployment without database management details.

## Prerequisites

### System Requirements

- Node.js 18+
- Nginx (recommended for production)
- PostgreSQL (existing database)

### Environment Variables

Create the environment variable in the project path in the project root:

```bash
# Server Configuration
ENV_MODE=production
API_PORT=3000
DB_URL=postgresql://your_db_user:your_db_password@localhost:5432/portfolio_db

```

## Build Process

### 1. Install Dependencies

```bash
npm ci --production
```

### 2. Compile TypeScript

```bash
npm run build
```

### 3. Verify Database Connection

```bash
# Test database connectivity
npm run test:db
```

## Production Deployment

### Using Docker

#### 1. Create Dockerfile

```dockerfile
# Multi-stage build
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --production && npm cache clean --force

# Copy built application
COPY --from=builder /app/build ./build

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

USER nodejs

EXPOSE 3000

CMD ["node", "build/src/index.js"]
```

#### 2. Create docker-compose.yml

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ENV_MODE=production
      - API_PORT=3000
      - DB_HOST=postgres
      - DB_PORT=5432
      - DB_NAME=portfolio_db
      - DB_USER=postgres
      - DB_PASS=password
      - DB_URL=postgresql://postgres:password@postgres:5432/portfolio_db
    depends_on:
      - postgres
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio_db
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
```

#### 3. Deploy with Docker

```bash
# Build and start containers
docker-compose up -d --build

# View logs
docker-compose logs -f app

# Test application
docker-compose exec app curl http://localhost:3000/health
```

## Nginx Configuration

### Basic Reverse Proxy

Create `nginx.conf`:

```nginx
events {
    worker_connections 1024;
}

http {
    upstream api_backend {
        server app:3000;
    }

    rate_limiting_zone $binary_remote_addr zone=api_limit:10m;

    server {
        listen 80;
        server_name your-domain.com;

        # Rate limiting
        limit_req zone=api_limit burst=20 nodelay;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";

        # API proxy
        location / {
            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_read_timeout 300s;
            proxy_connect_timeout 75s;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
```

## SSL/TLS Configuration

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Updated Nginx Config with SSL

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;

    # ... rest of configuration
}
```

## Environment Management

### Development Environment

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Test endpoints
curl http://localhost:3000/blogs?lang=EN
```

### Staging Environment

Use Docker Compose for staging:

```yaml
version: "3.8"

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - ENV_MODE=staging
      - API_PORT=3000
      - DB_HOST=postgres_staging
      - DB_NAME=portfolio_staging
      # ... other env vars
    depends_on:
      - postgres_staging
    restart: unless-stopped

  postgres_staging:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=portfolio_staging
      # ... other env vars
    volumes:
      - postgres_staging_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_staging_data:
```

