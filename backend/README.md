# Micro-Hub Backend

NestJS backend with PostgreSQL database, containerized with Docker.

## Quick Start

### Development

```bash
# Start development environment
npm run docker:dev

# View logs
npm run docker:logs

# Stop environment
npm run docker:down

# Reset database
npm run db:reset
```

### Production

```bash
# Build and start production environment
npm run docker:prod

# View production logs
npm run docker:logs:prod

# Stop production environment
npm run docker:down:prod

# Reset production database
npm run db:reset:prod
```

## Available Scripts

### Development

- `npm run docker:dev` - Start development environment with hot-reload
- `npm run docker:down` - Stop development environment
- `npm run docker:logs` - View development logs
- `npm run db:reset` - Reset development database

### Production

- `npm run docker:prod` - Start production environment
- `npm run docker:down:prod` - Stop production environment
- `npm run docker:logs:prod` - View production logs
- `npm run db:reset:prod` - Reset production database

### Local Development

- `npm run start:dev` - Start in development mode (requires local PostgreSQL)
- `npm run build` - Build the application
- `npm run start:prod` - Start in production mode
- `npm run test` - Run tests
- `npm run lint` - Run linter

## Environment

### Development

- **Backend**: http://localhost:4000
- **Database**: PostgreSQL on port 5432
- **Hot Reload**: Enabled
- **Environment**: `development`

### Production

- **Backend**: http://localhost:4000
- **Database**: PostgreSQL on port 5432
- **Environment**: `production`
- **Security**: Non-root user, optimized build

## Architecture

```
├── src/
│   ├── auth/          # Authentication module
│   ├── users/         # Users module
│   ├── entities/      # Database entities
│   ├── common/        # Shared components
│   └── main.ts        # Application entry point
├── Dockerfile         # Production container
├── Dockerfile.dev     # Development container
├── docker-compose.yml # Production compose
└── docker-compose.dev.yml # Development compose
```

## Database

- **Engine**: PostgreSQL 15 Alpine
- **Development DB**: `micro_hub_dev`
- **Production DB**: `micro_hub_prod`
- **Init Script**: `init.sql`

## Technologies

- **Framework**: NestJS
- **Database**: PostgreSQL + TypeORM
- **Authentication**: JWT
- **Package Manager**: pnpm
- **Container**: Docker + Docker Compose
- **Language**: TypeScript
