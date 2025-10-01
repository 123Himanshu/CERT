import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Users, FileText, Clock, MapPin, Target, CheckCircle, Globe, Brain, Radar,
  Eye, Ban, ArrowUp, X, LogOut, Settings, User, Bell, Activity, TrendingUp, BarChart3, Zap, Info,
  Link, Download, CreditCard, UserX, Heart, Camera, Phone, Mail, MessageSquare, Smartphone,
  Database, Lock, Unlock, Search, Filter, Upload, Share2, AlertCircle, CheckSquare
} from 'lucide-react';

interface EnhancedCertArmyDashboardProps {
  onLogout: () => void;
}

const EnhancedCertArmyDashboard: React.FC<EnhancedCertArmyDashboardProps> = ({ onLogout }) => {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [defconLevel] = useState(3);
  const [activeView, setActiveView] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [toasts, setToasts] = useState<Array<{ id: number, message: string, type: 'success' | 'error' | 'info' | 'warning' }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };
  const [dashboardStats, setDashboardStats] = useState({
    totalIncidents: 1247,
    criticalAlerts: 23,
    activeThreats: 156,
    resolvedToday: 89,
    avgResponseTime: '12m',
    threatDetectionRate: 94.7,
    systemUptime: 99.8,
    networkHealth: 87.3,
    aiClassifications: 1156,
    collectiveAlerts: 89,
    sandboxAnalyses: 234,
    mitigationPlaybooks: 45
  });

  // Get user info from localStorage
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  const analystName = userInfo.analystId || 'CERT-001';

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Real-time dashboard updates
  useEffect(() => {
    const updateStats = () => {
      setDashboardStats(prev => ({
        ...prev,
        totalIncidents: prev.totalIncidents + Math.floor(Math.random() * 3),
        criticalAlerts: Math.max(15, prev.criticalAlerts + Math.floor(Math.random() * 5) - 2),
        activeThreats: Math.max(100, prev.activeThreats + Math.floor(Math.random() * 10) - 5),
        resolvedToday: prev.resolvedToday + Math.floor(Math.random() * 2),
        threatDetectionRate: parseFloat(Math.min(99.9, Math.max(90, prev.threatDetectionRate + (Math.random() - 0.5) * 0.5)).toFixed(2)),
        systemUptime: parseFloat(Math.min(100, Math.max(95, prev.systemUptime + (Math.random() - 0.5) * 0.1)).toFixed(2)),
        networkHealth: parseFloat(Math.min(100, Math.max(80, prev.networkHealth + (Math.random() - 0.5) * 2)).toFixed(2)),
        aiClassifications: prev.aiClassifications + Math.floor(Math.random() * 5),
        collectiveAlerts: prev.collectiveAlerts + Math.floor(Math.random() * 3),
        sandboxAnalyses: prev.sandboxAnalyses + Math.floor(Math.random() * 4),
        mitigationPlaybooks: prev.mitigationPlaybooks + Math.floor(Math.random() * 2)
      }));
    };

    const interval = setInterval(updateStats, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Mock notifications data (8 notifications)
  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Zero-Day Exploit Detected',
      message: 'New zero-day vulnerability targeting defence infrastructure. Immediate action required.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'alert',
      title: 'APT Group Activity Surge',
      message: 'Increased activity from known APT groups targeting military networks.',
      time: '15 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'system',
      title: 'AI Model Updated',
      message: 'Threat detection AI model updated with latest intelligence patterns.',
      time: '1 hour ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'incident',
      title: 'Phishing Campaign Blocked',
      message: '1,247 phishing emails automatically quarantined across defence networks.',
      time: '2 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'intelligence',
      title: 'New IOCs Added',
      message: '156 new Indicators of Compromise added to threat intelligence database.',
      time: '4 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 6,
      type: 'sandbox',
      title: 'Malware Analysis Complete',
      message: 'Sandbox analysis of suspicious file SHA256:a1b2c3... completed.',
      time: '6 hours ago',
      read: true,
      priority: 'low'
    },
    {
      id: 7,
      type: 'collective',
      title: 'Collective Defense Alert',
      message: 'New threat pattern shared by Naval Command - protection updated.',
      time: '8 hours ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 8,
      type: 'maintenance',
      title: 'System Maintenance Scheduled',
      message: 'Scheduled maintenance window: 02:00 - 04:00 IST tomorrow.',
      time: '1 day ago',
      read: true,
      priority: 'low'
    }
  ];

  // Real-world threat scenarios based on user reports
  const incidents = [
    {
      id: 'INC-2024-001',
      timestamp: '2024-01-15T14:30:00Z',
      severity: 'Critical',
      type: 'Phishing & Scam Links',
      aiClassification: 'Credential Harvesting Campaign',
      title: 'Fake Army Pension Portal Phishing',
      complainant: 'Col. Rajesh Kumar (Retd.)',
      userType: 'Veteran',
      location: 'New Delhi',
      aiConfidence: 97.8,
      status: 'Contained',
      riskScore: 95,
      evidenceTypes: ['malicious_url', 'fake_login_page', 'phishing_email'],
      mitigationApplied: 'Domain Blocked & User Warned',
      collectiveAlert: true,
      sandboxResults: 'Credential theft confirmed',
      threatIntelMatch: 'Known phishing kit',
      reportedThreat: 'hxxps://army-pension-verify[.]tk/login',
      userAction: 'User clicked link but did not enter credentials',
      certResponse: 'AI detected phishing → Instant warning → Domain sinkholed → Collective alert sent',
      preventiveMeasures: ['DNS filtering updated', 'Email security enhanced', 'User awareness sent']
    },
    {
      id: 'INC-2024-002',
      timestamp: '2024-01-15T13:45:00Z',
      severity: 'High',
      type: 'Malware / Suspicious Files',
      aiClassification: 'Android Spyware',
      title: 'Fake Army Recruitment App',
      complainant: 'Maj. Priya Sharma',
      userType: 'Active Personnel',
      location: 'Mumbai',
      aiConfidence: 89.2,
      status: 'Analysis Complete',
      riskScore: 78,
      evidenceTypes: ['apk_file', 'permissions_analysis', 'network_traffic'],
      mitigationApplied: 'File Quarantined & Hash Blocked',
      collectiveAlert: true,
      sandboxResults: 'Spyware behavior detected - keylogging, location tracking',
      threatIntelMatch: 'Similar to known APT malware',
      reportedThreat: 'ArmyRecruitment2024.apk received via WhatsApp',
      userAction: 'User downloaded but did not install after CERT warning',
      certResponse: 'Sandbox analysis → Malware confirmed → User advised → Hash added to blocklist',
      preventiveMeasures: ['Antivirus signatures updated', 'Play Store monitoring', 'User education sent']
    },
    {
      id: 'INC-2024-003',
      timestamp: '2024-01-15T12:20:00Z',
      severity: 'Critical',
      type: 'Financial Fraud / Bank Scams',
      aiClassification: 'UPI Fraud Campaign',
      title: 'Fake Army Welfare Fund UPI Scam',
      complainant: 'Lt. Col. Arun Singh',
      userType: 'Active Personnel',
      location: 'Bangalore',
      aiConfidence: 92.5,
      status: 'Escalated to Cyber Police',
      riskScore: 85,
      evidenceTypes: ['fraudulent_upi_id', 'fake_qr_code', 'phishing_message'],
      mitigationApplied: 'UPI ID Blocked & Bank Alerted',
      collectiveAlert: true,
      sandboxResults: 'Fraudulent payment gateway confirmed',
      threatIntelMatch: 'Part of organized fraud network',
      reportedThreat: 'Fake UPI request for Army Welfare Fund donation',
      userAction: 'User received suspicious UPI request, reported without paying',
      certResponse: 'Fraud validated → Bank/UPI provider alerted → Cyber police notified → Users warned',
      preventiveMeasures: ['UPI fraud database updated', 'Bank coordination', 'Awareness campaign launched']
    },
    {
      id: 'INC-2024-004',
      timestamp: '2024-01-15T11:15:00Z',
      severity: 'High',
      type: 'Identity Theft / Social Media Hacking',
      aiClassification: 'Account Takeover',
      title: 'Fake Facebook Profile of Defence Personnel',
      complainant: 'Brig. Vikram Yadav',
      userType: 'Active Personnel',
      location: 'Pune',
      aiConfidence: 94.3,
      status: 'Platform Takedown Requested',
      riskScore: 78,
      evidenceTypes: ['fake_profile_screenshots', 'impersonation_evidence', 'social_engineering_attempts'],
      mitigationApplied: 'Profile Reported & User Secured',
      collectiveAlert: true,
      sandboxResults: 'Identity theft confirmed - using stolen photos',
      threatIntelMatch: 'Part of honeytrap operation',
      reportedThreat: 'Fake Facebook profile using officer\'s photos and details',
      userAction: 'Family member noticed fake profile, reported immediately',
      certResponse: 'AI verified fake profile → Meta contacted → Account takedown → User advised on security',
      preventiveMeasures: ['Social media monitoring enhanced', '2FA enforcement', 'Privacy settings guidance']
    },
    {
      id: 'INC-2024-005',
      timestamp: '2024-01-15T10:30:00Z',
      severity: 'Critical',
      type: 'Espionage & Honeytrap Attempts',
      aiClassification: 'Social Engineering Campaign',
      title: 'Suspected Honeytrap Targeting Defence Family',
      complainant: 'Col. Meera Nair',
      userType: 'Active Personnel',
      location: 'Chennai',
      aiConfidence: 91.7,
      status: 'Escalated to Military Intelligence',
      riskScore: 95,
      evidenceTypes: ['suspicious_messages', 'social_media_analysis', 'behavioral_patterns'],
      mitigationApplied: 'Contact Blocked & MI Alerted',
      collectiveAlert: true,
      sandboxResults: 'Social engineering patterns confirmed',
      threatIntelMatch: 'Known foreign intelligence operation',
      reportedThreat: 'Unknown person befriending officer\'s spouse, asking about postings',
      userAction: 'Family member reported suspicious online contact seeking sensitive information',
      certResponse: 'AI detected honeytrap patterns → User warned → Contact blocked → MI investigation initiated',
      preventiveMeasures: ['Family security briefing', 'Social media monitoring', 'Counter-intelligence alert']
    },
    {
      id: 'INC-2024-006',
      timestamp: '2024-01-15T09:45:00Z',
      severity: 'Medium',
      type: 'OPSEC (Operational Security) Risks',
      aiClassification: 'Information Leakage',
      title: 'Sensitive Information in Social Media Post',
      complainant: 'Maj. Gen. Suresh Reddy',
      userType: 'Senior Officer',
      location: 'Hyderabad',
      aiConfidence: 88.8,
      status: 'Post Removed & User Counseled',
      riskScore: 65,
      evidenceTypes: ['social_media_post', 'image_analysis', 'metadata_extraction'],
      mitigationApplied: 'Post Removal & OPSEC Training',
      collectiveAlert: false,
      sandboxResults: 'Sensitive location/equipment visible in background',
      threatIntelMatch: 'OPSEC violation pattern',
      reportedThreat: 'Family photo posted with military installation visible in background',
      userAction: 'Personnel posted family photo without realizing security implications',
      certResponse: 'AI image analysis → Sensitive content detected → User contacted → Post removed → OPSEC briefing',
      preventiveMeasures: ['Enhanced OPSEC training', 'Social media guidelines', 'Family awareness program']
    },
    {
      id: 'INC-2024-007',
      timestamp: '2024-01-15T08:20:00Z',
      severity: 'High',
      type: 'Harassment / Cyber Bullying / Fake Recruitment',
      aiClassification: 'Fraudulent Recruitment Scam',
      title: 'Fake Army Recruitment Website Scam',
      complainant: 'Air Cmde. Rakesh Joshi',
      userType: 'Active Personnel',
      location: 'Lucknow',
      aiConfidence: 94.9,
      status: 'Website Taken Down',
      riskScore: 72,
      evidenceTypes: ['fake_website', 'fraudulent_forms', 'payment_gateway_analysis'],
      mitigationApplied: 'Domain Seized & Cyber Police Alerted',
      collectiveAlert: true,
      sandboxResults: 'Fraudulent recruitment portal confirmed',
      threatIntelMatch: 'Part of organized recruitment fraud network',
      reportedThreat: 'Fake website collecting recruitment fees and personal information',
      userAction: 'Aspirant\'s family reported suspicious recruitment website asking for fees',
      certResponse: 'Website analysis → Fraud confirmed → Domain takedown → Cyber police case → Public warning',
      preventiveMeasures: ['Official recruitment portal promotion', 'Anti-fraud awareness', 'Search engine reporting']
    }
  ];

  // Threat heatmap data
  const threatHeatmap = [
    { city: 'New Delhi', incidents: 45, severity: 'high', lat: 28.6139, lng: 77.2090 },
    { city: 'Mumbai', incidents: 32, severity: 'medium', lat: 19.0760, lng: 72.8777 },
    { city: 'Bangalore', incidents: 28, severity: 'high', lat: 12.9716, lng: 77.5946 },
    { city: 'Chennai', incidents: 19, severity: 'low', lat: 13.0827, lng: 80.2707 },
    { city: 'Hyderabad', incidents: 23, severity: 'medium', lat: 17.3850, lng: 78.4867 },
    { city: 'Pune', incidents: 15, severity: 'low', lat: 18.5204, lng: 73.8567 },
    { city: 'Kolkata', incidents: 21, severity: 'medium', lat: 22.5726, lng: 88.3639 }
  ];

  // AI Predictions
  const aiPredictions = [
    {
      type: 'Phishing Campaign',
      probability: 87,
      timeframe: 'Next 48 hours',
      target: 'Defence Pension Portal',
      confidence: 94,
      trend: 'increasing'
    },
    {
      type: 'Malware Distribution',
      probability: 72,
      timeframe: 'Next week',
      target: 'Mobile Applications',
      confidence: 89,
      trend: 'stable'
    },
    {
      type: 'Social Engineering',
      probability: 65,
      timeframe: 'Next 3 days',
      target: 'Defence Families',
      confidence: 78,
      trend: 'decreasing'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-slate-900';
      case 'Low': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active Investigation': return 'text-red-300 bg-red-500/15 border-red-500/40';
      case 'Mitigation In Progress': return 'text-orange-300 bg-orange-500/15 border-orange-500/40';
      case 'Under Analysis': return 'text-blue-300 bg-blue-500/15 border-blue-500/40';
      case 'Resolved': return 'text-green-300 bg-green-500/15 border-green-500/40';
      default: return 'text-slate-300 bg-slate-500/15 border-slate-500/40';
    }
  };

  const getDefconColor = (level: number) => {
    switch (level) {
      case 1: return 'text-red-300 bg-red-500/15 border-red-500';
      case 2: return 'text-orange-300 bg-orange-500/15 border-orange-500';
      case 3: return 'text-yellow-300 bg-yellow-500/15 border-yellow-500';
      case 4: return 'text-blue-300 bg-blue-500/15 border-blue-500';
      case 5: return 'text-green-300 bg-green-500/15 border-green-500';
      default: return 'text-slate-300 bg-slate-500/15 border-slate-500';
    }
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'threat-categories', label: 'Threat Categories', icon: Shield },
    { id: 'financial-fraud', label: 'Financial Fraud Response', icon: CreditCard },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle },
    { id: 'threats', label: 'Threat Intel', icon: Radar },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    { id: 'heatmap', label: 'Threat Map', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      {/* Cyber Grid Background */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-teal-500/5" />
      </div>

      {/* Enhanced Header with Better User Menu */}
      <header className="relative z-10 bg-slate-800/95 backdrop-blur-sm border-b border-slate-600/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative"
              >
                <Shield className="h-10 w-10 text-teal-400" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Defence Personnel Network Center</h1>

              </div>
            </div>

            <div className="flex items-center space-x-6">
              {/* System Status */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="h-3 w-3 bg-green-400 rounded-full"
                  />
                  <span className="text-green-400 font-medium text-sm">OPERATIONAL</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm">{dashboardStats.systemUptime.toFixed(2)}%</span>
                </div>
              </div>

              {/* DEFCON Level */}
              <div className={`px-4 py-2 rounded-lg border-2 ${getDefconColor(defconLevel)}`}>
                <div className="text-center">
                  <div className="text-xs font-semibold">DEFCON</div>
                  <div className="text-2xl font-bold">{defconLevel}</div>
                </div>
              </div>

              {/* Enhanced Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="p-2 bg-slate-700 border border-slate-600 rounded cursor-pointer hover:bg-slate-600 transition-colors"
                >
                  <Bell className="h-5 w-5 text-slate-300" />
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </div>
                </button>
              </div>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileModal(true)}
                  className="flex items-center space-x-3 p-2 text-slate-300 hover:text-white bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  <User className="h-6 w-6" />
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">Analyst {analystName}</div>
                    <div className="text-xs text-slate-400">Level 3 Clearance</div>
                  </div>
                </button>
              </div>

              {/* Time Display - Matching CERT Army UI */}
              <div className="text-right">
                <div className="text-white font-mono text-sm">
                  {currentTime.toLocaleTimeString('en-US', {
                    hour12: true,
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit'
                  })}
                </div>
                <div className="text-slate-400 text-xs">
                  {currentTime.toLocaleDateString('en-US', {
                    month: 'numeric',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <div className="relative z-10 bg-slate-800/80 backdrop-blur-sm border-b border-slate-600/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeView === item.id
                  ? 'border-teal-400 text-teal-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-500'
                  }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Enhanced Stats Overview - Show for all sections except Threat Intel, AI Insights, and Threat Categories */}
        {activeView !== 'threats' && activeView !== 'ai-insights' && activeView !== 'threat-categories' && (
          <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <StatCard title="Total Incidents" value={dashboardStats.totalIncidents} icon={FileText} color="blue" trend="+12%" />
            <StatCard title="Critical Alerts" value={dashboardStats.criticalAlerts} icon={AlertTriangle} color="red" trend="+8%" />
            <StatCard title="AI Classifications" value={dashboardStats.aiClassifications} icon={Brain} color="purple" trend="+15%" />
            <StatCard title="Collective Alerts" value={dashboardStats.collectiveAlerts} icon={Bell} color="orange" trend="+23%" />
            <StatCard title="Sandbox Analyses" value={dashboardStats.sandboxAnalyses} icon={Activity} color="green" trend="+18%" />
            <StatCard title="Playbooks Applied" value={dashboardStats.mitigationPlaybooks} icon={CheckCircle} color="teal" trend="+7%" />
          </section>
        )}

        {/* CERT Army Quick Action Panel - Show only on overview */}
        {activeView === 'overview' && (
          <section className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Zap className="h-6 w-6 mr-3 text-yellow-400" />
                CERT Army Quick Response Center
              </h2>
              <p className="text-sm text-slate-400 mt-1">Immediate action tools for cyber incident response</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Emergency Lockdown', icon: Shield, color: 'bg-red-500/20 text-red-300 border-red-500/40', action: 'Isolate compromised systems' },
                  { name: 'Deploy Countermeasures', icon: Target, color: 'bg-orange-500/20 text-orange-300 border-orange-500/40', action: 'Auto-deploy security patches' },
                  { name: 'Activate Response Team', icon: Users, color: 'bg-blue-500/20 text-blue-300 border-blue-500/40', action: 'Alert on-call specialists' },
                  { name: 'Threat Intelligence', icon: Brain, color: 'bg-purple-500/20 text-purple-300 border-purple-500/40', action: 'Query threat databases' },
                  { name: 'Forensic Analysis', icon: Eye, color: 'bg-green-500/20 text-green-300 border-green-500/40', action: 'Start evidence collection' },
                  { name: 'Communication Alert', icon: Bell, color: 'bg-teal-500/20 text-teal-300 border-teal-500/40', action: 'Notify defence network' }
                ].map((tool, index) => (
                  <motion.button
                    key={tool.name}
                    className={`p-4 rounded-lg border-2 ${tool.color} hover:scale-105 transition-all duration-200 text-center`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => showToast(`${tool.action} initiated`, 'success')}
                  >
                    <tool.icon className="h-8 w-8 mx-auto mb-2" />
                    <div className="text-sm font-semibold mb-1">{tool.name}</div>
                    <div className="text-xs opacity-80">{tool.action}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Real-time Decision Support System - Show on overview */}
        {activeView === 'overview' && (
          <section className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Brain className="h-6 w-6 mr-3 text-cyan-400" />
                AI-Powered Decision Support System
              </h2>
              <p className="text-sm text-slate-400 mt-1">Real-time recommendations based on current threat landscape</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Current Threat Assessment */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-cyan-500/30">
                  <h3 className="font-semibold text-cyan-300 mb-3 flex items-center">
                    <Radar className="h-5 w-5 mr-2" />
                    Threat Assessment
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Overall Risk Level</span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-300 text-xs rounded font-medium">ELEVATED</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Active Campaigns</span>
                      <span className="text-sm text-red-400 font-bold">7</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Threat Actors</span>
                      <span className="text-sm text-orange-400 font-bold">3 APT Groups</span>
                    </div>
                    <div className="pt-2 border-t border-slate-600">
                      <div className="text-xs text-slate-400 mb-2">Recommended Action:</div>
                      <div className="text-sm text-green-300">Increase monitoring frequency to 15-min intervals</div>
                    </div>
                  </div>
                </div>

                {/* Resource Allocation */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-blue-500/30">
                  <h3 className="font-semibold text-blue-300 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Resource Allocation
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Team Utilization</span>
                      <span className="text-sm text-green-400 font-bold">87%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Available Analysts</span>
                      <span className="text-sm text-blue-400 font-bold">6/24</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Response Capacity</span>
                      <span className="text-sm text-yellow-400 font-bold">Medium</span>
                    </div>
                    <div className="pt-2 border-t border-slate-600">
                      <div className="text-xs text-slate-400 mb-2">Recommended Action:</div>
                      <div className="text-sm text-orange-300">Consider activating backup team for high-priority incidents</div>
                    </div>
                  </div>
                </div>

                {/* Predictive Insights */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/30">
                  <h3 className="font-semibold text-purple-300 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Predictive Insights
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Next 24h Risk</span>
                      <span className="text-sm text-red-400 font-bold">High (78%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Likely Target</span>
                      <span className="text-sm text-orange-400 font-bold">Email Systems</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Attack Vector</span>
                      <span className="text-sm text-yellow-400 font-bold">Spear Phishing</span>
                    </div>
                    <div className="pt-2 border-t border-slate-600">
                      <div className="text-xs text-slate-400 mb-2">Recommended Action:</div>
                      <div className="text-sm text-red-300">Deploy additional email security filters immediately</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="px-4 py-2 bg-red-500/20 text-red-300 border border-red-500/40 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
                  onClick={() => showToast('Emergency protocols activated', 'warning')}
                >
                  Activate Emergency Protocols
                </button>
                <button
                  className="px-4 py-2 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  onClick={() => showToast('Backup team alerted', 'info')}
                >
                  Alert Backup Team
                </button>
                <button
                  className="px-4 py-2 bg-green-500/20 text-green-300 border border-green-500/40 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
                  onClick={() => showToast('Security measures deployed', 'success')}
                >
                  Deploy Countermeasures
                </button>
                <button
                  className="px-4 py-2 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
                  onClick={() => showToast('Intelligence briefing scheduled', 'info')}
                >
                  Schedule Threat Briefing
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Based on Active View */}
        {activeView === 'overview' && <OverviewSection incidents={incidents} predictions={aiPredictions} />}
        {activeView === 'threat-categories' && <ThreatCategoriesSection showToast={showToast} />}
        {activeView === 'financial-fraud' && <FinancialFraudResponseSection showToast={showToast} />}
        {activeView === 'incidents' && <IncidentsSection incidents={incidents} onSelectIncident={setSelectedIncident} />}
        {activeView === 'threats' && <ThreatIntelSection />}
        {activeView === 'ai-insights' && <AIInsightsSection predictions={aiPredictions} showToast={showToast} />}
        {activeView === 'heatmap' && <ThreatHeatmapSection heatmapData={threatHeatmap} />}
      </main>

      {/* Enhanced Incident Details Modal */}
      {selectedIncident && (
        <EnhancedIncidentModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}

      {showNotifications && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showProfileModal && (
        <ProfileModal
          analystName={analystName}
          currentTime={currentTime}
          onClose={() => setShowProfileModal(false)}
          onLogout={onLogout}
        />
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg max-w-sm border-l-4 ${toast.type === 'success' ? 'bg-green-800 border-green-400 text-green-100' :
                toast.type === 'error' ? 'bg-red-800 border-red-400 text-red-100' :
                  toast.type === 'warning' ? 'bg-orange-800 border-orange-400 text-orange-100' :
                    'bg-blue-800 border-blue-400 text-blue-100'
                }`}
            >
              <div className="flex items-center space-x-2">
                {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
                {toast.type === 'error' && <AlertTriangle className="h-5 w-5" />}
                {toast.type === 'warning' && <AlertTriangle className="h-5 w-5" />}
                {toast.type === 'info' && <Info className="h-5 w-5" />}
                <span className="text-sm font-medium">{toast.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Enhanced Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
  trend?: string;
}> = ({ title, value, icon: Icon, color, trend }) => {
  const colorClasses = {
    blue: 'text-blue-300',
    red: 'text-red-300',
    purple: 'text-purple-300',
    orange: 'text-orange-300',
    green: 'text-green-300',
    teal: 'text-teal-300'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800/80 backdrop-blur-sm border border-slate-600/60 rounded-lg p-4 hover:border-blue-400/60 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <Icon className={`h-5 w-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
        {trend && (
          <span className={`text-xs font-medium ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <div className="text-xs text-white/90 mb-1 font-semibold">{title}</div>
      <div className="text-xl font-bold text-white">{value.toLocaleString()}</div>
    </motion.div>
  );
};

// Financial Fraud Response Playbook Section
const FinancialFraudResponseSection: React.FC<{
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ showToast }) => {
  const [activeCase, setActiveCase] = React.useState<string | null>('CERT-2024-FA-000123');
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [showEvidencePacket, setShowEvidencePacket] = React.useState(false);

  // Mock Financial Fraud Cases with complete playbook data
  const fraudCases = [
    {
      id: 'CERT-2024-FA-000123',
      priority: 'High',
      status: 'Bank Coordination',
      reporter: {
        name: 'Ex-Hav. Suresh Kumar',
        serviceId: 'ARN123456',
        contactMobile: '+91-98765xxxxx',
        relation: 'Veteran',
        location: 'Pune, Maharashtra'
      },
      incident: {
        type: 'UPI Fraud',
        amount: 25000,
        currency: 'INR',
        transactionId: 'UTR240115001234',
        datetime: '2024-01-15T14:30:00Z',
        beneficiary: {
          account: 'XXXX1234',
          ifsc: 'SBIN0000123',
          upiId: 'fraud@paytm',
          phone: '+91-98888xxxxx'
        },
        description: 'Veteran received fake Army welfare fund UPI request, transferred money thinking it was official'
      },
      evidence: [
        { filename: 'fake_upi_request.png', sha256: 'a1b2c3d4e5f6...', type: 'screenshot', size: '2.3 MB' },
        { filename: 'bank_sms_alert.png', sha256: 'f6e5d4c3b2a1...', type: 'sms_screenshot', size: '1.1 MB' },
        { filename: 'transaction_history.pdf', sha256: '123456789abc...', type: 'bank_statement', size: '856 KB' },
        { filename: 'whatsapp_chat.txt', sha256: 'def456789123...', type: 'chat_export', size: '45 KB' }
      ],
      timeline: [
        { time: '14:30', action: 'Fraud reported by victim', status: 'completed' },
        { time: '14:32', action: 'Case auto-assigned to Analyst-007', status: 'completed' },
        { time: '14:35', action: 'Victim contacted, advised to freeze account', status: 'completed' },
        { time: '14:45', action: 'Evidence collected and hashed', status: 'completed' },
        { time: '15:00', action: 'AI analysis completed - confirmed fraud', status: 'completed' },
        { time: '15:15', action: 'Evidence packet sent to SBI Fraud Desk', status: 'completed' },
        { time: '15:30', action: 'Cyber police case filed', status: 'completed' },
        { time: '16:00', action: 'IOCs added to blocklist', status: 'completed' },
        { time: '16:15', action: 'Collective alert sent to 15,000+ users', status: 'completed' },
        { time: '17:00', action: 'Bank provisional hold confirmed', status: 'in_progress' },
        { time: 'Pending', action: 'Funds recovery coordination', status: 'pending' }
      ],
      bankResponse: {
        contacted: 'SBI Fraud Desk',
        referenceId: 'SBI-FR-240115-7890',
        status: 'Provisional Hold Applied',
        expectedRecovery: '72 hours',
        contactPerson: 'Mr. Rajesh Sharma, SBI Fraud Manager',
        actionTaken: 'Beneficiary account frozen, transaction traced'
      },
      policeCase: {
        station: 'Pune Cyber Crime Police',
        firNumber: 'FIR-2024-CC-0156',
        officer: 'Inspector Priya Nair',
        status: 'Investigation Active',
        nextHearing: '2024-01-20'
      },
      recoveryStatus: {
        amountRecovered: 18500,
        amountPending: 6500,
        recoveryPercentage: 74,
        expectedFullRecovery: '2024-01-25'
      }
    },
    {
      id: 'CERT-2024-FA-000124',
      priority: 'Critical',
      status: 'Emergency Response',
      reporter: {
        name: 'Maj. Priya Sharma',
        serviceId: 'IC456789',
        contactMobile: '+91-99876xxxxx',
        relation: 'Active Personnel',
        location: 'Delhi Cantt'
      },
      incident: {
        type: 'Banking Trojan',
        amount: 85000,
        currency: 'INR',
        transactionId: 'UTR240115005678',
        datetime: '2024-01-15T16:45:00Z',
        beneficiary: {
          account: 'YYYY5678',
          ifsc: 'HDFC0000456',
          upiId: 'hacker@gpay',
          phone: '+91-97777xxxxx'
        },
        description: 'Officer downloaded fake banking app, credentials stolen, multiple unauthorized transactions'
      },
      evidence: [
        { filename: 'fake_banking_app.apk', sha256: 'malware123456...', type: 'malware_sample', size: '15.2 MB' },
        { filename: 'multiple_transactions.pdf', sha256: 'evidence789...', type: 'bank_statement', size: '3.4 MB' },
        { filename: 'phishing_sms.png', sha256: 'sms456789...', type: 'screenshot', size: '890 KB' }
      ],
      timeline: [
        { time: '16:45', action: 'Critical fraud reported', status: 'completed' },
        { time: '16:47', action: 'Emergency response team activated', status: 'completed' },
        { time: '16:50', action: 'All accounts immediately frozen', status: 'completed' },
        { time: '17:00', action: 'Malware analysis in sandbox', status: 'in_progress' },
        { time: '17:15', action: 'Bank emergency escalation', status: 'in_progress' },
        { time: 'Pending', action: 'Full forensic analysis', status: 'pending' }
      ],
      recoveryStatus: {
        amountRecovered: 0,
        amountPending: 85000,
        recoveryPercentage: 0,
        expectedFullRecovery: 'Under Investigation'
      }
    }
  ];

  // Playbook Steps with detailed actions
  const playbookSteps = [
    {
      id: 1,
      title: 'Intake & Triage',
      description: 'Auto-priority marking and mandatory field collection',
      icon: Upload,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      actions: [
        'Auto-mark as High priority',
        'Collect reporter ID and contact',
        'Get bank/payment system details',
        'Record transaction reference/UTR',
        'Document loss amount and timeline',
        'Upload evidence (screenshots, SMS, etc.)',
        'Auto-assign to investigator queue'
      ],
      mandatoryFields: [
        'Reporter Service ID/Relation',
        'Contact phone + secure callback',
        'Bank/UPI app name',
        'Transaction ID/UTR/UPI reference',
        'Approximate loss amount',
        'Date & time of incident',
        'Suspected beneficiary details',
        'Evidence uploads'
      ]
    },
    {
      id: 2,
      title: 'Immediate User Protection',
      description: 'Stop further loss and secure user accounts',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      actions: [
        'Advise to freeze/block bank account',
        'Revoke recently added beneficiaries',
        'Revoke saved QR codes',
        'Change banking passwords & enable 2FA',
        'Request immediate provisional reversal',
        'Provide fraud hotline numbers',
        'Send security checklist'
      ],
      hotlines: [
        'SBI Fraud Helpline: 1800-11-2211',
        'HDFC Fraud Helpline: 1800-266-4332',
        'ICICI Fraud Helpline: 1800-200-3344',
        'Cyber Crime Helpline: 1930',
        'NPCI UPI Helpline: 1800-120-1740'
      ]
    },
    {
      id: 3,
      title: 'Evidence Preservation',
      description: 'Forensically sound evidence collection and hashing',
      icon: Database,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      actions: [
        'Store files as immutable records',
        'Compute SHA-256 hashes',
        'Extract SMS/email headers',
        'Screenshot bank statements',
        'Export chat conversations',
        'Maintain chain-of-custody',
        'Sandbox suspicious attachments'
      ]
    },
    {
      id: 4,
      title: 'Technical Analysis',
      description: 'AI-powered forensic analysis and IOC extraction',
      icon: Search,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      actions: [
        'Check transaction IDs against blocklists',
        'Compute and search file hashes',
        'Analyze URLs/domains (WHOIS, SSL)',
        'Execute files in isolated sandbox',
        'Correlate with other incidents',
        'Extract IOCs (accounts, phones, domains)',
        'Generate threat intelligence'
      ]
    },
    {
      id: 5,
      title: 'Bank Coordination',
      description: 'Rapid coordination with financial institutions',
      icon: CreditCard,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      actions: [
        'Contact bank fraud desk',
        'Send secure evidence packet',
        'Request provisional hold/trace',
        'Coordinate with NPCI for UPI',
        'Escalate to RBI if needed',
        'Get confirmation ID from bank',
        'Monitor recovery progress'
      ]
    },
    {
      id: 6,
      title: 'Law Enforcement',
      description: 'Cyber police escalation and legal coordination',
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      actions: [
        'Prepare police complaint packet',
        'Liaise with cyber crime units',
        'Provide technical evidence',
        'Coordinate joint investigations',
        'Support legal proceedings',
        'Share IOCs for subpoenas',
        'Track case progress'
      ]
    }
  ];

  const currentCase = fraudCases.find(c => c.id === activeCase);

  const handleStepAction = (stepId: number, action: string) => {
    showToast(`Executing: ${action}`, 'info');
    setActiveStep(stepId);
  };

  const handleCaseAction = (action: string) => {
    showToast(`${action} initiated for case ${activeCase}`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white flex items-center mb-4">
          <CreditCard className="h-8 w-8 mr-3 text-yellow-400" />
          Financial Fraud Response Playbook
        </h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Comprehensive step-by-step response system for financial fraud cases. Auto-prioritized as HIGH with
          immediate user protection, forensic evidence collection, bank coordination, and law enforcement escalation.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-400">1,205</div>
            <div className="text-sm text-slate-400">Cases Handled</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-400">₹2.4 Cr</div>
            <div className="text-sm text-slate-400">Funds Recovered</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-400">8.5 min</div>
            <div className="text-sm text-slate-400">Avg Response Time</div>
          </div>
          <div className="bg-slate-700/50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-purple-400">87%</div>
            <div className="text-sm text-slate-400">Recovery Rate</div>
          </div>
        </div>
      </div>

      {/* Active Cases Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Selection */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h3 className="text-xl font-bold text-white">Active Financial Fraud Cases</h3>
          </div>
          <div className="p-4 space-y-3">
            {fraudCases.map((fraudCase) => (
              <motion.div
                key={fraudCase.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${activeCase === fraudCase.id
                    ? 'border-yellow-400 bg-yellow-500/10'
                    : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                onClick={() => setActiveCase(fraudCase.id)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-blue-300">{fraudCase.id}</span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${fraudCase.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                      fraudCase.priority === 'High' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                    }`}>
                    {fraudCase.priority}
                  </span>
                </div>
                <div className="text-sm text-white font-medium mb-1">{fraudCase.reporter.name}</div>
                <div className="text-xs text-slate-400 mb-2">{fraudCase.incident.type} - ₹{fraudCase.incident.amount.toLocaleString()}</div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs ${fraudCase.status === 'Emergency Response' ? 'bg-red-500/20 text-red-300' :
                      fraudCase.status === 'Bank Coordination' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-green-500/20 text-green-300'
                    }`}>
                    {fraudCase.status}
                  </span>
                  <div className="text-xs text-slate-400">
                    {fraudCase.recoveryStatus.recoveryPercentage}% recovered
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Case Details */}
        {currentCase && (
          <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Case Details: {currentCase.id}</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowEvidencePacket(!showEvidencePacket)}
                    className="px-3 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-sm hover:bg-purple-500/30"
                  >
                    Evidence Packet
                  </button>
                  <button
                    onClick={() => handleCaseAction('Generate Report')}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/40 rounded text-sm hover:bg-blue-500/30"
                  >
                    Generate Report
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Reporter & Incident Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Reporter Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-400">Name:</span> <span className="text-white">{currentCase.reporter.name}</span></div>
                    <div><span className="text-slate-400">Service ID:</span> <span className="text-blue-300">{currentCase.reporter.serviceId}</span></div>
                    <div><span className="text-slate-400">Contact:</span> <span className="text-green-300">{currentCase.reporter.contactMobile}</span></div>
                    <div><span className="text-slate-400">Status:</span> <span className="text-orange-300">{currentCase.reporter.relation}</span></div>
                    <div><span className="text-slate-400">Location:</span> <span className="text-slate-300">{currentCase.reporter.location}</span></div>
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-3">Incident Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-slate-400">Type:</span> <span className="text-red-300">{currentCase.incident.type}</span></div>
                    <div><span className="text-slate-400">Amount:</span> <span className="text-yellow-300 font-bold">₹{currentCase.incident.amount.toLocaleString()}</span></div>
                    <div><span className="text-slate-400">Transaction ID:</span> <span className="text-blue-300 font-mono">{currentCase.incident.transactionId}</span></div>
                    <div><span className="text-slate-400">Beneficiary UPI:</span> <span className="text-red-300">{currentCase.incident.beneficiary.upiId}</span></div>
                    <div><span className="text-slate-400">Date/Time:</span> <span className="text-slate-300">{new Date(currentCase.incident.datetime).toLocaleString()}</span></div>
                  </div>
                </div>
              </div>

              {/* Recovery Status */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Recovery Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-green-400">₹{currentCase.recoveryStatus.amountRecovered.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Recovered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-400">₹{currentCase.recoveryStatus.amountPending.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-400">{currentCase.recoveryStatus.recoveryPercentage}%</div>
                    <div className="text-xs text-slate-400">Recovery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-400">{currentCase.recoveryStatus.expectedFullRecovery}</div>
                    <div className="text-xs text-slate-400">Expected Full Recovery</div>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${currentCase.recoveryStatus.recoveryPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-slate-700/50 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">Response Timeline</h4>
                <div className="space-y-3">
                  {currentCase.timeline.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${item.status === 'completed' ? 'bg-green-400' :
                          item.status === 'in_progress' ? 'bg-blue-400 animate-pulse' :
                            'bg-slate-500'
                        }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white">{item.action}</span>
                          <span className="text-xs text-slate-400">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank & Police Response */}
              {currentCase.bankResponse && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-300 mb-3">Bank Response</h4>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-slate-400">Bank:</span> <span className="text-white">{currentCase.bankResponse.contacted}</span></div>
                      <div><span className="text-slate-400">Reference:</span> <span className="text-blue-300">{currentCase.bankResponse.referenceId}</span></div>
                      <div><span className="text-slate-400">Status:</span> <span className="text-green-300">{currentCase.bankResponse.status}</span></div>
                      <div><span className="text-slate-400">Expected Recovery:</span> <span className="text-orange-300">{currentCase.bankResponse.expectedRecovery}</span></div>
                      <div><span className="text-slate-400">Action:</span> <span className="text-slate-300">{currentCase.bankResponse.actionTaken}</span></div>
                    </div>
                  </div>

                  {currentCase.policeCase && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                      <h4 className="font-semibold text-red-300 mb-3">Police Case</h4>
                      <div className="space-y-2 text-sm">
                        <div><span className="text-slate-400">Station:</span> <span className="text-white">{currentCase.policeCase.station}</span></div>
                        <div><span className="text-slate-400">FIR:</span> <span className="text-red-300">{currentCase.policeCase.firNumber}</span></div>
                        <div><span className="text-slate-400">Officer:</span> <span className="text-white">{currentCase.policeCase.officer}</span></div>
                        <div><span className="text-slate-400">Status:</span> <span className="text-green-300">{currentCase.policeCase.status}</span></div>
                        <div><span className="text-slate-400">Next Hearing:</span> <span className="text-orange-300">{currentCase.policeCase.nextHearing}</span></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Evidence Packet Modal */}
      {showEvidencePacket && currentCase && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-600 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Evidence Packet: {currentCase.id}</h3>
              <button
                onClick={() => setShowEvidencePacket(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Evidence Files */}
              <div>
                <h4 className="font-semibold text-white mb-3">Evidence Files</h4>
                <div className="space-y-3">
                  {currentCase.evidence.map((file, index) => (
                    <div key={index} className="bg-slate-700/50 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="text-sm font-medium text-white">{file.filename}</div>
                          <div className="text-xs text-slate-400">{file.type} • {file.size}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-400">SHA-256</div>
                        <div className="text-xs font-mono text-green-300">{file.sha256}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* JSON Evidence Packet */}
              <div>
                <h4 className="font-semibold text-white mb-3">Secure API Evidence Packet (JSON)</h4>
                <div className="bg-slate-900 border border-slate-600 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-xs text-green-300 font-mono">
                    {`{
  "case_id": "${currentCase.id}",
  "reporter": {
    "name": "${currentCase.reporter.name}",
    "service_id": "${currentCase.reporter.serviceId}",
    "contact_mobile": "${currentCase.reporter.contactMobile}"
  },
  "incident": {
    "type": "${currentCase.incident.type.toLowerCase().replace(' ', '_')}",
    "amount": ${currentCase.incident.amount},
    "currency": "${currentCase.incident.currency}",
    "transaction_id": "${currentCase.incident.transactionId}",
    "datetime_utc": "${currentCase.incident.datetime}",
    "beneficiary": {
      "account": "${currentCase.incident.beneficiary.account}",
      "ifsc": "${currentCase.incident.beneficiary.ifsc}",
      "upi_id": "${currentCase.incident.beneficiary.upiId}",
      "phone": "${currentCase.incident.beneficiary.phone}"
    },
    "description": "${currentCase.incident.description}"
  },
  "evidence": [${currentCase.evidence.map(e => `
    {
      "filename": "${e.filename}",
      "sha256": "${e.sha256}",
      "type": "${e.type}"
    }`).join(',')}
  ],
  "requested_actions": ["trace_and_freeze_beneficiary", "provide_soa_for_trace"],
  "signed_by": "CERT-Analyst-007",
  "signature": "base64-digital-signature-hash"
}`}
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Playbook Steps */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h3 className="text-xl font-bold text-white">Financial Fraud Response Playbook Steps</h3>
          <p className="text-sm text-slate-400 mt-1">Step-by-step process for handling financial fraud cases</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {playbookSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`bg-slate-700/50 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${activeStep === step.id ? 'border-blue-400 scale-105' : 'border-slate-600 hover:border-slate-500'
                  }`}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ y: -2 }}
              >
                <div className={`${step.bgColor} p-4 border-b border-slate-600`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg bg-slate-800/50`}>
                      <step.icon className={`h-6 w-6 ${step.color}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300">Step {step.id}</span>
                  </div>
                  <h4 className="font-bold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-300">{step.description}</p>
                </div>

                <div className="p-4">
                  <div className="space-y-2 mb-4">
                    {step.actions.slice(0, 3).map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-xs text-slate-400">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                        {action}
                      </div>
                    ))}
                    {step.actions.length > 3 && (
                      <div className="text-xs text-slate-500">+{step.actions.length - 3} more actions</div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStepAction(step.id, step.title);
                    }}
                    className={`w-full px-3 py-2 rounded text-xs font-medium transition-colors ${activeStep === step.id
                        ? `${step.bgColor} ${step.color} border border-current`
                        : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600'
                      }`}
                  >
                    Execute Step {step.id}
                  </button>
                </div>

                {/* Expanded Details */}
                {activeStep === step.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-slate-600 p-4 bg-slate-900/50"
                  >
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-semibold text-slate-300 mb-2">All Actions:</h5>
                        <div className="space-y-1">
                          {step.actions.map((action, actionIndex) => (
                            <div key={actionIndex} className="flex items-center text-xs text-slate-400">
                              <CheckSquare className="w-3 h-3 text-green-400 mr-2" />
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>

                      {step.mandatoryFields && (
                        <div>
                          <h5 className="text-sm font-semibold text-slate-300 mb-2">Mandatory Fields:</h5>
                          <div className="flex flex-wrap gap-1">
                            {step.mandatoryFields.map((field, fieldIndex) => (
                              <span key={fieldIndex} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                                {field}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {step.hotlines && (
                        <div>
                          <h5 className="text-sm font-semibold text-slate-300 mb-2">Emergency Hotlines:</h5>
                          <div className="space-y-1">
                            {step.hotlines.map((hotline, hotlineIndex) => (
                              <div key={hotlineIndex} className="text-xs text-green-300 font-mono">{hotline}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Comprehensive Threat Categories Section
const ThreatCategoriesSection: React.FC<{
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ showToast }) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [activeDemo, setActiveDemo] = React.useState<string | null>(null);

  // Comprehensive threat categories with real-world examples and solutions
  const threatCategories = [
    {
      id: 'phishing-scams',
      title: 'Phishing & Scam Links',
      icon: Link,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/40',
      severity: 'Critical',
      reportedCases: 847,
      examples: [
        'Fake bank login pages',
        'Malicious SMS/email links',
        'WhatsApp scam messages',
        'Fake Army pension portals'
      ],
      risks: [
        'Credential theft',
        'Financial fraud',
        'Identity compromise',
        'Account takeover'
      ],
      certSolution: {
        detection: 'AI/ML scans text/URL → checks against threat database',
        response: 'Warn user instantly: "Do not click, this is a phishing site"',
        dashboard: 'CERT dashboard: flagged with domain, source, risk score',
        collective: 'Collective alerts → other users warned if they get same link',
        prevention: ['DNS filtering', 'Email security', 'User training', 'Threat intelligence']
      },
      recentExample: {
        threat: 'hxxps://army-pension-verify[.]tk/login',
        action: 'User received phishing email',
        response: 'AI detected → User warned → Domain blocked → 15,000+ users protected'
      }
    },
    {
      id: 'malware-files',
      title: 'Malware / Suspicious Files',
      icon: Download,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-500/40',
      severity: 'High',
      reportedCases: 623,
      examples: [
        '.exe files from WhatsApp/email',
        'Fake Army recruitment apps (.apk)',
        'Infected PDF documents',
        'Trojanized software'
      ],
      risks: [
        'Spyware installation',
        'Ransomware attacks',
        'Remote access trojans',
        'Data exfiltration'
      ],
      certSolution: {
        detection: 'File uploaded → run in sandbox (isolated VM)',
        response: 'AI scans behavior (keylogging, network connections)',
        dashboard: 'User advice: "Do not install/open this file"',
        collective: 'CERT action: Add file hash to blocklists & antivirus DB',
        prevention: ['Sandbox analysis', 'Hash blocking', 'Antivirus updates', 'App store monitoring']
      },
      recentExample: {
        threat: 'ArmyRecruitment2024.apk',
        action: 'User downloaded suspicious app',
        response: 'Sandbox detected spyware → User warned → Hash blocked → Play Store alerted'
      }
    },
    {
      id: 'financial-fraud',
      title: 'Financial Fraud / Bank Scams',
      icon: CreditCard,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/40',
      severity: 'Critical',
      reportedCases: 1205,
      examples: [
        'Account drained after phishing call',
        'Fake UPI payment requests',
        'QR code fraud',
        'Fake Army welfare fund scams'
      ],
      risks: [
        'Direct money loss',
        'Pension fund theft',
        'UPI account compromise',
        'Bank account takeover'
      ],
      certSolution: {
        detection: 'Dedicated "Financial Fraud" category in complaint form',
        response: 'Immediate advice: Block card/UPI, call bank fraud helpline (1930)',
        dashboard: 'CERT escalation: Alert RBI/bank nodal officers + cyber police',
        collective: 'Threat DB updated with fraud numbers/UPI IDs for future alerts',
        prevention: ['Bank coordination', 'UPI monitoring', 'Fraud database', 'User awareness']
      },
      recentExample: {
        threat: 'Fake Army Welfare Fund UPI request',
        action: 'User received fraudulent payment request',
        response: 'Fraud detected → Bank alerted → UPI blocked → Cyber police case filed'
      }
    },
    {
      id: 'identity-theft',
      title: 'Identity Theft / Social Media Hacking',
      icon: UserX,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-500/40',
      severity: 'High',
      reportedCases: 342,
      examples: [
        'Fake Facebook profiles of soldiers',
        'Instagram account hacking',
        'WhatsApp account hijacking',
        'LinkedIn impersonation'
      ],
      risks: [
        'Espionage attempts',
        'Honeytrap operations',
        'Blackmail threats',
        'Reputation damage'
      ],
      certSolution: {
        detection: 'User reports suspicious accounts or hacked IDs',
        response: 'AI/NLP checks content (fake profile patterns)',
        dashboard: 'Guidance to user: reset credentials, enable 2FA',
        collective: 'CERT: Contact platform (Meta, Twitter, etc.) for takedown',
        prevention: ['Social media monitoring', '2FA enforcement', 'Privacy settings', 'Account verification']
      },
      recentExample: {
        threat: 'Fake Facebook profile using officer photos',
        action: 'Family member noticed impersonation',
        response: 'Profile verified fake → Meta contacted → Account removed → User secured'
      }
    },
    {
      id: 'espionage-honeytrap',
      title: 'Espionage & Honeytrap Attempts',
      icon: Heart,
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/20',
      borderColor: 'border-pink-500/40',
      severity: 'Critical',
      reportedCases: 156,
      examples: [
        'Unknown persons befriending defence families',
        'Romantic approaches on dating apps',
        'Professional networking with ulterior motives',
        'Information gathering through social engineering'
      ],
      risks: [
        'National security compromise',
        'Operational information leaks',
        'Personnel blackmail',
        'Foreign intelligence operations'
      ],
      certSolution: {
        detection: 'AI detects suspicious "social engineering" patterns in messages',
        response: 'User warned: "Possible honeytrap attempt, do not engage"',
        dashboard: 'CERT escalates to Military Intelligence if confirmed',
        collective: 'Pattern sharing across defence network for early warning',
        prevention: ['Behavioral analysis', 'Social media monitoring', 'Family briefings', 'Counter-intelligence']
      },
      recentExample: {
        threat: 'Suspicious contact asking about military postings',
        action: 'Defence family member reported unusual questions',
        response: 'Honeytrap patterns detected → MI alerted → Contact blocked → Family briefed'
      }
    },
    {
      id: 'opsec-risks',
      title: 'OPSEC (Operational Security) Risks',
      icon: Camera,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/40',
      severity: 'Medium',
      reportedCases: 445,
      examples: [
        'Photos with sensitive locations visible',
        'Social media posts revealing unit information',
        'Inadvertent disclosure of operational details',
        'Geotagged photos from restricted areas'
      ],
      risks: [
        'Information leakage to adversaries',
        'Operational security compromise',
        'Location intelligence gathering',
        'Pattern analysis by hostile forces'
      ],
      certSolution: {
        detection: 'AI image analysis (OCR, object detection) detects sensitive content',
        response: 'Alert to user: "This post may reveal classified info, please remove"',
        dashboard: 'CERT notified for deeper assessment',
        collective: 'OPSEC guidelines updated based on common violations',
        prevention: ['Image analysis AI', 'Social media training', 'Family awareness', 'Privacy controls']
      },
      recentExample: {
        threat: 'Family photo with military installation in background',
        action: 'Personnel posted without realizing implications',
        response: 'AI detected sensitive content → User contacted → Post removed → OPSEC training'
      }
    },
    {
      id: 'harassment-scams',
      title: 'Harassment / Cyber Bullying / Fake Recruitment',
      icon: Phone,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/40',
      severity: 'Medium',
      reportedCases: 289,
      examples: [
        'Fake Army job websites',
        'Online harassment of defence families',
        'Fraudulent recruitment calls',
        'Cyber bullying on social platforms'
      ],
      risks: [
        'Financial fraud through fake recruitment',
        'Emotional distress to families',
        'Reputation damage',
        'Personal information theft'
      ],
      certSolution: {
        detection: 'Complaint form option for harassment/scams',
        response: 'CERT escalates to cyber police/social media platforms',
        dashboard: 'Awareness tips pushed to users to avoid fake recruitment portals',
        collective: 'Database of fraudulent websites and phone numbers maintained',
        prevention: ['Website monitoring', 'Cyber police coordination', 'Public awareness', 'Platform reporting']
      },
      recentExample: {
        threat: 'Fake recruitment website collecting fees',
        action: 'Aspirant family reported suspicious website',
        response: 'Website analyzed → Fraud confirmed → Domain seized → Public warning issued'
      }
    }
  ];

  const handleDemoAction = (categoryId: string, action: string) => {
    setActiveDemo(`${categoryId}-${action}`);
    showToast(`Demonstrating ${action} for ${threatCategories.find(c => c.id === categoryId)?.title}`, 'info');
    setTimeout(() => setActiveDemo(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white flex items-center mb-4">
          <Shield className="h-8 w-8 mr-3 text-blue-400" />
          CERT Army Threat Categories & Response Solutions
        </h2>
        <p className="text-slate-400 leading-relaxed">
          Comprehensive threat classification system with AI-powered detection and automated response capabilities.
          Each category represents real-world threats reported by defence personnel and their families, with proven solutions and preventive measures.
        </p>
      </div>

      {/* Threat Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {threatCategories.map((category) => (
          <motion.div
            key={category.id}
            className={`bg-slate-800/70 backdrop-blur-sm border-2 ${category.borderColor} rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${selectedCategory === category.id ? 'scale-105 shadow-2xl' : 'hover:scale-102'
              }`}
            onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            whileHover={{ y: -4 }}
          >
            {/* Category Header */}
            <div className={`${category.bgColor} p-4 border-b border-slate-600`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg bg-slate-800/50`}>
                  <category.icon className={`h-8 w-8 ${category.color}`} />
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${category.severity === 'Critical' ? 'bg-red-500/30 text-red-300' :
                    category.severity === 'High' ? 'bg-orange-500/30 text-orange-300' :
                      'bg-yellow-500/30 text-yellow-300'
                    }`}>
                    {category.severity}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{category.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Reported Cases</span>
                <span className={`text-lg font-bold ${category.color}`}>{category.reportedCases}</span>
              </div>
            </div>

            {/* Category Content */}
            <div className="p-4">
              {/* Examples */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Common Examples:</h4>
                <div className="space-y-1">
                  {category.examples.slice(0, 2).map((example, index) => (
                    <div key={index} className="flex items-center text-xs text-slate-400">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                      {example}
                    </div>
                  ))}
                  {category.examples.length > 2 && (
                    <div className="text-xs text-slate-500">+{category.examples.length - 2} more examples</div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeDemo === `${category.id}-detect`
                    ? 'bg-blue-500 text-white'
                    : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoAction(category.id, 'AI Detection');
                  }}
                >
                  <Search className="w-3 h-3 inline mr-1" />
                  AI Detect
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeDemo === `${category.id}-respond`
                    ? 'bg-green-500 text-white'
                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoAction(category.id, 'Auto Response');
                  }}
                >
                  <Zap className="w-3 h-3 inline mr-1" />
                  Respond
                </button>
                <button
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${activeDemo === `${category.id}-prevent`
                    ? 'bg-purple-500 text-white'
                    : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                    }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDemoAction(category.id, 'Prevention');
                  }}
                >
                  <Shield className="w-3 h-3 inline mr-1" />
                  Prevent
                </button>
              </div>

              {/* Recent Example */}
              <div className="bg-slate-700/50 rounded-lg p-3">
                <h5 className="text-xs font-semibold text-slate-300 mb-2">Recent Case:</h5>
                <div className="text-xs text-slate-400 space-y-1">
                  <div><span className="text-red-400">Threat:</span> {category.recentExample.threat}</div>
                  <div><span className="text-orange-400">Action:</span> {category.recentExample.action}</div>
                  <div><span className="text-green-400">Response:</span> {category.recentExample.response}</div>
                </div>
              </div>
            </div>

            {/* Expanded Details */}
            {selectedCategory === category.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-slate-600 p-4 bg-slate-900/50"
              >
                <div className="space-y-4">
                  {/* All Examples */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">All Examples:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {category.examples.map((example, index) => (
                        <div key={index} className="flex items-center text-xs text-slate-400">
                          <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Risks */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Associated Risks:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {category.risks.map((risk, index) => (
                        <div key={index} className="flex items-center text-xs text-red-400">
                          <AlertTriangle className="w-3 h-3 mr-2" />
                          {risk}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CERT Solution */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">CERT Army Solution:</h4>
                    <div className="space-y-2">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
                        <span className="text-xs font-medium text-blue-300">Detection: </span>
                        <span className="text-xs text-slate-300">{category.certSolution.detection}</span>
                      </div>
                      <div className="bg-green-500/10 border border-green-500/30 rounded p-2">
                        <span className="text-xs font-medium text-green-300">Response: </span>
                        <span className="text-xs text-slate-300">{category.certSolution.response}</span>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded p-2">
                        <span className="text-xs font-medium text-purple-300">Dashboard: </span>
                        <span className="text-xs text-slate-300">{category.certSolution.dashboard}</span>
                      </div>
                      <div className="bg-orange-500/10 border border-orange-500/30 rounded p-2">
                        <span className="text-xs font-medium text-orange-300">Collective: </span>
                        <span className="text-xs text-slate-300">{category.certSolution.collective}</span>
                      </div>
                    </div>
                  </div>

                  {/* Prevention Measures */}
                  <div>
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Prevention Measures:</h4>
                    <div className="flex flex-wrap gap-1">
                      {category.certSolution.prevention.map((measure, index) => (
                        <span key={index} className="px-2 py-1 bg-teal-500/20 text-teal-300 text-xs rounded">
                          {measure}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary Statistics */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Threat Response Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {threatCategories.reduce((sum, cat) => sum + cat.reportedCases, 0).toLocaleString()}
            </div>
            <div className="text-sm text-slate-400">Total Cases Handled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">98.7%</div>
            <div className="text-sm text-slate-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">8.5 min</div>
            <div className="text-sm text-slate-400">Avg Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">24/7</div>
            <div className="text-sm text-slate-400">Operations</div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Overview Section Component with Detailed CERT Army Workflow
const OverviewSection: React.FC<{ incidents: any[]; predictions: any[] }> = ({ incidents, predictions }) => {
  const [activeWorkflow, setActiveWorkflow] = React.useState<string | null>(null);
  const [currentPhase, setCurrentPhase] = React.useState(0);

  // CERT Army Problem-Solving Workflow Phases
  const workflowPhases = [
    {
      id: 'detection',
      name: 'Threat Detection',
      icon: Radar,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      description: 'AI-powered continuous monitoring and anomaly detection',
      actions: ['Network Traffic Analysis', 'Behavioral Pattern Recognition', 'IOC Correlation', 'Signature Matching'],
      tools: ['SIEM Dashboard', 'ML Threat Models', 'Network Sensors', 'Endpoint Detection'],
      status: 'Active',
      completion: 95
    },
    {
      id: 'analysis',
      name: 'Threat Analysis',
      icon: Brain,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/20',
      description: 'Deep forensic analysis and threat classification',
      actions: ['Malware Sandboxing', 'Attribution Analysis', 'Impact Assessment', 'Evidence Collection'],
      tools: ['Sandbox Environment', 'Forensic Tools', 'Threat Intel Feeds', 'OSINT Platforms'],
      status: 'In Progress',
      completion: 78
    },
    {
      id: 'response',
      name: 'Incident Response',
      icon: Shield,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      description: 'Coordinated response and containment actions',
      actions: ['Threat Containment', 'System Isolation', 'Patch Deployment', 'User Notification'],
      tools: ['Response Playbooks', 'Automation Scripts', 'Communication Systems', 'Patch Management'],
      status: 'Ready',
      completion: 100
    },
    {
      id: 'recovery',
      name: 'Recovery & Hardening',
      icon: CheckCircle,
      color: 'text-teal-400',
      bgColor: 'bg-teal-500/20',
      description: 'System restoration and security enhancement',
      actions: ['System Recovery', 'Security Hardening', 'Vulnerability Patching', 'Monitoring Enhancement'],
      tools: ['Backup Systems', 'Configuration Management', 'Vulnerability Scanners', 'Security Baselines'],
      status: 'Standby',
      completion: 85
    }
  ];

  // Real-time operational metrics
  const operationalMetrics = {
    activeAnalysts: 24,
    responseTeams: 8,
    avgResponseTime: '8.5 min',
    threatsNeutralized: 1247,
    systemsProtected: 15847,
    patchesDeployed: 342,
    alertsTriaged: 2156,
    playbooksExecuted: 89
  };

  // Current active operations
  const activeOperations = [
    {
      id: 'OP-2024-001',
      name: 'Operation Shield Guard',
      type: 'APT Investigation',
      priority: 'Critical',
      progress: 67,
      team: 'Alpha Team',
      eta: '4 hours',
      resources: ['Forensic Analysts', 'Threat Hunters', 'Incident Responders'],
      status: 'Active Investigation'
    },
    {
      id: 'OP-2024-002',
      name: 'Operation Cyber Fortress',
      type: 'Mass Phishing Campaign',
      priority: 'High',
      progress: 89,
      team: 'Bravo Team',
      eta: '1 hour',
      resources: ['Email Security Team', 'User Awareness Team', 'DNS Team'],
      status: 'Mitigation Phase'
    },
    {
      id: 'OP-2024-003',
      name: 'Operation Digital Sentinel',
      type: 'Infrastructure Hardening',
      priority: 'Medium',
      progress: 45,
      team: 'Charlie Team',
      eta: '12 hours',
      resources: ['Security Engineers', 'System Administrators', 'Compliance Team'],
      status: 'Implementation'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Operational Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-blue-400" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl font-bold text-white">{operationalMetrics.activeAnalysts}</div>
          <div className="text-sm text-slate-400">Active Analysts</div>
          <div className="text-xs text-green-400 mt-1">24/7 Operations</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Shield className="h-6 w-6 text-green-400" />
            <div className="text-xs text-green-400">+{Math.floor(Math.random() * 5)}</div>
          </div>
          <div className="text-2xl font-bold text-white">{operationalMetrics.responseTeams}</div>
          <div className="text-sm text-slate-400">Response Teams</div>
          <div className="text-xs text-blue-400 mt-1">Avg: {operationalMetrics.avgResponseTime}</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-6 w-6 text-red-400" />
            <div className="text-xs text-red-400">Today</div>
          </div>
          <div className="text-2xl font-bold text-white">{operationalMetrics.threatsNeutralized}</div>
          <div className="text-sm text-slate-400">Threats Neutralized</div>
          <div className="text-xs text-green-400 mt-1">98.7% Success Rate</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-6 w-6 text-teal-400" />
            <div className="text-xs text-teal-400">Protected</div>
          </div>
          <div className="text-2xl font-bold text-white">{operationalMetrics.systemsProtected.toLocaleString()}</div>
          <div className="text-sm text-slate-400">Systems Protected</div>
          <div className="text-xs text-blue-400 mt-1">Defence Network</div>
        </div>
      </div>

      {/* CERT Army Workflow Visualization */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Activity className="h-6 w-6 mr-3 text-blue-400" />
            CERT Army Response Workflow
          </h2>
          <p className="text-sm text-slate-400 mt-1">Real-time operational phases and capabilities</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {workflowPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                className={`relative cursor-pointer transition-all duration-300 ${activeWorkflow === phase.id ? 'scale-105' : 'hover:scale-102'
                  }`}
                onClick={() => setActiveWorkflow(activeWorkflow === phase.id ? null : phase.id)}
                whileHover={{ y: -2 }}
              >
                <div className={`bg-slate-700/50 border border-slate-600 rounded-lg p-4 ${activeWorkflow === phase.id ? 'border-blue-400 shadow-lg shadow-blue-400/20' : ''
                  }`}>
                  {/* Phase Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${phase.bgColor}`}>
                      <phase.icon className={`h-5 w-5 ${phase.color}`} />
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${phase.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                      phase.status === 'In Progress' ? 'bg-orange-500/20 text-orange-300' :
                        phase.status === 'Ready' ? 'bg-blue-500/20 text-blue-300' :
                          'bg-slate-500/20 text-slate-300'
                      }`}>
                      {phase.status}
                    </div>
                  </div>

                  {/* Phase Name and Description */}
                  <h3 className="font-semibold text-white mb-2">{phase.name}</h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{phase.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-slate-400">Completion</span>
                      <span className="text-xs font-medium text-white">{phase.completion}%</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${phase.completion > 90 ? 'bg-green-500' :
                          phase.completion > 70 ? 'bg-blue-500' :
                            phase.completion > 50 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${phase.completion}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-1">
                    {phase.actions.slice(0, 2).map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-xs text-slate-300">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                        {action}
                      </div>
                    ))}
                    {phase.actions.length > 2 && (
                      <div className="text-xs text-slate-400">+{phase.actions.length - 2} more actions</div>
                    )}
                  </div>

                  {/* Expanded Details */}
                  {activeWorkflow === phase.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 pt-4 border-t border-slate-600"
                    >
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300 mb-2">All Actions:</h4>
                          <div className="space-y-1">
                            {phase.actions.map((action, actionIndex) => (
                              <div key={actionIndex} className="flex items-center text-xs text-slate-400">
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                                {action}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-slate-300 mb-2">Tools & Systems:</h4>
                          <div className="flex flex-wrap gap-1">
                            {phase.tools.map((tool, toolIndex) => (
                              <span key={toolIndex} className="px-2 py-1 bg-slate-600/50 text-xs text-slate-300 rounded">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Operations Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Activity className="h-6 w-6 mr-3 text-orange-400" />
              Active Operations
            </h2>
            <p className="text-sm text-slate-400 mt-1">Current CERT Army operations in progress</p>
          </div>
          <div className="p-6 space-y-4">
            {activeOperations.map((operation) => (
              <div key={operation.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-white">{operation.name}</h4>
                    <p className="text-sm text-slate-400">{operation.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${operation.priority === 'Critical' ? 'bg-red-500/20 text-red-300' :
                      operation.priority === 'High' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                      {operation.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-slate-400">Team:</span>
                    <div className="text-sm text-blue-300 font-medium">{operation.team}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">ETA:</span>
                    <div className="text-sm text-green-300 font-medium">{operation.eta}</div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">Progress</span>
                    <span className="text-xs font-medium text-white">{operation.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${operation.progress > 80 ? 'bg-green-500' :
                        operation.progress > 50 ? 'bg-blue-500' : 'bg-orange-500'
                        }`}
                      style={{ width: `${operation.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <span className="text-xs text-slate-400 mb-2 block">Assigned Resources:</span>
                  <div className="flex flex-wrap gap-1">
                    {operation.resources.map((resource, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Critical Incidents with Response Actions */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
              Critical Incidents & Response
            </h2>
            <p className="text-sm text-slate-400 mt-1">High-priority threats requiring immediate action</p>
          </div>
          <div className="p-6 space-y-4">
            {incidents.filter(i => i.severity === 'Critical').slice(0, 3).map((incident) => (
              <div key={incident.id} className="bg-slate-700/50 rounded-lg p-4 border border-red-500/30">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm text-blue-300">{incident.id}</span>
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {incident.severity}
                    </span>
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <h4 className="font-semibold text-white mb-2">{incident.title}</h4>
                <p className="text-sm text-slate-300 mb-3">
                  <span className="text-purple-400">AI Classification:</span> {incident.aiClassification}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <span className="text-xs text-slate-400">Location:</span>
                    <div className="text-sm text-slate-300">{incident.location}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Risk Score:</span>
                    <div className="text-sm text-red-400 font-bold">{incident.riskScore}/100</div>
                  </div>
                </div>

                <div className="mb-3">
                  <span className="text-xs text-slate-400 mb-2 block">Applied Mitigation:</span>
                  <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded">
                    {incident.mitigationApplied}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-600">
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded hover:bg-blue-500/30 transition-colors">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded hover:bg-green-500/30 transition-colors">
                      Execute Playbook
                    </button>
                  </div>
                  <div className="text-xs text-slate-400">
                    {incident.collectiveAlert ? 'Alert Sent' : 'Local Only'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Threat Categories Summary */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Shield className="h-6 w-6 mr-3 text-cyan-400" />
            Threat Categories & Response Capabilities
          </h2>
          <p className="text-sm text-slate-400 mt-1">Real-world threat scenarios and CERT Army solutions</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Phishing & Scams', cases: 847, icon: Link, color: 'text-red-400', solution: 'AI URL Analysis' },
              { name: 'Malware Files', cases: 623, icon: Download, color: 'text-orange-400', solution: 'Sandbox Detection' },
              { name: 'Financial Fraud', cases: 1205, icon: CreditCard, color: 'text-yellow-400', solution: 'Bank Coordination' },
              { name: 'Identity Theft', cases: 342, icon: UserX, color: 'text-purple-400', solution: 'Platform Takedown' },
              { name: 'Espionage/Honeytrap', cases: 156, icon: Heart, color: 'text-pink-400', solution: 'MI Escalation' },
              { name: 'OPSEC Violations', cases: 445, icon: Camera, color: 'text-blue-400', solution: 'Image Analysis AI' },
              { name: 'Harassment/Scams', cases: 289, icon: Phone, color: 'text-green-400', solution: 'Cyber Police' },
              { name: 'Social Engineering', cases: 178, icon: MessageSquare, color: 'text-teal-400', solution: 'Behavioral AI' }
            ].map((category, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <category.icon className={`h-6 w-6 ${category.color}`} />
                  <span className="text-lg font-bold text-white">{category.cases}</span>
                </div>
                <h4 className="font-semibold text-white text-sm mb-2">{category.name}</h4>
                <div className="text-xs text-slate-400 mb-2">Cases Handled</div>
                <div className="bg-slate-600/50 rounded p-2">
                  <div className="text-xs text-green-300 font-medium">Solution:</div>
                  <div className="text-xs text-slate-300">{category.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced AI Predictions with Response Planning */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            AI Threat Intelligence & Predictive Analysis
          </h2>
          <p className="text-sm text-slate-400 mt-1">Machine learning predictions with automated response recommendations</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{prediction.type}</h4>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`h-4 w-4 ${prediction.trend === 'increasing' ? 'text-red-400' :
                      prediction.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'
                      }`} />
                    <span className="text-purple-400 font-bold">{prediction.probability}%</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-xs text-slate-400">Target:</span>
                    <div className="text-sm text-slate-300">{prediction.target}</div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">Timeframe:</span>
                    <div className="text-sm text-orange-300">{prediction.timeframe}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">AI Confidence</span>
                    <span className="text-xs font-medium text-white">{prediction.confidence}%</span>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${prediction.confidence}%` }}
                    />
                  </div>
                </div>

                {/* Recommended Actions */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block">Recommended Actions:</span>
                  <div className="space-y-1">
                    {[
                      'Increase monitoring',
                      'Deploy countermeasures',
                      'Alert personnel',
                      'Prepare response team'
                    ].slice(0, prediction.probability > 80 ? 4 : 2).map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center text-xs text-slate-300">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                        {action}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-600 mt-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${prediction.probability > 80 ? 'bg-red-500/20 text-red-300' :
                    prediction.probability > 60 ? 'bg-orange-500/20 text-orange-300' :
                      'bg-yellow-500/20 text-yellow-300'
                    }`}>
                    {prediction.probability > 80 ? 'High Risk' : prediction.probability > 60 ? 'Medium Risk' : 'Low Risk'}
                  </span>
                  <button className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs rounded hover:bg-purple-500/30 transition-colors">
                    Auto-Deploy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Incidents Section Component
const IncidentsSection: React.FC<{ incidents: any[]; onSelectIncident: (incident: any) => void }> = ({ incidents, onSelectIncident }) => {
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Target className="h-6 w-6 mr-3 text-blue-300" />
          Incident Management Dashboard
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">AI Classification</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Threat Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Risk Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Mitigation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Collective Alert</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-600">
            {incidents.map((incident, index) => (
              <motion.tr
                key={incident.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="hover:bg-slate-700/30 cursor-pointer"
                onClick={() => onSelectIncident(incident)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-mono text-blue-300">{incident.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-purple-300 bg-purple-500/20 px-2 py-1 rounded">
                    {incident.aiClassification}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${incident.severity === 'Critical' ? 'bg-red-500 text-white' :
                    incident.severity === 'High' ? 'bg-orange-500 text-white' :
                      'bg-yellow-500 text-slate-900'
                    }`}>
                    {incident.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 h-2 bg-slate-600 rounded-full mr-2">
                      <div
                        className={`h-2 rounded-full ${incident.riskScore > 80 ? 'bg-red-500' :
                          incident.riskScore > 60 ? 'bg-orange-500' : 'bg-green-500'
                          }`}
                        style={{ width: `${incident.riskScore}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-300">{incident.riskScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-green-300 bg-green-500/20 px-2 py-1 rounded">
                    {incident.mitigationApplied}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {incident.collectiveAlert ? (
                    <span className="text-sm text-orange-300 bg-orange-500/20 px-2 py-1 rounded">
                      Sent
                    </span>
                  ) : (
                    <span className="text-sm text-slate-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="text-blue-400 hover:text-blue-300 p-1">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-400 hover:text-green-300 p-1">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button className="text-red-400 hover:text-red-300 p-1">
                      <Ban className="h-4 w-4" />
                    </button>
                    <button className="text-orange-400 hover:text-orange-300 p-1">
                      <ArrowUp className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Threat Intel Section Component
const ThreatIntelSection: React.FC = () => {
  const threatIntel = [
    {
      id: 1,
      type: 'Domain IOC',
      indicator: 'army-pension-portal-update.tk',
      confidence: 97,
      source: 'CERT-Army Collective Intelligence',
      firstSeen: '2024-01-15 14:32:00',
      lastSeen: '2024-01-15 16:45:00',
      category: 'Phishing',
      severity: 'Critical',
      description: 'Sophisticated phishing domain impersonating official Army Pension Portal',
      iocs: ['185.220.101.42', 'SHA256: a1b2c3d4e5f6789...', 'pension-update@army-fake.com'],
      tags: ['APT-29', 'Credential Harvesting', 'Defence Targeting'],
      geolocation: 'Pakistan',
      registrar: 'Freenom',
      status: 'Active - Sinkholed',
      mitigation: 'DNS Sinkholed, Email Filters Updated'
    },
    {
      id: 2,
      type: 'File Hash',
      indicator: 'SHA256: 7d865e959b2466918c9863afca942d0fb89d7c9ac0c99bafc3749504ded97730',
      confidence: 99,
      source: 'Air Force Cyber Command',
      firstSeen: '2024-01-13 11:20:00',
      lastSeen: '2024-01-15 14:10:00',
      category: 'Malware',
      severity: 'Critical',
      description: 'Advanced Android spyware targeting military personnel',
      iocs: ['com.defence.newsapp', 'C2: 192.168.100.50', 'Cert: CN=DefenceNews'],
      tags: ['Mobile Malware', 'Data Exfiltration', 'Privilege Escalation'],
      geolocation: 'China',
      fileType: 'Android APK (2.4 MB)',
      status: 'Quarantined',
      mitigation: 'App Store Removal, Device Scanning Initiated'
    },
    {
      id: 3,
      type: 'IP Address',
      indicator: '185.220.101.42',
      confidence: 94,
      source: 'Naval Command Threat Intel',
      firstSeen: '2024-01-14 09:15:00',
      lastSeen: '2024-01-15 18:22:00',
      category: 'Command & Control',
      severity: 'High',
      description: 'C2 server hosting multiple defence-targeted campaigns',
      iocs: ['army-pension-portal-update.tk', 'defence-news-app.apk', 'TCP:443'],
      tags: ['Lazarus Group', 'Multi-Stage Attack', 'TLS Encryption'],
      geolocation: 'North Korea (VPN Exit)',
      asn: 'AS13335 Cloudflare',
      status: 'Monitored',
      mitigation: 'Traffic Blocked, Honeypot Deployed'
    },
    {
      id: 4,
      type: 'Email IOC',
      indicator: 'pension-verification@army-portal.org',
      confidence: 91,
      source: 'Army Cyber Security Cell',
      firstSeen: '2024-01-12 16:45:00',
      lastSeen: '2024-01-15 12:30:00',
      category: 'Phishing',
      severity: 'High',
      description: 'Spoofed email address used in pension fraud campaign',
      iocs: ['DKIM-Signature: fake', 'Return-Path: bounce@malicious.com', 'X-Originating-IP: 203.0.113.42'],
      tags: ['Email Spoofing', 'Social Engineering', 'Financial Fraud'],
      geolocation: 'Bangladesh',
      emailProvider: 'Compromised SMTP',
      status: 'Blocked',
      mitigation: 'Email Gateway Rules Updated, User Awareness Sent'
    },
    {
      id: 5,
      type: 'URL IOC',
      indicator: 'hxxps://secure-army-login[.]net/verify-account',
      confidence: 96,
      source: 'Joint Cyber Defence Centre',
      firstSeen: '2024-01-11 08:30:00',
      lastSeen: '2024-01-15 19:15:00',
      category: 'Credential Harvesting',
      severity: 'Critical',
      description: 'Fake login portal collecting defence personnel credentials',
      iocs: ['SSL Cert: Let\'s Encrypt', 'Hosting: 198.51.100.25', 'Redirect: telegram.me/leaked_data'],
      tags: ['Credential Theft', 'SSL Abuse', 'Telegram Exfiltration'],
      geolocation: 'Russia',
      httpStatus: '200 OK',
      status: 'Taken Down',
      mitigation: 'Domain Seized, Hosting Provider Notified'
    },
    {
      id: 6,
      type: 'Certificate IOC',
      indicator: 'CN=Indian Army Portal, O=Ministry of Defence, Serial: 7B:3F:2A:1C:8D:9E',
      confidence: 93,
      source: 'Cyber Crime Investigation Cell',
      firstSeen: '2024-01-09 12:10:00',
      lastSeen: '2024-01-15 08:20:00',
      category: 'Certificate Abuse',
      severity: 'High',
      description: 'Fraudulent SSL certificate impersonating official defence portal',
      iocs: ['Issuer: Fake CA Authority', 'Key Size: 2048 RSA', 'Validity: 365 days'],
      tags: ['SSL Impersonation', 'Certificate Fraud', 'Man-in-the-Middle'],
      geolocation: 'Unknown (Tor)',
      issuer: 'Fraudulent CA',
      status: 'Revoked',
      mitigation: 'Certificate Blacklisted, CA Notified'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Radar className="h-6 w-6 mr-3 text-amber-300" />
            Threat Intelligence Feed
          </h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {threatIntel.map((intel) => (
              <div key={intel.id} className="bg-slate-700/50 rounded-lg p-6 border border-slate-600/50">
                {/* Header with Type, Category, and Severity */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-medium">
                      {intel.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${intel.severity === 'Critical' ? 'bg-red-500/20 text-red-300' :
                      intel.severity === 'High' ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                      {intel.severity}
                    </span>
                    <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                      {intel.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">First Seen</div>
                    <div className="text-sm text-slate-300 font-mono">{intel.firstSeen}</div>
                  </div>
                </div>

                {/* Indicator */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">Indicator of Compromise</div>
                  <div className="font-mono text-white bg-slate-800 p-3 rounded border border-slate-600 break-all">
                    {intel.indicator}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <div className="text-sm text-slate-300 leading-relaxed">
                    {intel.description}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">Threat Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {intel.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional IOCs */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">Related IOCs</div>
                  <div className="bg-slate-800/50 p-3 rounded border border-slate-600">
                    {intel.iocs.map((ioc, index) => (
                      <div key={index} className="font-mono text-xs text-slate-300 mb-1 last:mb-0">
                        • {ioc}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-slate-800/50 p-3 rounded">
                    <div className="text-xs text-slate-400">Source</div>
                    <div className="text-sm text-slate-300 font-medium">{intel.source}</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded">
                    <div className="text-xs text-slate-400">Geolocation</div>
                    <div className="text-sm text-slate-300 font-medium">{intel.geolocation}</div>
                  </div>
                  <div className="bg-slate-800/50 p-3 rounded">
                    <div className="text-xs text-slate-400">Status</div>
                    <div className={`text-sm font-medium ${intel.status.includes('Active') ? 'text-red-300' :
                      intel.status.includes('Blocked') || intel.status.includes('Taken Down') ? 'text-green-300' :
                        'text-yellow-300'
                      }`}>
                      {intel.status}
                    </div>
                  </div>
                </div>

                {/* Mitigation */}
                <div className="mb-4">
                  <div className="text-xs text-slate-400 mb-2">Mitigation Actions</div>
                  <div className="bg-green-500/10 border border-green-500/30 p-3 rounded">
                    <div className="text-sm text-green-300">{intel.mitigation}</div>
                  </div>
                </div>

                {/* Footer with Confidence and Timeline */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Confidence:</span>
                      <div className="w-20 h-2 bg-slate-600 rounded-full">
                        <div
                          className="bg-amber-500 h-2 rounded-full"
                          style={{ width: `${intel.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm text-amber-300 font-medium">{intel.confidence}%</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Last Seen</div>
                    <div className="text-sm text-slate-300 font-mono">{intel.lastSeen}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced AI Insights Section Component with Real-time Data
const AIInsightsSection: React.FC<{
  predictions: any[];
  showToast: (message: string, type?: 'success' | 'error' | 'info' | 'warning') => void;
}> = ({ predictions, showToast }) => {
  const [aiMetrics, setAiMetrics] = useState({
    modelsRunning: 12,
    predictionsGenerated: 1847,
    threatsDetected: 156,
    falsePositives: 23,
    accuracy: 94.7,
    processingSpeed: 2.3,
    dataProcessed: 847.2,
    alertsGenerated: 89
  });

  const [realtimeActivity, setRealtimeActivity] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), action: 'Threat pattern detected', model: 'DeepThreat-v3', confidence: 97.3 },
    { id: 2, time: new Date(Date.now() - 30000).toLocaleTimeString(), action: 'Anomaly classification complete', model: 'AnomalyNet-v2', confidence: 89.1 },
    { id: 3, time: new Date(Date.now() - 60000).toLocaleTimeString(), action: 'Behavioral analysis updated', model: 'BehaviorAI-v4', confidence: 92.8 }
  ]);

  // Real-time AI metrics updates
  React.useEffect(() => {
    const updateMetrics = () => {
      setAiMetrics(prev => ({
        ...prev,
        predictionsGenerated: prev.predictionsGenerated + Math.floor(Math.random() * 5),
        threatsDetected: prev.threatsDetected + Math.floor(Math.random() * 2),
        accuracy: parseFloat(Math.min(99.9, Math.max(90, prev.accuracy + (Math.random() - 0.5) * 0.3)).toFixed(2)),
        processingSpeed: parseFloat(Math.max(1.0, prev.processingSpeed + (Math.random() - 0.5) * 0.2).toFixed(1)),
        dataProcessed: parseFloat((prev.dataProcessed + Math.random() * 10).toFixed(1)),
        alertsGenerated: prev.alertsGenerated + Math.floor(Math.random() * 3)
      }));

      // Add new real-time activity
      const activities = [
        'Neural network training completed',
        'Threat vector analysis updated',
        'Predictive model recalibrated',
        'Anomaly detection enhanced',
        'Pattern recognition improved',
        'Behavioral baseline updated',
        'Risk assessment completed',
        'Threat intelligence correlated'
      ];

      const models = ['DeepThreat-v3', 'AnomalyNet-v2', 'BehaviorAI-v4', 'ThreatNet-v5', 'CyberML-v3'];

      const newActivity = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        action: activities[Math.floor(Math.random() * activities.length)],
        model: models[Math.floor(Math.random() * models.length)],
        confidence: parseFloat((85 + Math.random() * 14).toFixed(1))
      };

      setRealtimeActivity(prev => [newActivity, ...prev.slice(0, 9)]);

      // Trigger toast notifications for significant AI events
      if (Math.random() < 0.3) { // 30% chance of toast notification
        const toastMessages = [
          { message: `AI Model ${newActivity.model} detected new threat pattern`, type: 'warning' as const },
          { message: `Threat prediction accuracy improved to ${newActivity.confidence}%`, type: 'success' as const },
          { message: `Neural network training completed successfully`, type: 'info' as const },
          { message: `Anomaly detection threshold exceeded - investigating`, type: 'warning' as const },
          { message: `AI system automatically blocked ${Math.floor(Math.random() * 10) + 1} malicious domains`, type: 'success' as const }
        ];

        const randomToast = toastMessages[Math.floor(Math.random() * toastMessages.length)];
        showToast(randomToast.message, randomToast.type);
      }
    };

    const interval = setInterval(updateMetrics, 8000); // Update every 8 seconds
    return () => clearInterval(interval);
  }, [showToast]);

  return (
    <div className="space-y-6">
      {/* AI System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Brain className="h-6 w-6 text-purple-400" />
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          </div>
          <div className="text-2xl font-bold text-white">{aiMetrics.modelsRunning}</div>
          <div className="text-sm text-slate-400">AI Models Active</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-6 w-6 text-blue-400" />
            <div className="text-xs text-green-400">+{Math.floor(Math.random() * 10)}</div>
          </div>
          <div className="text-2xl font-bold text-white">{aiMetrics.predictionsGenerated.toLocaleString()}</div>
          <div className="text-sm text-slate-400">Predictions Generated</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-6 w-6 text-red-400" />
            <div className="text-xs text-red-400">+{Math.floor(Math.random() * 3)}</div>
          </div>
          <div className="text-2xl font-bold text-white">{aiMetrics.threatsDetected}</div>
          <div className="text-sm text-slate-400">Threats Detected</div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <div className="text-xs text-green-400">{aiMetrics.accuracy}%</div>
          </div>
          <div className="text-2xl font-bold text-white">{aiMetrics.accuracy}%</div>
          <div className="text-sm text-slate-400">Model Accuracy</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time AI Activity Feed */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Zap className="h-6 w-6 mr-3 text-yellow-400" />
              Live AI Processing
            </h2>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto">
            <div className="space-y-3">
              {realtimeActivity.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-slate-700/50 rounded-lg p-3 border-l-4 border-yellow-400"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{activity.action}</span>
                    <span className="text-xs text-slate-400">{activity.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-300">{activity.model}</span>
                    <span className="text-xs text-green-400">{activity.confidence}% confidence</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Threat Predictions */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Brain className="h-6 w-6 mr-3 text-purple-400" />
              AI Threat Forecasting
            </h2>
          </div>
          <div className="p-6 space-y-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-white">{prediction.type}</h4>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`h-4 w-4 ${prediction.trend === 'increasing' ? 'text-red-400' :
                      prediction.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'
                      }`} />
                    <span className="text-sm text-slate-400">{prediction.trend}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <span className="text-xs text-slate-400">Probability</span>
                    <div className="text-lg font-bold text-purple-400">{prediction.probability}%</div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-1">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400">AI Confidence</span>
                    <div className="text-lg font-bold text-blue-400">{prediction.confidence}%</div>
                    <div className="w-full bg-slate-600 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${prediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-400">Target:</span> {prediction.target}
                  </p>
                  <p className="text-sm text-slate-300">
                    <span className="text-slate-400">Timeframe:</span> {prediction.timeframe}
                  </p>
                  <div className="flex items-center space-x-2 mt-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${prediction.probability > 80 ? 'bg-red-500/20 text-red-300' :
                      prediction.probability > 60 ? 'bg-orange-500/20 text-orange-300' :
                        'bg-yellow-500/20 text-yellow-300'
                      }`}>
                      {prediction.probability > 80 ? 'High Risk' : prediction.probability > 60 ? 'Medium Risk' : 'Low Risk'}
                    </span>
                    <span className="text-xs text-slate-400">
                      Model: ThreatNet-v5
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Performance Metrics */}
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
            <h2 className="text-xl font-bold text-white flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-green-400" />
              Performance Metrics
            </h2>
          </div>
          <div className="p-6 space-y-6">
            {/* Processing Speed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Processing Speed</span>
                <span className="text-sm font-medium text-green-400">{aiMetrics.processingSpeed}s avg</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (5 - aiMetrics.processingSpeed) * 20)}%` }}
                ></div>
              </div>
            </div>

            {/* Data Processed */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">Data Processed</span>
                <span className="text-sm font-medium text-blue-400">{aiMetrics.dataProcessed} GB</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(100, (aiMetrics.dataProcessed / 1000) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* False Positive Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">False Positives</span>
                <span className="text-sm font-medium text-orange-400">{aiMetrics.falsePositives}</span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full"
                  style={{ width: `${Math.min(100, (aiMetrics.falsePositives / 100) * 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Model Status */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-300">Active AI Models</h4>
              {[
                { name: 'DeepThreat-v3', status: 'Training', accuracy: 97.2 },
                { name: 'AnomalyNet-v2', status: 'Active', accuracy: 94.8 },
                { name: 'BehaviorAI-v4', status: 'Learning', accuracy: 91.5 },
                { name: 'ThreatNet-v5', status: 'Active', accuracy: 96.1 }
              ].map((model, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                  <div>
                    <div className="text-sm font-medium text-white">{model.name}</div>
                    <div className="text-xs text-slate-400">{model.accuracy}% accuracy</div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${model.status === 'Active' ? 'bg-green-500/20 text-green-300' :
                    model.status === 'Training' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                    {model.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Threat Heatmap Section Component
const ThreatHeatmapSection: React.FC<{ heatmapData: any[] }> = ({ heatmapData }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<any>(null);
  const [mapView, setMapView] = useState<'threats' | 'infrastructure' | 'response'>('threats');
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');

  // Enhanced threat locations with realistic coordinates for Indian cities
  const threatLocations = [
    { id: 1, city: 'Mumbai', x: 25, y: 65, severity: 'critical', incidents: 847, type: 'Financial Sector Attack', lat: 19.0760, lng: 72.8777, population: '20.4M' },
    { id: 2, city: 'Delhi', x: 35, y: 25, severity: 'high', incidents: 623, type: 'Government Infrastructure', lat: 28.7041, lng: 77.1025, population: '32.9M' },
    { id: 3, city: 'Bangalore', x: 30, y: 75, severity: 'critical', incidents: 1205, type: 'Tech Hub Ransomware', lat: 12.9716, lng: 77.5946, population: '13.2M' },
    { id: 4, city: 'Chennai', x: 40, y: 85, severity: 'medium', incidents: 342, type: 'Port Security Breach', lat: 13.0827, lng: 80.2707, population: '11.5M' },
    { id: 5, city: 'Hyderabad', x: 40, y: 70, severity: 'high', incidents: 567, type: 'Pharma Data Theft', lat: 17.3850, lng: 78.4867, population: '10.5M' },
    { id: 6, city: 'Pune', x: 28, y: 68, severity: 'medium', incidents: 289, type: 'Manufacturing Malware', lat: 18.5204, lng: 73.8567, population: '7.4M' },
    { id: 7, city: 'Kolkata', x: 60, y: 45, severity: 'high', incidents: 445, type: 'Banking Trojans', lat: 22.5726, lng: 88.3639, population: '15.7M' },
    { id: 8, city: 'Ahmedabad', x: 20, y: 45, severity: 'medium', incidents: 234, type: 'Chemical Plant Attack', lat: 23.0225, lng: 72.5714, population: '8.4M' },
    { id: 9, city: 'Jaipur', x: 30, y: 35, severity: 'low', incidents: 156, type: 'Tourism Phishing', lat: 26.9124, lng: 75.7873, population: '3.9M' },
    { id: 10, city: 'Kochi', x: 25, y: 85, severity: 'high', incidents: 378, type: 'Maritime Cyber Attack', lat: 9.9312, lng: 76.2673, population: '2.1M' },
    { id: 11, city: 'Gurgaon', x: 36, y: 28, severity: 'critical', incidents: 692, type: 'Corporate Espionage', lat: 28.4595, lng: 77.0266, population: '1.1M' },
    { id: 12, city: 'Noida', x: 38, y: 26, severity: 'high', incidents: 423, type: 'Software Piracy Ring', lat: 28.5355, lng: 77.3910, population: '0.6M' }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return { bg: 'bg-red-500', border: 'border-red-400', text: 'text-red-400', glow: 'shadow-red-400/50' };
      case 'high': return { bg: 'bg-orange-500', border: 'border-orange-400', text: 'text-orange-400', glow: 'shadow-orange-400/50' };
      case 'medium': return { bg: 'bg-yellow-500', border: 'border-yellow-400', text: 'text-yellow-400', glow: 'shadow-yellow-400/50' };
      case 'low': return { bg: 'bg-green-500', border: 'border-green-400', text: 'text-green-400', glow: 'shadow-green-400/50' };
      default: return { bg: 'bg-gray-500', border: 'border-gray-400', text: 'text-gray-400', glow: 'shadow-gray-400/50' };
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <Zap className="w-3 h-3" />;
      case 'high': return <AlertTriangle className="w-3 h-3" />;
      case 'medium': return <Activity className="w-3 h-3" />;
      case 'low': return <Shield className="w-3 h-3" />;
      default: return <MapPin className="w-3 h-3" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Enhanced Map Visualization */}
      <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center">
              <Globe className="h-6 w-6 mr-3 text-green-300" />
              India Cyber Threat Intelligence Map
            </h2>
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Monitoring
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              {(['threats', 'infrastructure', 'response'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setMapView(view)}
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${mapView === view
                    ? 'bg-green-500 text-white'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                    }`}
                >
                  {view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
            <div className="flex space-x-2">
              {(['1h', '24h', '7d', '30d'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-2 py-1 text-xs rounded transition-colors ${timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                    }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="relative bg-slate-900/80 rounded-lg p-4 h-[500px] overflow-hidden border border-slate-600">
            {/* Background Map */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
              style={{
                backgroundImage: "url('/images/Scr.png')",
                backgroundSize: 'cover'
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-900/40" />

            {/* Scanning Animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-green-400/10 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Threat Location Markers */}
            {threatLocations.map((location, index) => {
              const colors = getSeverityColor(location.severity);
              return (
                <motion.div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${location.x}%`, top: `${location.y}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  onClick={() => setSelectedHotspot(location)}
                  whileHover={{ scale: 1.2 }}
                >
                  {/* Pulsing Ring */}
                  <motion.div
                    className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                    animate={{
                      scale: [1, 2.5, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                    style={{ width: '24px', height: '24px', marginLeft: '-12px', marginTop: '-12px' }}
                  />

                  {/* Main Marker */}
                  <div className={`w-6 h-6 rounded-full border-2 border-white ${colors.bg} ${colors.glow} shadow-lg flex items-center justify-center text-white relative z-10`}>
                    {getSeverityIcon(location.severity)}
                  </div>

                  {/* Incident Count Badge */}
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {location.incidents > 999 ? '999+' : location.incidents}
                  </div>

                  {/* Tooltip */}
                  {selectedHotspot?.id === location.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-50"
                    >
                      <div className="bg-slate-800 border border-slate-600 text-white text-xs rounded-lg px-4 py-3 whitespace-nowrap shadow-xl min-w-[200px]">
                        <div className="font-bold text-green-400 mb-1">{location.city}</div>
                        <div className="text-slate-300 mb-1">{location.type}</div>
                        <div className={`font-semibold mb-2 ${colors.text}`}>
                          {location.severity.toUpperCase()} THREAT
                        </div>
                        <div className="border-t border-slate-600 pt-2 space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Incidents:</span>
                            <span className="text-red-400 font-bold">{location.incidents}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Population:</span>
                            <span className="text-slate-300">{location.population}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Coordinates:</span>
                            <span className="text-slate-300">{location.lat.toFixed(2)}, {location.lng.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}

            {/* Enhanced Legend */}
            <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-4 text-white">
              <h4 className="text-sm font-bold mb-3 text-green-400">Threat Classification</h4>
              <div className="space-y-2 text-xs">
                {[
                  { level: 'critical', label: 'Critical', count: threatLocations.filter(t => t.severity === 'critical').length },
                  { level: 'high', label: 'High', count: threatLocations.filter(t => t.severity === 'high').length },
                  { level: 'medium', label: 'Medium', count: threatLocations.filter(t => t.severity === 'medium').length },
                  { level: 'low', label: 'Low', count: threatLocations.filter(t => t.severity === 'low').length }
                ].map(({ level, label, count }) => {
                  const colors = getSeverityColor(level);
                  return (
                    <div key={level} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 ${colors.bg} rounded-full mr-2 border border-white`}></div>
                        <span>{label}</span>
                      </div>
                      <span className="font-bold">{count}</span>
                    </div>
                  );
                })}
              </div>
              <div className="border-t border-slate-600 mt-3 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Total Incidents:</span>
                  <span className="font-bold text-red-400">
                    {threatLocations.reduce((sum, loc) => sum + loc.incidents, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Real-time Status */}
            <div className="absolute top-4 right-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3 text-white">
              <div className="flex items-center text-sm mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="font-semibold">Live Intelligence Feed</span>
              </div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>Last Update: {new Date().toLocaleTimeString()}</div>
                <div>Active Monitoring: {threatLocations.length} Cities</div>
                <div>Response Teams: 24/7 Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Hotspot Details */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Target className="h-5 w-5 mr-2 text-red-400" />
            Critical Incident Zones
          </h2>
        </div>
        <div className="p-6 max-h-[500px] overflow-y-auto">
          <div className="space-y-3">
            {threatLocations
              .sort((a, b) => b.incidents - a.incidents)
              .map((location) => {
                const colors = getSeverityColor(location.severity);
                return (
                  <motion.div
                    key={location.id}
                    className={`p-4 bg-slate-700/50 rounded-lg border border-slate-600 cursor-pointer transition-all hover:bg-slate-600/50 ${selectedHotspot?.id === location.id ? 'ring-2 ring-green-400' : ''
                      }`}
                    onClick={() => setSelectedHotspot(location)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${colors.bg} border border-white flex items-center justify-center`}>
                          {getSeverityIcon(location.severity)}
                        </div>
                        <div>
                          <span className="text-white font-bold text-lg">{location.city}</span>
                          <div className={`text-xs font-semibold ${colors.text} uppercase tracking-wide`}>
                            {location.severity} Priority
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-red-400 font-bold text-xl">{location.incidents}</div>
                        <div className="text-xs text-slate-400">incidents</div>
                      </div>
                    </div>

                    <div className="text-sm text-slate-300 mb-3">
                      <div className="font-medium">{location.type}</div>
                      <div className="text-xs text-slate-400 mt-1">
                        Population: {location.population} • Coordinates: {location.lat.toFixed(2)}, {location.lng.toFixed(2)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex space-x-4">
                        <span className="text-slate-400">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Last 24h
                        </span>
                        <span className="text-slate-400">
                          <Users className="w-3 h-3 inline mr-1" />
                          {Math.floor(Math.random() * 50) + 10} affected
                        </span>
                      </div>
                      <button className="text-green-400 hover:text-green-300 font-medium">
                        View Details →
                      </button>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Incident Modal
const EnhancedIncidentModal: React.FC<{ incident: any; onClose: () => void }> = ({ incident, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-600"
      >
        <div className="px-6 py-4 border-b border-slate-600 flex items-center justify-between bg-slate-700/50">
          <h2 className="text-2xl font-bold text-white">Enhanced Incident Analysis</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 hover:bg-slate-600 rounded-lg"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <label className="text-sm font-medium text-slate-400">Incident ID</label>
              <p className="text-lg font-mono text-blue-300">{incident.id}</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <label className="text-sm font-medium text-slate-400">AI Classification</label>
              <p className="text-lg font-semibold text-purple-300">{incident.aiClassification}</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <label className="text-sm font-medium text-slate-400">Risk Score</label>
              <p className="text-lg font-bold text-red-400">{incident.riskScore}/100</p>
            </div>
          </div>

          {/* Evidence & Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Evidence Types</h4>
              <div className="flex flex-wrap gap-2">
                {incident.evidenceTypes.map((type: string) => (
                  <span key={type} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h4 className="font-semibold text-white mb-3">Sandbox Results</h4>
              <p className="text-slate-300 text-sm">{incident.sandboxResults}</p>
            </div>
          </div>

          {/* Mitigation & Alerts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-500/10 border border-green-500/30 p-4 rounded-lg">
              <h4 className="font-semibold text-green-300 mb-2">Mitigation Applied</h4>
              <p className="text-green-200">{incident.mitigationApplied}</p>
            </div>
            {incident.collectiveAlert && (
              <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Collective Alert</h4>
                <p className="text-orange-200">Proactive warning sent to all defence families</p>
              </div>
            )}
          </div>

          {/* Threat Intelligence Match */}
          <div className="bg-purple-500/10 border border-purple-500/30 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-300 mb-2">Threat Intelligence Match</h4>
            <p className="text-purple-200">{incident.threatIntelMatch}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 pt-6 border-t border-slate-600">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Full Analysis
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Resolved
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
              <Ban className="h-4 w-4 mr-2" />
              Block Source
            </button>
            <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center">
              <ArrowUp className="h-4 w-4 mr-2" />
              Escalate
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Notifications Modal Component
const NotificationsModal: React.FC<{
  notifications: any[];
  onClose: () => void;
}> = ({ notifications, onClose }) => {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'alert': return <Bell className="h-5 w-5 text-orange-400" />;
      case 'system': return <Settings className="h-5 w-5 text-blue-400" />;
      case 'incident': return <Shield className="h-5 w-5 text-purple-400" />;
      case 'intelligence': return <Brain className="h-5 w-5 text-teal-400" />;
      case 'sandbox': return <Activity className="h-5 w-5 text-green-400" />;
      case 'collective': return <Users className="h-5 w-5 text-indigo-400" />;
      case 'maintenance': return <Settings className="h-5 w-5 text-gray-400" />;
      default: return <Bell className="h-5 w-5 text-slate-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-500/10';
      case 'medium': return 'border-l-orange-500 bg-orange-500/10';
      case 'low': return 'border-l-green-500 bg-green-500/10';
      default: return 'border-l-slate-500 bg-slate-500/10';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-600"
      >
        <div className="px-8 py-6 border-b border-slate-600 bg-gradient-to-r from-slate-700 to-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-100 flex items-center">
                <Bell className="h-6 w-6 mr-2 text-teal-400" />
                CERT-Army Notifications
              </h2>
              <p className="text-sm text-slate-400 mt-1">
                {notifications.filter(n => !n.read).length} unread alerts
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'bg-slate-700/50' : 'bg-slate-800/30'
                  } border border-slate-600/50`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-slate-100' : 'text-slate-300'
                        }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-teal-400 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-slate-400 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">
                        {notification.time}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${notification.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                          notification.priority === 'medium' ? 'bg-orange-500/20 text-orange-300' :
                            'bg-green-500/20 text-green-300'
                          }`}>
                          {notification.priority.toUpperCase()}
                        </span>
                        {!notification.read && (
                          <button className="text-xs text-teal-400 hover:text-teal-300">
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between border-t border-slate-600 pt-4">
            <button className="text-sm text-teal-400 hover:text-teal-300">
              Mark all as read
            </button>
            <button className="text-sm text-slate-500 hover:text-slate-400">
              Clear all notifications
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Profile Modal Component
const ProfileModal: React.FC<{
  analystName: string;
  currentTime: Date;
  onClose: () => void;
  onLogout: () => void;
}> = ({ analystName, currentTime, onClose, onLogout }) => {
  const sessionStart = new Date(Date.now() - Math.random() * 3600000); // Random session start time
  const sessionDuration = Math.floor((Date.now() - sessionStart.getTime()) / 1000 / 60); // Minutes

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full border border-slate-600"
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-600 bg-gradient-to-r from-slate-700 to-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-500 p-2 rounded-lg">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-100">Analyst Profile</h2>
                <p className="text-sm text-slate-400">CERT-Army Command Center</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Profile Information - Landscape Layout */}
        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile & Session Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Analyst Details */}
              <div className="bg-slate-700/50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-slate-100 mb-4 flex items-center">
                  <Shield className="h-6 w-6 mr-3 text-teal-400" />
                  Analyst Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Analyst ID:</span>
                      <span className="text-slate-100 font-medium">{analystName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Clearance:</span>
                      <span className="text-green-400 font-medium">Level 3 - CLASSIFIED</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="text-slate-100">Cyber Threat Intelligence</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className="text-slate-100">Senior Threat Analyst</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session & System Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Session Information */}
                <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-blue-400" />
                    Session Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Current Time:</span>
                      <span className="text-slate-100 font-mono text-sm">{currentTime.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Session Start:</span>
                      <span className="text-slate-100 font-mono text-sm">{sessionStart.toLocaleTimeString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-green-400 font-medium">{sessionDuration} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-green-400 font-medium flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* System Access */}
                <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-purple-400" />
                    System Access
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Access Level:</span>
                      <span className="text-purple-400 font-medium text-sm">Full System</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Login:</span>
                      <span className="text-slate-100 text-sm">{new Date(Date.now() - 86400000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Failed Attempts:</span>
                      <span className="text-green-400">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">IP Address:</span>
                      <span className="text-slate-100 font-mono text-sm">192.168.1.100</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Action Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-slate-400" />
                Quick Actions
              </h3>

              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
                <span>System Settings</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors">
                <Activity className="h-5 w-5" />
                <span>Performance Metrics</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors">
                <FileText className="h-5 w-5" />
                <span>Activity Log</span>
              </button>

              <button className="w-full flex items-center space-x-3 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors">
                <User className="h-5 w-5" />
                <span>Profile Settings</span>
              </button>

              <hr className="border-slate-600 my-4" />

              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-3 px-4 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
              >
                <LogOut className="h-5 w-5" />
                <span>Secure Logout</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedCertArmyDashboard;