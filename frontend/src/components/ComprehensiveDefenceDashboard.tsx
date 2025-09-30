import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, FileText, Clock, CheckCircle, Phone, Bell, BookOpen, Plus, Eye, Upload, Calendar,
  User, MapPin, TrendingUp, Activity, Zap, Mic, MessageSquare, Bot, Globe, Brain, Radar, Camera,
  Video, AudioLines, FileImage, Smartphone, Wifi, WifiOff, LogOut, Settings, Home, BarChart3,
  Headphones, Volume2, Play, Pause, Download, Share2, ExternalLink, AlertCircle, Info
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import EnhancedReportSubmission from './EnhancedReportSubmission';

interface ComprehensiveDefenceDashboardProps {
  onLogout: () => void;
}

const ComprehensiveDefenceDashboard: React.FC<ComprehensiveDefenceDashboardProps> = ({ onLogout }) => {
  const { t } = useLanguage();
  const [showReportForm, setShowReportForm] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showVoiceRecorder, setShowVoiceRecorder] = useState(false);
  const [showAutoDetection, setShowAutoDetection] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

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

  // Real-time threat alerts
  const threatAlerts = [
    {
      id: 1,
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

  // AI Predictions
  const aiPredictions = [
    {
      type: 'Phishing Campaign',
      probability: 87,
      timeframe: 'Next 48 hours',
      target: 'Defence Pension Portal',
      confidence: 94
    },
    {
      type: 'Malware Distribution',
      probability: 72,
      timeframe: 'Next week',
      target: 'Mobile Apps',
      confidence: 89
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
              <LanguageSelector />

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
                <button className="p-2 text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
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
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
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
                    <ThreatAlertCard key={alert.id} alert={alert} index={index} />
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
          <LiveAlertsTab alerts={threatAlerts} />
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
      </AnimatePresence>
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

// Threat Alert Card Component
const ThreatAlertCard: React.FC<{ alert: any; index: number }> = ({ alert, index }) => {
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
          </div>
        </div>
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
          View Details
        </button>
      </div>
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
const LiveAlertsTab: React.FC<{ alerts: any[] }> = ({ alerts }) => {
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
              <ThreatAlertCard key={alert.id} alert={alert} index={index} />
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

// Voice Recorder Modal
const VoiceRecorderModal: React.FC<{
  onClose: () => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}> = ({ onClose, isRecording, setIsRecording }) => {
  const [recordingTime, setRecordingTime] = useState(0);

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
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-2xl font-bold text-gray-900">Voice Report</h2>
          <p className="text-sm text-gray-600 mt-1">Record your complaint in your preferred language</p>
        </div>

        <div className="p-8 text-center">
          <div className="mb-8">
            <motion.div
              animate={{ scale: isRecording ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${isRecording ? 'bg-red-500' : 'bg-green-500'
                }`}
            >
              <Mic className="h-12 w-12 text-white" />
            </motion.div>

            {isRecording ? (
              <div>
                <p className="text-lg font-semibold text-red-600 mb-2">Recording...</p>
                <p className="text-3xl font-mono text-gray-900">{Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}</p>
              </div>
            ) : (
              <p className="text-lg text-gray-600">Tap to start recording</p>
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
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                Submit
              </button>
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

export default ComprehensiveDefenceDashboard;