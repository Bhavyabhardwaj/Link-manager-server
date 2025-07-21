# 🐳 Docker Setup for Link Manager

This project includes Docker configuration for easy development and deployment.

## 📦 What's Included

- **PostgreSQL 15** - Database
- **Redis 7** - Caching (optional)
- **Node.js 18** - API Server
- **Prisma** - Database ORM
- **Health checks** - Container monitoring

## 🚀 Quick Start

### Development Mode
```bash
# Start development environment
npm run docker:dev

# View logs
npm run docker:logs

# Stop containers
npm run docker:down:dev
```

### Production Mode
```bash
# Copy environment file and edit it
cp .env.docker .env

# Start production environment
npm run docker:prod

# Stop containers
npm run docker:down
```

## 🔧 Environment Setup

1. **Copy environment file:**
   ```bash
   cp .env.docker .env
   ```

2. **Edit `.env` with your actual values:**
   - Email credentials (Gmail)
   - OAuth keys (GitHub, Google)
   - API tokens (IP Info)
   - Security secrets

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run docker:dev` | Start development environment |
| `npm run docker:prod` | Start production environment |
| `npm run docker:down` | Stop production containers |
| `npm run docker:down:dev` | Stop development containers |
| `npm run docker:logs` | View API container logs |
| `npm run docker:build` | Build API image only |
| `npm run docker:clean` | Clean up Docker system |

## 🌐 Access Points

- **API Server:** http://localhost:3000
- **API Docs:** http://localhost:3000/api-docs
- **PostgreSQL:** localhost:5432
- **Redis:** localhost:6379

## 📁 Directory Structure

```
.
├── Dockerfile                 # Production image
├── Dockerfile.dev            # Development image
├── docker-compose.yml        # Production compose
├── docker-compose.dev.yml    # Development compose
├── .dockerignore            # Docker ignore rules
├── .env.docker              # Environment template
└── DOCKER.md               # This file
```

## 🛠️ Development Workflow

1. **Start containers:**
   ```bash
   npm run docker:dev
   ```

2. **Code changes** are automatically reflected (volume mounting)

3. **Database migrations** run automatically

4. **View logs** for debugging:
   ```bash
   npm run docker:logs
   ```

## 🚀 Production Deployment

1. **Set environment variables:**
   ```bash
   cp .env.docker .env
   # Edit .env with production values
   ```

2. **Deploy:**
   ```bash
   npm run docker:prod
   ```

3. **Health checks** ensure containers are running properly

## 🔍 Troubleshooting

### Container won't start
```bash
# Check logs
docker-compose logs api

# Restart containers
npm run docker:down && npm run docker:dev
```

### Database connection issues
```bash
# Check PostgreSQL container
docker-compose logs postgres

# Reset database
npm run docker:down
docker volume rm server_postgres_data
npm run docker:dev
```

### Clean up
```bash
# Remove all containers, networks, images
npm run docker:clean
```

## 🔒 Security Notes

- **Never commit `.env`** files with real credentials
- **Change default passwords** in production
- **Use secrets management** in production environments
- **Enable firewall rules** for production deployments

## 📊 Monitoring

- **Health checks** run every 30 seconds
- **Container logs** available via `docker-compose logs`
- **Database data** persisted in Docker volumes

---

## 🆘 Need Help?

- Check container logs: `docker-compose logs [service-name]`
- Restart containers: `npm run docker:down && npm run docker:dev`
- Clean everything: `npm run docker:clean`
