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

              {/* Notifications */}
              <div className="relative">
                <button className="p-2 text-slate-400 hover:text-slate-300 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {dashboardStats.criticalAlerts}
                  </span>
                </button>
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

              {/* Time Display */}
              <div className="text-right">
                <div className="text-lg font-mono text-blue-300">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-sm text-slate-400">
                  {currentTime.toLocaleDateString()}
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
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeView === item.id
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
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    incident.severity === 'Critical' ? 'bg-red-500 text-white' :
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
                        className={`h-2 rounded-full ${
                          incident.riskScore > 80 ? 'bg-red-500' : 
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
                  <TrendingUp className={`h-4 w-4 ${
                    prediction.trend === 'increasing' ? 'text-red-400' :
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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Visualization */}
      <div className="lg:col-span-2 bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Globe className="h-6 w-6 mr-3 text-green-300" />
            India Threat Heatmap
          </h2>
        </div>
        <div className="p-6">
          <div className="relative bg-slate-700/50 rounded-lg p-4 h-96 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <Globe className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold">Interactive Threat Map</p>
                <p className="text-sm">Real-time incident visualization across India</p>
              </div>
            </div>
            
            {/* Simulated hotspots */}
            {heatmapData.map((hotspot, index) => (
              <motion.div
                key={hotspot.city}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className={`absolute w-4 h-4 rounded-full border-2 border-white ${
                  hotspot.severity === 'high' ? 'bg-red-400 shadow-red-400/50' :
                  hotspot.severity === 'medium' ? 'bg-yellow-400 shadow-yellow-400/50' : 
                  'bg-green-400 shadow-green-400/50'
                } shadow-lg`}
                style={{
                  left: `${20 + index * 12}%`,
                  top: `${30 + (index % 3) * 25}%`
                }}
              >
                <motion.div
                  animate={{ scale: [1, 2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className={`absolute inset-0 rounded-full ${
                    hotspot.severity === 'high' ? 'bg-red-400' :
                    hotspot.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  } opacity-30`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hotspot Details */}
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-600 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-600 bg-slate-700/50">
          <h2 className="text-xl font-bold text-white">Incident Hotspots</h2>
        </div>
        <div className="p-6">
          <div className="space-y-3">
            {heatmapData.map((hotspot) => (
              <div key={hotspot.city} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    hotspot.severity === 'high' ? 'bg-red-400' :
                    hotspot.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`} />
                  <span className="text-slate-300 font-medium">{hotspot.city}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{hotspot.incidents}</div>
                  <div className="text-xs text-slate-400">incidents</div>
                </div>
              </div>
            ))}
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