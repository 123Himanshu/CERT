import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, FileText, Clock, CheckCircle, Phone, Bell, BookOpen, Plus, Eye, Upload, Calendar,
  User, MapPin, TrendingUp, Activity, Zap, Mic, MessageSquare, Bot, Globe, Brain, Radar, Camera,
  Video, AudioLines, FileImage, Smartphone, Wifi, WifiOff, LogOut, Settings, Home, BarChart3,
  Headphones, Volume2, Play, Pause, Download, Share2, ExternalLink, AlertCircle, Info, X
} from 'lucide-react';

import EnhancedReportSubmission from './EnhancedReportSubmission';

interface ComprehensiveDefenceDashboardProps {
  onLogout: () => void;
}

const ComprehensiveDefenceDashboard: React.FC<ComprehensiveDefenceDashboardProps> = ({ onLogout }) => {
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showAutoDetection, setShowAutoDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<any>(null);
  const [toasts, setToasts] = useState<Array<{ id: number, message: string, type: 'success' | 'error' | 'info' }>>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  const handleViewThreatDetails = (threat: any) => {
    setSelectedThreat(threat);
  };

  // Enhanced complaint data with AI classification
  const userComplaints = [
    {
      id: 'DCP-2024-001',
      date: '2024-01-15',
      threatType: 'Phishing',
      aiClassification: 'Fraud',
      status: 'In Progress',
      description: 'Suspicious email claiming to be from Army Pension Portal',
      priority: 'High',
      riskScore: 85,
      evidenceTypes: ['email', 'screenshot'],
      mitigationStatus: 'Auto-blocked',
      collectiveAlert: true
    },
    {
      id: 'DCP-2024-002',
      date: '2024-01-10',
      threatType: 'Scam Call',
      aiClassification: 'Social Engineering',
      status: 'Resolved',
      description: 'Fake call asking for service details',
      priority: 'Medium',
      riskScore: 65,
      evidenceTypes: ['audio', 'call_log'],
      mitigationStatus: 'User Educated',
      collectiveAlert: true
    },
    {
      id: 'DCP-2024-003',
      date: '2024-01-08',
      threatType: 'Malware App',
      aiClassification: 'Malware',
      status: 'Under Analysis',
      description: 'Suspicious app installation request',
      priority: 'Critical',
      riskScore: 95,
      evidenceTypes: ['apk_file', 'network_traffic'],
      mitigationStatus: 'Sandboxed',
      collectiveAlert: false
    }
  ];

  // Enhanced real-time threat alerts with detailed mock data
  const threatAlerts = [
    {
      id: 1,
      message: 'Phishing campaign targeting Army personnel detected',
      time: '2 minutes ago',
      severity: 'critical',
      action: 'blocked',
      details: {
        threatType: 'Phishing Email Campaign',
        source: 'fake-army-portal.com',
        targetsAffected: 1247,
        geolocation: 'Pakistan',
        iocs: ['185.220.101.42', 'army-pension-update.tk', 'SHA256: a1b2c3d4...'],
        description: 'Sophisticated phishing campaign impersonating official Army Pension Portal. Emails contain malicious links attempting to steal credentials.',
        mitigationSteps: [
          'All suspicious emails automatically quarantined',
          'DNS blocking implemented for malicious domains',
          'User awareness alerts sent to all personnel',
          'Incident reported to Cyber Crime Cell'
        ],
        timeline: [
          { time: '14:30', event: 'First phishing email detected' },
          { time: '14:32', event: 'Pattern analysis completed' },
          { time: '14:35', event: 'Automatic blocking activated' },
          { time: '14:37', event: 'Alert sent to all units' }
        ]
      }
    },
    {
      id: 2,
      message: 'Suspicious app installation blocked on 15 devices',
      time: '5 minutes ago',
      severity: 'high',
      action: 'blocked',
      details: {
        threatType: 'Malicious Mobile Application',
        source: 'third-party-store.apk',
        targetsAffected: 15,
        geolocation: 'China',
        iocs: ['com.fake.armyapp', 'MD5: e4f5g6h7...', '192.168.1.100'],
        description: 'Fake military communication app attempting to access sensitive device permissions and exfiltrate data.',
        mitigationSteps: [
          'App installation blocked on all devices',
          'Device scans initiated automatically',
          'Users notified about security risk',
          'App blacklisted in security database'
        ],
        timeline: [
          { time: '14:25', event: 'Suspicious app download detected' },
          { time: '14:26', event: 'Behavioral analysis triggered' },
          { time: '14:28', event: 'Malicious intent confirmed' },
          { time: '14:30', event: 'Installation blocked across network' }
        ]
      }
    },
    {
      id: 3,
      message: 'Voice call scam pattern identified - 23 calls blocked',
      time: '8 minutes ago',
      severity: 'medium',
      action: 'warned',
      details: {
        threatType: 'Voice Call Scam Campaign',
        source: '+92-XXX-XXXX-XXX',
        targetsAffected: 23,
        geolocation: 'Cross-border',
        iocs: ['+92-300-1234567', '+92-301-7654321', 'Caller ID: Army Pension Office'],
        description: 'Coordinated scam calls impersonating Army Pension Office requesting personal and financial information.',
        mitigationSteps: [
          'Caller numbers added to blacklist',
          'Voice pattern analysis updated',
          'Personnel warned via SMS alerts',
          'Telecom providers notified'
        ],
        timeline: [
          { time: '14:20', event: 'First scam call reported' },
          { time: '14:22', event: 'Pattern matching initiated' },
          { time: '14:24', event: 'Similar calls identified' },
          { time: '14:26', event: 'Automatic call blocking enabled' }
        ]
      }
    },
    {
      id: 4,
      type: 'auto-detection',
      message: '🛡️ Auto-Detection: Malicious SMS link blocked before you clicked',
      time: '2 minutes ago',
      severity: 'high',
      action: 'blocked'
    },
    {
      id: 2,
      type: 'collective',
      message: '🔔 Collective Alert: New phishing scam reported by 15+ defence families',
      time: '1 hour ago',
      severity: 'medium',
      action: 'warned'
    },
    {
      id: 3,
      type: 'sandbox',
      message: '🧪 Sandbox Analysis: Suspicious PDF safely analyzed - contains malware',
      time: '3 hours ago',
      severity: 'critical',
      action: 'quarantined'
    }
  ];

  // Enhanced AI Predictions with detailed analysis
  const aiPredictions = [
    {
      type: 'Advanced Phishing Campaign',
      probability: 87,
      timeframe: 'Next 48 hours',
      target: 'Defence Pension Portal Users',
      confidence: 94,
      details: {
        vectorAnalysis: 'Email-based social engineering',
        geographicOrigin: 'Pakistan, China',
        targetedUnits: ['Army HQ', 'Naval Command', 'Air Force Stations'],
        predictedImpact: 'High - Credential theft, financial fraud',
        preventiveMeasures: ['Email filtering enhanced', 'User awareness alerts', 'MFA enforcement'],
        similarIncidents: 3,
        riskScore: 8.7
      }
    },
    {
      type: 'Mobile Malware Distribution',
      probability: 72,
      timeframe: 'Next 7 days',
      target: 'Android Devices',
      confidence: 89,
      details: {
        vectorAnalysis: 'Third-party app stores, SMS links',
        geographicOrigin: 'North Korea, Iran',
        targetedUnits: ['Field Units', 'Border Posts', 'Communication Centers'],
        predictedImpact: 'Medium - Data exfiltration, device compromise',
        preventiveMeasures: ['App store restrictions', 'Device scanning', 'Network monitoring'],
        similarIncidents: 7,
        riskScore: 7.2
      }
    },
    {
      type: 'Supply Chain Attack',
      probability: 45,
      timeframe: 'Next 30 days',
      target: 'Defence Contractors',
      confidence: 76,
      details: {
        vectorAnalysis: 'Compromised software updates',
        geographicOrigin: 'State-sponsored actors',
        targetedUnits: ['R&D Centers', 'Manufacturing Units', 'IT Infrastructure'],
        predictedImpact: 'Critical - Intellectual property theft, system compromise',
        preventiveMeasures: ['Vendor security audits', 'Code signing verification', 'Network segmentation'],
        similarIncidents: 2,
        riskScore: 9.1
      }
    },
    {
      type: 'Voice Deepfake Attacks',
      probability: 34,
      timeframe: 'Next 60 days',
      target: 'Senior Officers',
      confidence: 68,
      details: {
        vectorAnalysis: 'AI-generated voice calls',
        geographicOrigin: 'Advanced threat actors',
        targetedUnits: ['Command Centers', 'Intelligence Units', 'Strategic Commands'],
        predictedImpact: 'High - Unauthorized orders, information disclosure',
        preventiveMeasures: ['Voice authentication systems', 'Verification protocols', 'Training programs'],
        similarIncidents: 1,
        riskScore: 8.3
      }
    }
  ];

  // Mitigation playbooks
  const mitigationPlaybooks = [
    {
      threat: 'Phishing Email',
      steps: [
        'Do not click any links',
        'Forward email to cyber-helpline@gov.in',
        'Delete the email',
        'Change passwords if clicked'
      ],
      automated: true
    },
    {
      threat: 'Suspicious Call',
      steps: [
        'Never share personal details',
        'Hang up immediately',
        'Report to 1930',
        'Block the number'
      ],
      automated: false
    }
  ];

  const dashboardStats = {
    totalComplaints: userComplaints.length,
    resolvedComplaints: userComplaints.filter(c => c.status === 'Resolved').length,
    autoDetections: 47,
    collectiveAlerts: 23,
    sandboxAnalyses: 12,
    voiceReports: 8
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Analysis': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'reports', label: 'My Reports', icon: FileText },
    { id: 'alerts', label: 'Live Alerts', icon: Bell },
    { id: 'ai-insights', label: 'AI Insights', icon: Brain },
    { id: 'voice', label: 'Voice Reports', icon: Mic }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100">
      {/* Enhanced Header with Better Logout */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b-4 border-blue-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="h-12 w-12 text-blue-600" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Defence Cyber Portal</h1>
                <p className="text-sm text-gray-600">Comprehensive Cyber Safety Platform</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Emergency Button */}
              <motion.a
                href="tel:1930"
                whileHover={{ scale: 1.05 }}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 shadow-lg"
              >
                <Phone className="h-4 w-4" />
                <span>Emergency: 1930</span>
              </motion.a>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(true)}
                  className="p-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {threatAlerts.length}
                  </span>
                </button>
              </div>

              {/* User Menu with Logout */}
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block text-sm font-medium">Profile</span>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <button
                      onClick={() => setShowSettings(true)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <hr className="my-1" />
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-[88px] z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <StatCard title="Total Reports" value={dashboardStats.totalComplaints} icon={FileText} color="blue" />
              <StatCard title="Resolved" value={dashboardStats.resolvedComplaints} icon={CheckCircle} color="green" />
              <StatCard title="Auto-Detections" value={dashboardStats.autoDetections} icon={Shield} color="purple" />
              <StatCard title="Collective Alerts" value={dashboardStats.collectiveAlerts} icon={Bell} color="orange" />
              <StatCard title="Sandbox Analysis" value={dashboardStats.sandboxAnalyses} icon={Activity} color="red" />
              <StatCard title="Voice Reports" value={dashboardStats.voiceReports} icon={Mic} color="indigo" />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <QuickActionCard
                title="Report Incident"
                description="Multi-format evidence support"
                icon={Plus}
                color="blue"
                onClick={() => setShowReportForm(true)}
              />
              <QuickActionCard
                title="Voice Report"
                description="Record & submit voice complaints"
                icon={Mic}
                color="green"
                onClick={() => setShowVoiceRecorder(true)}
              />
              <QuickActionCard
                title="Auto-Detection"
                description="Real-time threat scanning"
                icon={Radar}
                color="purple"
                onClick={() => setShowAutoDetection(true)}
              />
              <QuickActionCard
                title="WhatsApp Bot"
                description="Forward scam messages"
                icon={MessageSquare}
                color="emerald"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              />
            </div>

            {/* Live Threat Alerts */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                  Live Threat Alerts
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="ml-2 h-2 w-2 bg-red-500 rounded-full"
                  />
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {threatAlerts.map((alert, index) => (
                    <ThreatAlertCard
                      key={alert.id}
                      alert={alert}
                      index={index}
                      onViewDetails={handleViewThreatDetails}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Insights Tab */}
        {activeTab === 'ai-insights' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* AI Predictions */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <Brain className="h-6 w-6 mr-2 text-purple-600" />
                    AI Threat Predictions
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {aiPredictions.map((prediction, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{prediction.type}</h4>
                        <span className="text-sm text-purple-600 font-medium">{prediction.probability}% likely</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Target: {prediction.target}</p>
                      <p className="text-sm text-gray-600 mb-3">Timeframe: {prediction.timeframe}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${prediction.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">AI Confidence: {prediction.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mitigation Playbooks */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <BookOpen className="h-6 w-6 mr-2 text-green-600" />
                    Mitigation Playbooks
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {mitigationPlaybooks.map((playbook, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-gray-900">{playbook.threat}</h4>
                        {playbook.automated && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Auto-Applied
                          </span>
                        )}
                      </div>
                      <ol className="space-y-1">
                        {playbook.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Voice Reports Tab */}
        {activeTab === 'voice' && (
          <VoiceReportsTab />
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <ReportsTab complaints={userComplaints} onSelectComplaint={setSelectedComplaint} />
        )}

        {/* Live Alerts Tab */}
        {activeTab === 'alerts' && (
          <LiveAlertsTab alerts={threatAlerts} onViewDetails={handleViewThreatDetails} />
        )}
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showReportForm && (
          <EnhancedReportSubmission onClose={() => setShowReportForm(false)} />
        )}
        {showVoiceRecorder && (
          <VoiceRecorderModal
            onClose={() => setShowVoiceRecorder(false)}
            isRecording={isRecording}
            setIsRecording={setIsRecording}
            showToast={showToast}
          />
        )}
        {showAutoDetection && (
          <AutoDetectionModal onClose={() => setShowAutoDetection(false)} />
        )}
        {selectedComplaint && (
          <ComplaintDetailsModal
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        )}
        {selectedThreat && (
          <ThreatDetailsModal
            threat={selectedThreat}
            onClose={() => setSelectedThreat(null)}
          />
        )}
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
        {showNotifications && (
          <NotificationsModal onClose={() => setShowNotifications(false)} />
        )}
      </AnimatePresence>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`p-4 rounded-lg shadow-lg max-w-sm ${toast.type === 'success' ? 'bg-green-600 text-white' :
                toast.type === 'error' ? 'bg-red-600 text-white' :
                  'bg-blue-600 text-white'
                }`}
            >
              <div className="flex items-center space-x-2">
                {toast.type === 'success' && <CheckCircle className="h-5 w-5" />}
                {toast.type === 'error' && <AlertTriangle className="h-5 w-5" />}
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

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  icon: React.ComponentType<any>;
  color: string;
}> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
    red: 'bg-red-100 text-red-600',
    indigo: 'bg-indigo-100 text-indigo-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
};

// Quick Action Card Component
const QuickActionCard: React.FC<{
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  onClick: () => void;
}> = ({ title, description, icon: Icon, color, onClick }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    emerald: 'from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} rounded-2xl p-6 text-white cursor-pointer shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

// Enhanced Threat Alert Card Component with Details Modal
const ThreatAlertCard: React.FC<{ alert: any; index: number; onViewDetails: (alert: any) => void }> = ({ alert, index, onViewDetails }) => {
  const severityColors = {
    high: 'border-red-400 bg-red-50',
    medium: 'border-orange-400 bg-orange-50',
    critical: 'border-purple-400 bg-purple-50'
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-4 rounded-xl border-l-4 ${severityColors[alert.severity as keyof typeof severityColors]}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 mb-2">{alert.message}</p>
          <div className="flex items-center space-x-4">
            <span className="text-xs text-gray-500">{alert.time}</span>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${alert.action === 'blocked' ? 'bg-red-100 text-red-800' :
              alert.action === 'warned' ? 'bg-orange-100 text-orange-800' :
                'bg-purple-100 text-purple-800'
              }`}>
              {alert.action}
            </span>
            <span className="text-xs text-gray-500">
              {alert.details?.targetsAffected} affected
            </span>
          </div>
        </div>
        <button
          onClick={() => onViewDetails(alert)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          <Eye className="h-4 w-4 mr-1" />
          View Details
        </button>
      </div>
    </motion.div>
  );
};

// Threat Details Modal Component
const ThreatDetailsModal: React.FC<{ threat: any; onClose: () => void }> = ({ threat, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-2 text-red-600" />
                Threat Analysis Report
              </h2>
              <p className="text-sm text-gray-600 mt-1">{threat.details?.threatType}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-red-50 p-4 rounded-xl">
              <h4 className="font-semibold text-red-900 mb-2">Severity Level</h4>
              <p className="text-2xl font-bold text-red-600 capitalize">{threat.severity}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-900 mb-2">Targets Affected</h4>
              <p className="text-2xl font-bold text-blue-600">{threat.details?.targetsAffected}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <h4 className="font-semibold text-green-900 mb-2">Status</h4>
              <p className="text-2xl font-bold text-green-600 capitalize">{threat.action}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Threat Description</h3>
            <p className="text-gray-700">{threat.details?.description}</p>
          </div>

          {/* IOCs */}
          <div className="bg-yellow-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Indicators of Compromise (IOCs)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {threat.details?.iocs?.map((ioc: string, index: number) => (
                <div key={index} className="bg-white p-3 rounded-lg border">
                  <code className="text-sm text-gray-800">{ioc}</code>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Timeline</h3>
            <div className="space-y-3">
              {threat.details?.timeline?.map((event: any, index: number) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-mono">
                    {event.time}
                  </div>
                  <div className="flex-1 bg-white p-3 rounded-lg">
                    {event.event}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mitigation Steps */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Mitigation Actions Taken</h3>
            <div className="space-y-2">
              {threat.details?.mitigationSteps?.map((step: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Voice Reports Tab Component
const VoiceReportsTab: React.FC = () => {
  const voiceReports = [
    {
      id: 'VR-001',
      date: '2024-01-15',
      duration: '2:34',
      status: 'Transcribed',
      threat: 'Scam Call',
      confidence: 94
    },
    {
      id: 'VR-002',
      date: '2024-01-12',
      duration: '1:45',
      status: 'Processing',
      threat: 'Suspicious SMS',
      confidence: 87
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-purple-50">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Mic className="h-6 w-6 mr-2 text-indigo-600" />
            Voice Reports
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {voiceReports.map((report) => (
              <div key={report.id} className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                      {report.id}
                    </span>
                    <span className="text-sm text-gray-600">{report.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AudioLines className="h-4 w-4 text-indigo-600" />
                    <span className="text-sm font-medium">{report.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{report.threat}</p>
                    <p className="text-sm text-gray-600">AI Confidence: {report.confidence}%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg">
                      <Play className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg">
                      <Download className="h-4 w-4" />
                    </button>
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

// Reports Tab Component
const ReportsTab: React.FC<{ complaints: any[]; onSelectComplaint: (complaint: any) => void }> = ({ complaints, onSelectComplaint }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 mr-2 text-blue-600" />
            My Reports & Complaints
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {complaints.map((complaint, index) => (
              <motion.div
                key={complaint.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSelectComplaint(complaint)}
                className="bg-gradient-to-r from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                      {complaint.id}
                    </span>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      AI: {complaint.aiClassification}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Risk Score</div>
                    <div className="text-lg font-bold text-gray-900">{complaint.riskScore}</div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-2">{complaint.threatType}</h4>
                <p className="text-gray-600 mb-4">{complaint.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {complaint.mitigationStatus}
                    </span>
                    {complaint.collectiveAlert && (
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                        Collective Alert Sent
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{complaint.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Live Alerts Tab Component
const LiveAlertsTab: React.FC<{ alerts: any[]; onViewDetails: (alert: any) => void }> = ({ alerts, onViewDetails }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-red-50 to-orange-50">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Bell className="h-6 w-6 mr-2 text-red-600" />
            Live Threat Monitoring
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="ml-2 h-2 w-2 bg-red-500 rounded-full"
            />
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <ThreatAlertCard
                key={alert.id}
                alert={alert}
                index={index}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Report Modal with Multi-format Support
const EnhancedReportModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    threatType: '',
    description: '',
    dateTime: new Date().toISOString().slice(0, 16),
    evidenceFiles: [] as File[]
  });

  const threatTypes = ['Phishing', 'Malware', 'Scam', 'Espionage', 'OPSEC Risk'];
  const supportedFormats = ['Images (JPG, PNG)', 'Videos (MP4, AVI)', 'Audio (MP3, WAV)', 'Documents (PDF, DOC)', 'Text Files'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">Report Cyber Incident</h2>
          <p className="text-sm text-gray-600 mt-1">Multi-format evidence support with AI classification</p>
        </div>

        <form>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Threat Type *</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <option value="">Select threat type</option>
                  {threatTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
                <input
                  type="datetime-local"
                  value={formData.dateTime}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the incident in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence (Multi-format)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-blue-50 rounded-lg">
                    <FileImage className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-xs text-blue-600">Images</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-green-50 rounded-lg">
                    <Video className="h-8 w-8 text-green-600 mb-2" />
                    <span className="text-xs text-green-600">Videos</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-purple-50 rounded-lg">
                    <AudioLines className="h-8 w-8 text-purple-600 mb-2" />
                    <span className="text-xs text-purple-600">Audio</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-orange-50 rounded-lg">
                    <FileText className="h-8 w-8 text-orange-600 mb-2" />
                    <span className="text-xs text-orange-600">Documents</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-red-50 rounded-lg">
                    <Upload className="h-8 w-8 text-red-600 mb-2" />
                    <span className="text-xs text-red-600">Files</span>
                  </div>
                </div>
                <input type="file" multiple className="hidden" id="evidence-upload" />
                <label htmlFor="evidence-upload" className="cursor-pointer">
                  <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">Supports: {supportedFormats.join(', ')}</p>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">AI-Powered Processing</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Your report will be automatically classified and analyzed. Immediate alerts will be sent if malicious content is detected.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-8 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
              >
                Submit Report
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Voice Recorder Modal with AI Assistant
const VoiceRecorderModal: React.FC<{
  onClose: () => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}> = ({ onClose, isRecording, setIsRecording, showToast }) => {
  const [recordingTime, setRecordingTime] = useState(0);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [detectedInfo, setDetectedInfo] = useState({
    threatType: '',
    urgency: '',
    location: '',
    timeOfIncident: ''
  });
  const [showAiForm, setShowAiForm] = useState(false);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState('+91-1930');

  // Simulate AI processing when recording stops
  React.useEffect(() => {
    if (!isRecording && recordingTime > 0) {
      setTimeout(() => {
        setDetectedInfo({
          threatType: 'Phishing Call',
          urgency: 'High',
          location: 'Delhi Cantonment',
          timeOfIncident: new Date().toLocaleString()
        });
        setAiSuggestions([
          'Caller claimed to be from Army Pension Office',
          'Asked for service number and bank details',
          'Suspicious background noise detected',
          'Number not in official directory'
        ]);
        setShowAiForm(true);
      }, 2000);
    }
  }, [isRecording, recordingTime]);

  // Simulate changing phone numbers
  React.useEffect(() => {
    const numbers = ['+91-1930', '+91-1800-11-4444', '+91-011-2309-8989', '+91-1800-180-1551'];
    const interval = setInterval(() => {
      setCurrentPhoneNumber(numbers[Math.floor(Math.random() * numbers.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bot className="h-6 w-6 mr-2 text-green-600" />
                AI-Assisted Voice Report
              </h2>
              <p className="text-sm text-gray-600 mt-1">AI will help you fill out the details automatically</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Emergency Helpline</p>
              <p className="text-lg font-bold text-green-600">{currentPhoneNumber}</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recording Section */}
            <div className="text-center">
              <div className="mb-8">
                <motion.div
                  animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
                  className={`w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-4 ${isRecording ? 'bg-red-500' : 'bg-green-500'
                    }`}
                >
                  <Mic className="h-16 w-16 text-white" />
                </motion.div>

                {isRecording ? (
                  <div>
                    <p className="text-lg font-semibold text-red-600 mb-2">Recording...</p>
                    <p className="text-3xl font-mono text-gray-900 mb-4">
                      {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span>AI is listening and analyzing...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg text-gray-600 mb-4">Tap to start recording</p>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <Bot className="h-4 w-4 inline mr-1" />
                        AI will automatically detect threat type, urgency level, and extract key details from your voice
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-colors ${isRecording
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                >
                  {isRecording ? 'Stop Recording' : 'Start Recording'}
                </button>

                <div className="flex space-x-3">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={recordingTime === 0}
                    onClick={() => {
                      // Show success toast and close modal
                      showToast('Voice report submitted successfully! AI analysis in progress.', 'success');
                      onClose();
                    }}
                    className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
                  >
                    Submit Report
                  </button>
                </div>
              </div>
            </div>

            {/* AI Analysis Section */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-blue-600" />
                  AI Analysis
                </h3>

                {showAiForm ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Threat Type</label>
                        <input
                          type="text"
                          value={detectedInfo.threatType}
                          onChange={(e) => setDetectedInfo({ ...detectedInfo, threatType: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg bg-green-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Urgency Level</label>
                        <select
                          value={detectedInfo.urgency}
                          onChange={(e) => setDetectedInfo({ ...detectedInfo, urgency: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-lg bg-green-50"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={detectedInfo.location}
                        onChange={(e) => setDetectedInfo({ ...detectedInfo, location: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-green-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time of Incident</label>
                      <input
                        type="text"
                        value={detectedInfo.timeOfIncident}
                        onChange={(e) => setDetectedInfo({ ...detectedInfo, timeOfIncident: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded-lg bg-green-50"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">AI analysis will appear here after recording</p>
                  </div>
                )}
              </div>

              {aiSuggestions.length > 0 && (
                <div className="bg-yellow-50 p-6 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                    AI Detected Key Points
                  </h4>
                  <ul className="space-y-2">
                    {aiSuggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Auto Detection Modal
const AutoDetectionModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const detectionFeatures = [
    { name: 'SMS Link Scanning', status: 'Active', icon: MessageSquare, color: 'green' },
    { name: 'Email Attachment Analysis', status: 'Active', icon: FileText, color: 'green' },
    { name: 'App Installation Monitor', status: 'Active', icon: Smartphone, color: 'green' },
    { name: 'Network Traffic Analysis', status: 'Learning', icon: Wifi, color: 'orange' },
    { name: 'Voice Call Screening', status: 'Beta', icon: Phone, color: 'blue' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">Auto-Detection System</h2>
          <p className="text-sm text-gray-600 mt-1">Real-time threat monitoring and protection</p>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-6">
            {detectionFeatures.map((feature, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <feature.icon className="h-6 w-6 text-gray-600" />
                  <span className="font-medium text-gray-900">{feature.name}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${feature.color === 'green' ? 'bg-green-100 text-green-800' :
                  feature.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                  {feature.status}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Recent Detections (Last 24h)</h4>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">23</div>
                <div className="text-xs text-blue-600">Blocked Links</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-xs text-green-600">Quarantined Files</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">5</div>
                <div className="text-xs text-orange-600">Suspicious Calls</div>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 px-6 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Complaint Details Modal (Enhanced)
const ComplaintDetailsModal: React.FC<{ complaint: any; onClose: () => void }> = ({ complaint, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Complaint Analysis</h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-500">Complaint ID</label>
              <p className="text-lg font-mono text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">{complaint.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">AI Classification</label>
              <p className="text-lg font-semibold text-purple-600">{complaint.aiClassification}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-red-50 p-4 rounded-xl">
              <label className="text-sm font-medium text-red-600">Risk Score</label>
              <p className="text-2xl font-bold text-red-600">{complaint.riskScore}/100</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <label className="text-sm font-medium text-green-600">Mitigation</label>
              <p className="text-lg font-semibold text-green-600">{complaint.mitigationStatus}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl">
              <label className="text-sm font-medium text-blue-600">Evidence Types</label>
              <p className="text-sm text-blue-600">{complaint.evidenceTypes.join(', ')}</p>
            </div>
          </div>

          {complaint.collectiveAlert && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-900">Collective Alert Sent</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                This threat has been shared with other defence families for proactive protection.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Settings Modal Component
const SettingsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    notifications: {
      emailAlerts: true,
      smsAlerts: true,
      pushNotifications: true,
      threatUpdates: true,
      weeklyReports: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      autoLock: true,
      biometricAuth: false
    },
    privacy: {
      shareWithUnits: true,
      anonymousReporting: false,
      dataRetention: 90
    },
    display: {
      theme: 'light',
      timezone: 'Asia/Kolkata'
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="h-6 w-6 mr-2 text-blue-600" />
                Settings & Preferences
              </h2>
              <p className="text-sm text-gray-600 mt-1">Customize your security and notification preferences</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Notifications Settings */}
          <div className="bg-yellow-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-yellow-600" />
              Notification Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <label key={key} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      notifications: { ...prev.notifications, [key]: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-red-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-600" />
              Security Settings
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Two-Factor Authentication</span>
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorAuth: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
                <label className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Auto Lock Screen</span>
                  <input
                    type="checkbox"
                    checked={settings.security.autoLock}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, autoLock: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </label>
              </div>
              <div className="bg-white p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Session Timeout (minutes)
                </label>
                <select
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                </select>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-green-600" />
              Privacy Settings
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <span className="text-sm font-medium text-gray-700">Share Threat Data with Other Units</span>
                  <p className="text-xs text-gray-500">Help protect other defence personnel</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.privacy.shareWithUnits}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, shareWithUnits: e.target.checked }
                  }))}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
              </label>
              <div className="bg-white p-3 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data Retention Period (days)
                </label>
                <select
                  value={settings.privacy.dataRetention}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, dataRetention: parseInt(e.target.value) }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>6 months</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Here you would save the settings
                onClose();
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Notifications Modal Component
const NotificationsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const notifications = [
    {
      id: 1,
      type: 'threat',
      title: 'New Phishing Campaign Detected',
      message: 'A sophisticated phishing campaign targeting Army personnel has been identified. 247 emails blocked automatically.',
      time: '2 minutes ago',
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'system',
      title: 'Security Update Available',
      message: 'A critical security update is available for your mobile app. Please update immediately.',
      time: '15 minutes ago',
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'report',
      title: 'Your Voice Report Processed',
      message: 'Your voice report VR-001 has been processed and classified as "Scam Call". Automatic blocking enabled.',
      time: '1 hour ago',
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'alert',
      title: 'Collective Defense Alert',
      message: 'A new threat pattern has been shared by Naval Command. Your protection has been automatically updated.',
      time: '2 hours ago',
      read: true,
      priority: 'medium'
    },
    {
      id: 5,
      type: 'training',
      title: 'Monthly Cyber Awareness Training',
      message: 'Your monthly cyber awareness training is due. Complete it by end of this week.',
      time: '1 day ago',
      read: false,
      priority: 'low'
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'threat': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'system': return <Settings className="h-5 w-5 text-blue-500" />;
      case 'report': return <FileText className="h-5 w-5 text-green-500" />;
      case 'alert': return <Bell className="h-5 w-5 text-orange-500" />;
      case 'training': return <BookOpen className="h-5 w-5 text-purple-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Bell className="h-6 w-6 mr-2 text-blue-600" />
                Notifications
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {notifications.filter(n => !n.read).length} unread notifications
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
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
                className={`p-4 rounded-lg border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'shadow-md' : ''
                  }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'
                        }`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {notification.time}
                      </span>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            Mark as read
                          </button>
                        )}
                        <button className="text-xs text-gray-500 hover:text-gray-700">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              Mark all as read
            </button>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              Clear all notifications
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ComprehensiveDefenceDashboard;