#!/bin/bash

# Defence Cyber Incident & Safety Portal Deployment Script
# SIH2025 - Production Deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="defence-cyber-portal"
ENVIRONMENT=${1:-production}
BACKUP_DIR="/opt/defence-portal/backups"
LOG_DIR="/opt/defence-portal/logs"

echo -e "${BLUE}🚀 Starting Defence Cyber Portal Deployment${NC}"
echo -e "${BLUE}Environment: ${ENVIRONMENT}${NC}"
echo "=================================================="

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    
    # Check if running as root or with sudo
    if [[ $EUID -eq 0 ]]; then
        print_warning "Running as root. Consider using a non-root user with docker group access."
    fi
    
    print_status "Prerequisites check completed"
}

# Create necessary directories
create_directories() {
    echo -e "${BLUE}Creating necessary directories...${NC}"
    
    sudo mkdir -p $BACKUP_DIR
    sudo mkdir -p $LOG_DIR
    sudo mkdir -p /opt/defence-portal/ssl
    sudo mkdir -p /opt/defence-portal/uploads
    
    # Set permissions
    sudo chown -R $USER:$USER /opt/defence-portal/
    sudo chmod -R 755 /opt/defence-portal/
    
    print_status "Directories created"
}

# Backup existing data
backup_data() {
    if [ -d "/opt/defence-portal" ]; then
        echo -e "${BLUE}Creating backup of existing data...${NC}"
        
        BACKUP_FILE="backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        sudo tar -czf "$BACKUP_DIR/$BACKUP_FILE" /opt/defence-portal/
        
        print_status "Backup created: $BACKUP_FILE"
    fi
}

# Generate environment file
generate_env_file() {
    echo -e "${BLUE}Generating environment configuration...${NC}"
    
    cat > .env << EOF
# Defence Cyber Portal Environment Configuration
# Generated on $(date)

# Database Configuration
DB_PASSWORD=$(openssl rand -base64 32)
REDIS_PASSWORD=$(openssl rand -base64 32)

# JWT and Encryption
JWT_SECRET=$(openssl rand -base64 64)
ENCRYPTION_KEY=$(openssl rand -base64 32)

# Application URLs
FRONTEND_URL=https://cyberportal.defence.gov.in
REACT_APP_API_URL=https://api.cyberportal.defence.gov.in
REACT_APP_AI_SERVICE_URL=https://ai.cyberportal.defence.gov.in
REACT_APP_WS_URL=wss://api.cyberportal.defence.gov.in

# Email Configuration (Update with actual values)
SMTP_HOST=smtp.defence.gov.in
SMTP_PORT=587
SMTP_USER=cyberportal@defence.gov.in
SMTP_PASS=your_smtp_password_here

# SMS Configuration (Update with actual values)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token

# Monitoring
GRAFANA_PASSWORD=$(openssl rand -base64 16)

# Security
ALLOWED_ORIGINS=https://cyberportal.defence.gov.in,https://api.cyberportal.defence.gov.in
CORS_ORIGINS=https://cyberportal.defence.gov.in

# File Upload Limits
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf,text/plain,application/msword

# AI Service Configuration
AI_CONFIDENCE_THRESHOLD=0.7
AI_MODEL_PATH=/app/models

# Logging
LOG_LEVEL=INFO
LOG_RETENTION_DAYS=30

# Backup Configuration
BACKUP_RETENTION_DAYS=30
AUDIT_LOG_RETENTION_DAYS=365
EOF

    print_status "Environment file generated"
}

# Build and start services
deploy_services() {
    echo -e "${BLUE}Building and starting services...${NC}"
    
    # Stop existing services
    docker-compose down --remove-orphans
    
    # Build images
    docker-compose build --no-cache
    
    # Start services
    docker-compose up -d
    
    print_status "Services started"
}

# Wait for services to be healthy
wait_for_services() {
    echo -e "${BLUE}Waiting for services to be healthy...${NC}"
    
    # Wait for database
    echo "Waiting for database..."
    timeout 60 bash -c 'until docker-compose exec postgres pg_isready -U defence_portal_user -d defence_cyber_portal; do sleep 2; done'
    
    # Wait for Redis
    echo "Waiting for Redis..."
    timeout 30 bash -c 'until docker-compose exec redis redis-cli ping; do sleep 2; done'
    
    # Wait for backend
    echo "Waiting for backend API..."
    timeout 60 bash -c 'until curl -f http://localhost:5000/health; do sleep 2; done'
    
    # Wait for AI service
    echo "Waiting for AI service..."
    timeout 60 bash -c 'until curl -f http://localhost:8000/health; do sleep 2; done'
    
    print_status "All services are healthy"
}

