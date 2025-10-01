import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, AlertTriangle, Users, FileText, Clock, MapPin, Target, CheckCircle, Globe, Brain, Radar,
  Eye, Ban, ArrowUp, X, LogOut, Settings, User, Bell, Activity, TrendingUp, BarChart3, Zap
} from 'lucide-react';

interface EnhancedCertArmyDashboardProps {
  onLogout: () => void;
}

const EnhancedCertArmyDashboard: React.FC<EnhancedCertArmyDashboardProps> = ({ onLogout }) => {
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [defconLevel] = useState(3);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced dashboard statistics
  const dashboardStats = {
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
  };

  // Enhanced incident data with all PS features
  const incidents = [
    {
      id: 'INC-2024-001',
      timestamp: '2024-01-15T14:30:00Z',
      severity: 'Critical',
      type: 'Espionage',
      aiClassification: 'Advanced Persistent Threat',
      title: 'Defence Contractor Infiltration',
      complainant: 'Col. Rajesh Kumar (Retd.)',
      userType: 'Veteran',
      location: 'New Delhi',
      aiConfidence: 97.8,
      status: 'Active Investigation',
      riskScore: 95,
      evidenceTypes: ['email', 'network_traffic', 'malware_sample'],
      mitigationApplied: 'Network Isolation',
      collectiveAlert: true,
      sandboxResults: 'Malicious payload detected',
      threatIntelMatch: 'APT-29 signature'
    },
    {
      id: 'INC-2024-002',
      timestamp: '2024-01-15T13:45:00Z',
      severity: 'High',
      type: 'Phishing',
      aiClassification: 'Mass Campaign',
      title: 'Defence Pension Portal Impersonation',
      complainant: 'Maj. Priya Sharma',
      userType: 'Active Personnel',
      location: 'Mumbai',
      aiConfidence: 89.2,
      status: 'Mitigation In Progress',
      riskScore: 78,
      evidenceTypes: ['email', 'url', 'screenshot'],
      mitigationApplied: 'Domain Blocked',
      collectiveAlert: true,
      sandboxResults: 'Credential harvesting confirmed',
      threatIntelMatch: 'Known phishing kit'
    },
    {
      id: 'INC-2024-003',
      timestamp: '2024-01-15T12:20:00Z',
      severity: 'Medium',
      type: 'Malware',
      aiClassification: 'Mobile Threat',
      title: 'Suspicious Defence News App',
      complainant: 'Lt. Col. Arun Singh',
      userType: 'Active Personnel',
      location: 'Bangalore',
      aiConfidence: 82.5,
      status: 'Under Analysis',
      riskScore: 65,
      evidenceTypes: ['apk_file', 'permissions_list'],
      mitigationApplied: 'App Store Removal',
      collectiveAlert: false,
      sandboxResults: 'Data exfiltration capabilities',
      threatIntelMatch: 'Similar to known spyware'
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
                <h1 className="text-2xl font-bold text-slate-100">CERT-Army Command Center</h1>
                <p className="text-sm text-slate-400">Advanced Threat Intelligence Platform</p>
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
                  <span className="text-blue-400 font-medium text-sm">{dashboardStats.systemUptime}%</span>
                </div>
              </div>

              {/* DEFCON Level */}
              <div className={`px-4 py-2 rounded-lg border-2 ${getDefconColor(defconLevel)}`}>
                <div className="text-center">
                  <div className="text-xs font-semibold">DEFCON</div>
                  <div className="text-2xl font-bold">{defconLevel}</div>
                </div>
              </div>

              {/* Static Notifications - Matching CERT Army UI */}
              <div className="relative">
                <div className="p-2 bg-slate-700 border border-slate-600 rounded cursor-pointer hover:bg-slate-600 transition-colors">
                  <Bell className="h-5 w-5 text-slate-300" />
                  {/* Static notification badge matching the image */}
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </div>
                </div>
              </div>

              {/* User Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 text-slate-300 hover:text-white bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <User className="h-6 w-6" />
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium">CERT Analyst</div>
                    <div className="text-xs text-slate-400">Level 3 Clearance</div>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-56 bg-slate-800 rounded-lg shadow-xl border border-slate-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-slate-600">
                      <div className="text-sm font-medium text-white">Analyst Dashboard</div>
                      <div className="text-xs text-slate-400">Session: {currentTime.toLocaleTimeString()}</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 flex items-center space-x-2">
                      <Settings className="h-4 w-4" />
                      <span>System Settings</span>
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 flex items-center space-x-2">
                      <Activity className="h-4 w-4" />
                      <span>Performance Metrics</span>
                    </button>
                    <hr className="my-1 border-slate-600" />
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Secure Logout</span>
                    </button>
                  </div>
                </div>
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
        {/* Enhanced Stats Overview */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <StatCard title="Total Incidents" value={dashboardStats.totalIncidents} icon={FileText} color="blue" trend="+12%" />
          <StatCard title="Critical Alerts" value={dashboardStats.criticalAlerts} icon={AlertTriangle} color="red" trend="+8%" />
          <StatCard title="AI Classifications" value={dashboardStats.aiClassifications} icon={Brain} color="purple" trend="+15%" />
          <StatCard title="Collective Alerts" value={dashboardStats.collectiveAlerts} icon={Bell} color="orange" trend="+23%" />
          <StatCard title="Sandbox Analyses" value={dashboardStats.sandboxAnalyses} icon={Activity} color="green" trend="+18%" />
          <StatCard title="Playbooks Applied" value={dashboardStats.mitigationPlaybooks} icon={CheckCircle} color="teal" trend="+7%" />
        </section>

        {/* Main Content Based on Active View */}
        {activeView === 'overview' && <OverviewSection incidents={incidents} predictions={aiPredictions} />}
        {activeView === 'incidents' && <IncidentsSection incidents={incidents} onSelectIncident={setSelectedIncident} />}
        {activeView === 'threats' && <ThreatIntelSection />}
        {activeView === 'ai-insights' && <AIInsightsSection predictions={aiPredictions} />}
        {activeView === 'heatmap' && <ThreatHeatmapSection heatmapData={threatHeatmap} />}
      </main>

      {/* Enhanced Incident Details Modal */}
      {selectedIncident && (
        <EnhancedIncidentModal
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
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

// Overview Section Component
const OverviewSection: React.FC<{ incidents: any[]; predictions: any[] }> = ({ incidents, predictions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Critical Incidents */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <AlertTriangle className="h-6 w-6 mr-3 text-red-400" />
            Critical Incidents
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {incidents.filter(i => i.severity === 'Critical').map((incident) => (
            <div key={incident.id} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm text-blue-300">{incident.id}</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                  {incident.severity}
                </span>
              </div>
              <h4 className="font-semibold text-white mb-1">{incident.title}</h4>
              <p className="text-sm text-slate-300 mb-2">AI: {incident.aiClassification}</p>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{incident.location}</span>
                <span>Risk: {incident.riskScore}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Threat Predictions */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            AI Predictions
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{prediction.type}</h4>
                <span className="text-purple-400 font-bold">{prediction.probability}%</span>
              </div>
              <p className="text-sm text-slate-300 mb-2">Target: {prediction.target}</p>
              <p className="text-sm text-slate-300 mb-3">Timeframe: {prediction.timeframe}</p>
              <div className="flex items-center justify-between">
                <div className="flex-1 bg-slate-600 rounded-full h-2 mr-3">
                  <div
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">Confidence: {prediction.confidence}%</span>
              </div>
            </div>
          ))}
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
      indicator: 'army-pension-fake.com',
      confidence: 95,
      source: 'Collective Intelligence',
      firstSeen: '2024-01-15',
      category: 'Phishing'
    },
    {
      id: 2,
      type: 'File Hash',
      indicator: 'a1b2c3d4e5f6...',
      confidence: 98,
      source: 'Sandbox Analysis',
      firstSeen: '2024-01-14',
      category: 'Malware'
    },
    {
      id: 3,
      type: 'IP Address',
      indicator: '192.168.100.45',
      confidence: 87,
      source: 'Network Monitoring',
      firstSeen: '2024-01-13',
      category: 'C&C Server'
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
              <div key={intel.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-xs">
                      {intel.type}
                    </span>
                    <span className="bg-red-500/20 text-red-300 px-2 py-1 rounded text-xs">
                      {intel.category}
                    </span>
                  </div>
                  <span className="text-sm text-slate-400">{intel.firstSeen}</span>
                </div>
                <div className="font-mono text-white bg-slate-800 p-2 rounded mb-3">
                  {intel.indicator}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Source: {intel.source}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-400">Confidence:</span>
                    <div className="w-16 h-2 bg-slate-600 rounded-full">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${intel.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm text-amber-300">{intel.confidence}%</span>
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

// AI Insights Section Component
const AIInsightsSection: React.FC<{ predictions: any[] }> = ({ predictions }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Predictions */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Brain className="h-6 w-6 mr-3 text-purple-400" />
            AI Threat Forecasting
          </h2>
        </div>
        <div className="p-6 space-y-4">
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4">
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
                </div>
                <div>
                  <span className="text-xs text-slate-400">Confidence</span>
                  <div className="text-lg font-bold text-blue-400">{prediction.confidence}%</div>
                </div>
              </div>
              <p className="text-sm text-slate-300 mb-2">Target: {prediction.target}</p>
              <p className="text-sm text-slate-300">Timeframe: {prediction.timeframe}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mitigation Recommendations */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
            Automated Mitigations
          </h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Domain Blocking</h4>
            <p className="text-sm text-slate-300 mb-3">Automatically blocked 23 malicious domains</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Active</span>
              <span className="text-sm text-slate-400">Last 24h</span>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Collective Alerts</h4>
            <p className="text-sm text-slate-300 mb-3">Sent proactive warnings to 1,247 users</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded">Ongoing</span>
              <span className="text-sm text-slate-400">Real-time</span>
            </div>
          </div>

          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Sandbox Quarantine</h4>
            <p className="text-sm text-slate-300 mb-3">Isolated 15 suspicious files for analysis</p>
            <div className="flex items-center justify-between">
              <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">Processing</span>
              <span className="text-sm text-slate-400">In progress</span>
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
                  className={`px-3 py-1 text-xs rounded-full transition-colors ${
                    mapView === view 
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
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    timeRange === range 
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
                    className={`p-4 bg-slate-700/50 rounded-lg border border-slate-600 cursor-pointer transition-all hover:bg-slate-600/50 ${
                      selectedHotspot?.id === location.id ? 'ring-2 ring-green-400' : ''
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

export default EnhancedCertArmyDashboard;