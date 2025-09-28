-- Defence Cyber Incident & Safety Portal Database Schema
-- PostgreSQL with encryption and RBAC support

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'analyst', 'user', 'veteran', 'family');
CREATE TYPE incident_status AS ENUM ('pending', 'in_progress', 'resolved', 'closed', 'escalated');
CREATE TYPE incident_type AS ENUM ('fraud', 'malware', 'phishing', 'espionage', 'opsec', 'ddos', 'data_breach', 'social_engineering', 'other');
CREATE TYPE threat_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE evidence_type AS ENUM ('image', 'video', 'audio', 'document', 'url', 'screenshot', 'log_file', 'other');
CREATE TYPE notification_type AS ENUM ('email', 'sms', 'push', 'web', 'system');

-- Users table with encryption
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    defence_id VARCHAR(50) UNIQUE NOT NULL,
    rank VARCHAR(50) NOT NULL,
    unit VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    roles user_role[] NOT NULL DEFAULT ARRAY['user'],
    permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    two_fa_enabled BOOLEAN DEFAULT false,
    two_fa_secret VARCHAR(32),
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    encrypted_personal_data BYTEA -- Encrypted sensitive personal information
);

-- Incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    incident_type incident_type NOT NULL,
    status incident_status DEFAULT 'pending',
    severity threat_level NOT NULL,
    location VARCHAR(255) NOT NULL,
    incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
    reported_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- AI Classification Results
    ai_predicted_type incident_type,
    ai_confidence_score DECIMAL(3,2),
    ai_threat_level threat_level,
    ai_risk_score DECIMAL(3,2),
    ai_explanation TEXT,
    
    -- Additional Details
    suspect_details JSONB,
    financial_impact DECIMAL(15,2),
    is_urgent BOOLEAN DEFAULT false,
    contact_preference VARCHAR(20) DEFAULT 'email',
    allow_sharing BOOLEAN DEFAULT false,
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    assigned_analyst_id UUID REFERENCES users(id),
    resolution_notes TEXT,
    closed_at TIMESTAMP WITH TIME ZONE,
    
    -- Encrypted sensitive data
    encrypted_description BYTEA,
    encrypted_suspect_details BYTEA
);

-- Evidence table
CREATE TABLE evidence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_type evidence_type NOT NULL,
    file_size BIGINT NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    checksum VARCHAR(64) NOT NULL,
    
    -- AI Analysis Results
    is_malicious BOOLEAN DEFAULT false,
    threat_indicators TEXT[],
    extracted_text TEXT,
    ai_confidence_score DECIMAL(3,2),
    metadata JSONB,
    
    -- Security
    encrypted_file_path VARCHAR(500),
    encryption_key_id VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploaded_by UUID NOT NULL REFERENCES users(id)
);

-- Incident comments/timeline
CREATE TABLE incident_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_id UUID NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id),
    comment TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    sent_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Threat intelligence table
CREATE TABLE threat_intelligence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    threat_type incident_type NOT NULL,
    ioc_type VARCHAR(50) NOT NULL, -- IP, Domain, Email, Hash, etc.
    ioc_value VARCHAR(500) NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL,
    source VARCHAR(100) NOT NULL,
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Mitigation playbooks table
CREATE TABLE mitigation_playbooks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    incident_type incident_type NOT NULL,
    threat_level threat_level NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    immediate_actions JSONB NOT NULL,
    detailed_steps JSONB NOT NULL,
    required_resources JSONB,
    estimated_time VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit log table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System settings table
CREATE TABLE system_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB NOT NULL,
    description TEXT,
    is_encrypted BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_defence_id ON users(defence_id);
CREATE INDEX idx_users_roles ON users USING GIN(roles);
CREATE INDEX idx_users_active ON users(is_active) WHERE is_active = true;

CREATE INDEX idx_incidents_user_id ON incidents(user_id);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_type ON incidents(incident_type);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_incidents_date ON incidents(incident_date);
CREATE INDEX idx_incidents_ai_type ON incidents(ai_predicted_type);
CREATE INDEX idx_incidents_location ON incidents USING GIN(location gin_trgm_ops);

CREATE INDEX idx_evidence_incident_id ON evidence(incident_id);
CREATE INDEX idx_evidence_type ON evidence(file_type);
CREATE INDEX idx_evidence_malicious ON evidence(is_malicious) WHERE is_malicious = true;

CREATE INDEX idx_comments_incident_id ON incident_comments(incident_id);
CREATE INDEX idx_comments_user_id ON incident_comments(user_id);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = false;

