# Defence Cyber Incident & Safety Portal - Deployment Guide

## 🎯 Overview

This document provides comprehensive deployment instructions for the Defence Cyber Incident & Safety Portal, a full-stack AI-enabled cyber security platform designed for SIH2025.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Service    │
│   (React)       │◄──►│   (Node.js)     │◄──►│   (Python)      │
│   Port: 3000    │    │   Port: 5000    │    │   Port: 8000    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Nginx         │    │   PostgreSQL    │    │   Redis Cache   │
│   (Reverse      │    │   (Database)    │    │   (Sessions)    │
│    Proxy)       │    │   Port: 5432    │    │   Port: 6379    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   Monitoring    │
│   (Prometheus   │
│   + Grafana)    │
└─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Operating System**: Ubuntu 20.04+ / CentOS 8+ / RHEL 8+
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Memory**: 8GB+ RAM
- **Storage**: 50GB+ free space
- **Network**: Internet access for package downloads

### 1. Clone Repository

```bash
git clone <repository-url>
cd defence-cyber-portal
```

### 2. Run Deployment Script

```bash
# Make script executable
chmod +x scripts/deploy.sh

# Deploy to production
./scripts/deploy.sh production

# Or deploy to development
./scripts/deploy.sh development
```

### 3. Access Applications

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **AI Service**: http://localhost:8000
- **Monitoring**: http://localhost:3001 (Grafana)

## 🔧 Manual Deployment

### Step 1: Environment Setup

```bash
# Create environment file
cp .env.example .env

# Edit configuration
nano .env
```

### Step 2: Database Setup

```bash
# Start PostgreSQL
docker-compose up -d postgres

# Wait for database to be ready
docker-compose exec postgres pg_isready -U defence_portal_user -d defence_cyber_portal

# Run migrations
docker-compose exec backend npm run migrate
```

### Step 3: Start All Services

```bash
# Build and start all services
docker-compose up -d

# Check service status
docker-compose ps
```

### Step 4: Verify Deployment

```bash
# Check health endpoints
curl http://localhost:5000/health
curl http://localhost:8000/health

# Check logs
docker-compose logs -f
```

## 🔐 Security Configuration

### SSL/TLS Setup

1. **Obtain SSL Certificates**
   ```bash
   # Place certificates in ssl directory
   mkdir -p nginx/ssl
   cp your-cert.pem nginx/ssl/cert.pem
   cp your-key.pem nginx/ssl/key.pem
   cp your-ca.pem nginx/ssl/ca.pem
   ```

2. **Update Nginx Configuration**
   ```bash
   # Edit nginx configuration
   nano nginx/nginx.conf
   ```

### Environment Variables

```bash
# Critical security variables
JWT_SECRET=your-super-secure-jwt-secret-key
ENCRYPTION_KEY=your-32-character-encryption-key
DB_PASSWORD=your-secure-database-password
REDIS_PASSWORD=your-secure-redis-password

# Email/SMS Configuration
SMTP_HOST=your-smtp-server
SMTP_USER=your-email@domain.com
SMTP_PASS=your-email-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

## 📊 Monitoring Setup

### Prometheus Configuration

```yaml
# monitoring/prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'defence-portal'
    static_configs:
      - targets: ['backend:5000', 'ai-service:8000']
```

### Grafana Dashboards

1. **Access Grafana**: http://localhost:3001
2. **Login**: admin / defence_grafana_2024
3. **Import Dashboards**: Use provided JSON files in `monitoring/grafana/`

## 🔄 Backup & Recovery

### Automated Backup

```bash
# Create backup script
cat > backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/defence-portal/backups"
DATE=$(date +%Y%m%d-%H%M%S)

# Database backup
docker-compose exec postgres pg_dump -U defence_portal_user defence_cyber_portal > $BACKUP_DIR/db-$DATE.sql

# File backup
tar -czf $BACKUP_DIR/files-$DATE.tar.gz uploads/ logs/

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
EOF

chmod +x backup.sh

# Schedule daily backups
echo "0 2 * * * /path/to/backup.sh" | crontab -
```

### Recovery

```bash
# Restore database
docker-compose exec -T postgres psql -U defence_portal_user defence_cyber_portal < backup.sql

# Restore files
tar -xzf files-backup.tar.gz
```

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflicts**
   ```bash
   # Check port usage
   netstat -tulpn | grep :3000
   
   # Kill conflicting processes
   sudo kill -9 <PID>
   ```

2. **Database Connection Issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Restart database
   docker-compose restart postgres
   ```

3. **Memory Issues**
   ```bash
   # Check memory usage
   docker stats
   
   # Increase Docker memory limit
   # Edit docker-compose.yml
   ```

4. **SSL Certificate Issues**
   ```bash
   # Check certificate validity
   openssl x509 -in nginx/ssl/cert.pem -text -noout
   
   # Test SSL connection
   openssl s_client -connect your-domain.com:443
   ```

### Log Analysis

```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f ai-service

# Search logs
docker-compose logs | grep ERROR
docker-compose logs | grep WARN
```

## 📈 Performance Optimization

### Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_incidents_user_status ON incidents(user_id, status);
CREATE INDEX CONCURRENTLY idx_incidents_date_type ON incidents(incident_date, incident_type);
CREATE INDEX CONCURRENTLY idx_evidence_incident_type ON evidence(incident_id, file_type);
```

### Caching Strategy

```bash
# Redis configuration
# Edit redis.conf
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### Load Balancing

```nginx
# nginx.conf - Load balancer configuration
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

upstream ai-service {
    server ai-service1:8000;
    server ai-service2:8000;
}
```

## 🔒 Security Hardening

### Firewall Configuration

```bash
# UFW configuration
sudo ufw enable
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw deny 3000/tcp   # Block direct frontend access
sudo ufw deny 5000/tcp   # Block direct backend access
```

### Docker Security

```bash
# Run containers as non-root
docker-compose exec backend adduser --disabled-password --gecos "" appuser
docker-compose exec backend chown -R appuser:appuser /app

# Use read-only filesystems
# Add to docker-compose.yml:
# read_only: true
# tmpfs:
#   - /tmp
```

### Regular Security Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d

# Scan for vulnerabilities
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock \
  aquasec/trivy image defence-portal-backend:latest
```

## 📞 Support

### Emergency Contacts

- **Technical Support**: tech-support@defence.gov.in
- **Security Issues**: security@defence.gov.in
- **Emergency Hotline**: 1930

### Documentation

- **API Documentation**: http://localhost:5000/docs
- **AI Service Docs**: http://localhost:8000/docs
- **User Manual**: `/docs/user-manual.pdf`
- **Admin Guide**: `/docs/admin-guide.pdf`

## 🎯 Production Checklist

- [ ] SSL certificates installed and valid
- [ ] Environment variables configured
- [ ] Database migrations completed
- [ ] Monitoring dashboards configured
- [ ] Backup strategy implemented
- [ ] Security hardening applied
- [ ] Performance testing completed
- [ ] Load testing completed
- [ ] Disaster recovery plan tested
- [ ] Documentation updated
- [ ] Team training completed

---

**Note**: This is a confidential system for defence use only. Ensure all security measures are properly implemented before production deployment.