# Run database migrations
run_migrations() {
    echo -e "${BLUE}Running database migrations...${NC}"
    
    docker-compose exec backend npm run migrate
    docker-compose exec backend npm run seed
    
    print_status "Database migrations completed"
}

# Setup SSL certificates
setup_ssl() {
    echo -e "${BLUE}Setting up SSL certificates...${NC}"
    
    if [ ! -f "/opt/defence-portal/ssl/cert.pem" ]; then
        print_warning "SSL certificates not found. Please add your certificates to /opt/defence-portal/ssl/"
        print_warning "Required files: cert.pem, key.pem, ca.pem"
    else
        print_status "SSL certificates found"
    fi
}

# Setup monitoring
setup_monitoring() {
    echo -e "${BLUE}Setting up monitoring...${NC}"
    
    # Wait for monitoring services
    sleep 30
    
    # Check Prometheus
    if curl -f http://localhost:9090 > /dev/null 2>&1; then
        print_status "Prometheus is running"
    else
        print_warning "Prometheus is not accessible"
    fi
    
    # Check Grafana
    if curl -f http://localhost:3001 > /dev/null 2>&1; then
        print_status "Grafana is running"
    else
        print_warning "Grafana is not accessible"
    fi
}

# Security hardening
security_hardening() {
    echo -e "${BLUE}Applying security hardening...${NC}"
    
    # Set proper file permissions
    sudo chmod 600 .env
    sudo chmod 600 /opt/defence-portal/ssl/*
    
    # Configure firewall (if ufw is available)
    if command -v ufw &> /dev/null; then
        sudo ufw allow 80/tcp
        sudo ufw allow 443/tcp
        sudo ufw allow 22/tcp
        print_status "Firewall configured"
    fi
    
    # Set up log rotation
    sudo tee /etc/logrotate.d/defence-portal > /dev/null << EOF
/opt/defence-portal/logs/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 $USER $USER
}
EOF
    
    print_status "Security hardening completed"
}

# Create systemd service
create_systemd_service() {
    echo -e "${BLUE}Creating systemd service...${NC}"
    
    sudo tee /etc/systemd/system/defence-portal.service > /dev/null << EOF
[Unit]
Description=Defence Cyber Portal
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=$(pwd)
ExecStart=/usr/bin/docker-compose up -d
ExecStop=/usr/bin/docker-compose down
TimeoutStartSec=0

[Install]
WantedBy=multi-user.target
EOF
    
    sudo systemctl daemon-reload
    sudo systemctl enable defence-portal.service
    
    print_status "Systemd service created and enabled"
}

# Display deployment summary
display_summary() {
    echo ""
    echo "=================================================="
    echo -e "${GREEN}🎉 Defence Cyber Portal Deployment Complete!${NC}"
    echo "=================================================="
    echo ""
    echo -e "${BLUE}Service URLs:${NC}"
    echo "  Frontend:     http://localhost:3000"
    echo "  Backend API:  http://localhost:5000"
    echo "  AI Service:   http://localhost:8000"
    echo "  Prometheus:   http://localhost:9090"
    echo "  Grafana:      http://localhost:3001"
    echo "  Kibana:       http://localhost:5601"
    echo ""
    echo -e "${BLUE}Default Credentials:${NC}"
    echo "  Grafana Admin: admin / defence_grafana_2024"
    echo ""
    echo -e "${BLUE}Next Steps:${NC}"
    echo "  1. Update SSL certificates in /opt/defence-portal/ssl/"
    echo "  2. Configure email and SMS settings in .env"
    echo "  3. Set up domain names and reverse proxy"
    echo "  4. Configure monitoring alerts"
    echo "  5. Run security audit"
    echo ""
    echo -e "${YELLOW}Important:${NC}"
    echo "  - Change all default passwords"
    echo "  - Configure proper SSL certificates"
    echo "  - Set up regular backups"
    echo "  - Monitor system logs"
    echo ""
}

# Main deployment function
main() {
    check_prerequisites
    create_directories
    backup_data
    generate_env_file
    deploy_services
    wait_for_services
    run_migrations
    setup_ssl
    setup_monitoring
    security_hardening
    create_systemd_service
    display_summary
}

# Run main function
main "$@"