CREATE INDEX idx_threat_intel_type ON threat_intelligence(threat_type);
CREATE INDEX idx_threat_intel_ioc ON threat_intelligence(ioc_type, ioc_value);
CREATE INDEX idx_threat_intel_active ON threat_intelligence(is_active) WHERE is_active = true;

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- Create functions for encryption/decryption
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(data TEXT, key_id VARCHAR DEFAULT 'default')
RETURNS BYTEA AS $$
BEGIN
    RETURN pgp_sym_encrypt(data, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION decrypt_sensitive_data(encrypted_data BYTEA, key_id VARCHAR DEFAULT 'default')
RETURNS TEXT AS $$
BEGIN
    RETURN pgp_sym_decrypt(encrypted_data, current_setting('app.encryption_key'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mitigation_playbooks_updated_at BEFORE UPDATE ON mitigation_playbooks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create view for incident summary
CREATE VIEW incident_summary AS
SELECT 
    i.id,
    i.title,
    i.incident_type,
    i.status,
    i.severity,
    i.location,
    i.incident_date,
    i.reported_date,
    i.ai_predicted_type,
    i.ai_confidence_score,
    i.ai_threat_level,
    i.ai_risk_score,
    u.first_name || ' ' || u.last_name as reporter_name,
    u.rank,
    u.unit,
    COUNT(e.id) as evidence_count,
    COUNT(c.id) as comment_count
FROM incidents i
JOIN users u ON i.user_id = u.id
LEFT JOIN evidence e ON i.id = e.incident_id
LEFT JOIN incident_comments c ON i.id = c.incident_id
GROUP BY i.id, u.first_name, u.last_name, u.rank, u.unit;

-- Create view for threat intelligence summary
CREATE VIEW threat_intelligence_summary AS
SELECT 
    threat_type,
    ioc_type,
    COUNT(*) as count,
    AVG(confidence_score) as avg_confidence,
    MAX(last_seen) as most_recent,
    MIN(first_seen) as first_detected
FROM threat_intelligence
WHERE is_active = true
GROUP BY threat_type, ioc_type;

-- Insert default system settings
INSERT INTO system_settings (key, value, description) VALUES
('encryption_key', '"your-encryption-key-here"', 'Default encryption key for sensitive data'),
('max_file_size', '10485760', 'Maximum file size for evidence uploads (10MB)'),
('allowed_file_types', '["image/jpeg", "image/png", "image/gif", "application/pdf", "text/plain", "application/msword"]', 'Allowed MIME types for file uploads'),
('ai_confidence_threshold', '0.7', 'Minimum confidence threshold for AI classifications'),
('notification_retention_days', '30', 'Number of days to retain notifications'),
('audit_log_retention_days', '365', 'Number of days to retain audit logs');

-- Insert default mitigation playbooks
INSERT INTO mitigation_playbooks (incident_type, threat_level, title, description, immediate_actions, detailed_steps) VALUES
('phishing', 'high', 'Phishing Attack Response', 'Standard response for phishing attacks', 
 '["Disconnect from network", "Change passwords", "Enable 2FA", "Report to IT security"]',
 '{"step1": "Immediately disconnect the affected device from network", "step2": "Change all passwords for affected accounts", "step3": "Enable two-factor authentication", "step4": "Scan for malware", "step5": "Report to IT security team"}'),

('malware', 'critical', 'Malware Infection Response', 'Critical response for malware infections',
 '["Isolate system", "Preserve evidence", "Notify security team", "Begin containment"]',
 '{"step1": "Immediately isolate the infected system", "step2": "Preserve system state and logs", "step3": "Notify security team immediately", "step4": "Begin containment procedures", "step5": "Initiate forensic analysis"}'),

('fraud', 'medium', 'Financial Fraud Response', 'Response for financial fraud incidents',
 '["Contact bank", "Freeze accounts", "File police report", "Document evidence"]',
 '{"step1": "Contact your bank immediately", "step2": "Freeze affected accounts", "step3": "File police report", "step4": "Document all evidence", "step5": "Monitor credit reports"}');

-- Create RLS (Row Level Security) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON users FOR ALL USING (id = current_setting('app.current_user_id')::UUID);

-- Users can see their own incidents
CREATE POLICY users_own_incidents ON incidents FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

-- Admins can see all incidents
CREATE POLICY admins_all_incidents ON incidents FOR ALL USING (
    EXISTS (
        SELECT 1 FROM users 
        WHERE id = current_setting('app.current_user_id')::UUID 
        AND 'admin' = ANY(roles)
    )
);

-- Users can see evidence for their own incidents
CREATE POLICY users_own_evidence ON evidence FOR ALL USING (
    incident_id IN (
        SELECT id FROM incidents 
        WHERE user_id = current_setting('app.current_user_id')::UUID
    )
);

-- Users can see their own notifications
CREATE POLICY users_own_notifications ON notifications FOR ALL USING (user_id = current_setting('app.current_user_id')::UUID);

-- Grant permissions
GRANT USAGE ON SCHEMA public TO defence_portal_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO defence_portal_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO defence_portal_app;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO defence_portal_app;
