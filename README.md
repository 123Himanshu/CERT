# Defence Cyber Incident & Safety Portal

A comprehensive, AI-enabled cyber security platform designed for defence personnel, their families, and veterans to report and manage cyber incidents with real-time threat analysis and automated mitigation.

## 🎯 Project Overview

This portal addresses the SIH2025 problem statement by providing:
- Secure complaint intake and storage
- AI-powered threat classification
- Real-time alerts and notifications
- Automated mitigation playbooks
- CERT-Army risk dashboard
- Multi-platform support (Web + Mobile)

## 🏗️ Architecture

```
defence-cyber-portal/
├── frontend/                 # React + Tailwind Web Portal
├── backend/                  # Node.js + Express API Server
├── ai-service/              # Python AI/ML Classification Service
├── mobile/                  # React Native Mobile App
├── database/                # PostgreSQL Schema & Migrations
├── docker/                  # Docker & Kubernetes Configs
├── docs/                    # Documentation
└── scripts/                 # Deployment & Utility Scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 14+
- Docker & Docker Compose
- React Native CLI (for mobile development)

### Development Setup

1. **Clone and Install Dependencies**
```bash
git clone <repository-url>
cd defence-cyber-portal

# Install all dependencies
npm run install-all
```

2. **Start Development Environment**
```bash
# Start all services with Docker Compose
docker-compose up -d

# Or start individual services
npm run dev:frontend
npm run dev:backend
npm run dev:ai-service
npm run dev:mobile
```

3. **Access Applications**
- Web Portal: http://localhost:3000
- API Server: http://localhost:5000
- AI Service: http://localhost:8000
- Mobile App: Expo Go or iOS/Android Simulator

## 🔐 Security Features

- **Encryption**: AES-256 for data at rest, TLS 1.3 for transit
- **Authentication**: Defence Personnel Login with 2FA
- **Authorization**: Role-based access control (RBAC)
- **Audit Logging**: Comprehensive audit trails
- **Zero Trust**: Network segmentation and microservices

## 📱 Features

### For Defence Personnel
- Secure incident reporting
- Multi-format evidence upload
- Real-time threat alerts
- Automated mitigation guidance
- Mobile offline support

### For CERT-Army Analysts
- Risk-ranked incident queue
- Geographic heatmaps
- AI-powered threat analysis
- Campaign detection
- Intelligence reporting

## 🛠️ Technology Stack

- **Frontend**: React 18, TailwindCSS, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **AI/ML**: Python, scikit-learn, TensorFlow, PyTorch
- **Database**: PostgreSQL with encryption
- **Mobile**: React Native, Expo
- **Infrastructure**: Docker, Kubernetes, AWS/Azure

## 📄 License

Confidential - Defence Use Only
