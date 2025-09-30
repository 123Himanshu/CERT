import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Lock, Eye, EyeOff, Smartphone, AlertTriangle, 
  CheckCircle, Clock, Activity, Globe, Radar, Brain, FileText,
  Phone, Mail, Info, Zap, Target, Database
} from 'lucide-react';

interface GovernmentCertLoginProps {
  onLogin: () => void;
}

const GovernmentCertLogin: React.FC<GovernmentCertLoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    analystId: '',
    password: '',
    mfaToken: '',
    captcha: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    threatLevel: 'MODERATE',
    activeIncidents: 23,
    systemHealth: 98.7,
    lastUpdate: new Date().toLocaleTimeString()
  });

  // Real-time system updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString(),
        activeIncidents: Math.floor(Math.random() * 50) + 10,
        systemHealth: 95 + Math.random() * 5
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate secure authentication
    setTimeout(() => {
      // Show CERT access granted message
      alert(`🛡️ CERT-Army Access Granted!\n\nWelcome to the Command Center, Analyst ${formData.analystId}!\n\nSecurity Clearance: Level 3 - CLASSIFIED\nAccess Level: Full System Access\n\nYou now have access to:\n• Real-time threat intelligence\n• Incident analysis dashboard\n• AI-powered threat detection\n• Collective defense coordination\n• Sandbox malware analysis\n• Predictive threat modeling\n\nAll activities are logged and monitored.\n\nEntering secure environment...`);
      onLogin();
      setIsLoading(false);
    }, 3000);
  };

  const getThreatLevelColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-400 bg-green-500/20';
      case 'MODERATE': return 'text-yellow-400 bg-yellow-500/20';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20';
      case 'CRITICAL': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
      {/* Classified Header */}
      <header className="bg-slate-800/95 backdrop-blur-sm border-b-2 border-red-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                alt="Government of India"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-white">CERT-Army Command Center</h1>
                <p className="text-sm text-red-300">CLASSIFIED - AUTHORIZED PERSONNEL ONLY</p>
                <p className="text-xs text-slate-400">Ministry of Defence | Government of India</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm font-medium text-slate-300">System Status</div>
                <div className="text-lg font-bold text-green-400">OPERATIONAL</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-300">Threat Level</div>
                <div className={`text-lg font-bold px-3 py-1 rounded ${getThreatLevelColor(systemStatus.threatLevel)}`}>
                  {systemStatus.threatLevel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cyber Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Login Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-red-500/30 overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6 text-white">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Shield className="h-12 w-12" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">CERT-Army Secure Access</h2>
                    <p className="text-red-100">Multi-Factor Authentication Required</p>
                  </div>
                </div>
              </div>

              {/* Security Warning */}
              <div className="bg-red-900/30 border-b border-red-500/50 px-8 py-4">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-300 font-semibold">RESTRICTED ACCESS SYSTEM</h3>
                    <p className="text-red-200 text-sm">
                      This system is exclusively for authorized CERT-Army analysts. All access attempts are logged and monitored. 
                      Unauthorized access is prohibited under the Information Technology Act, 2000.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleLogin} className="p-8 space-y-6">
                {/* Analyst ID */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Analyst ID *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.analystId}
                      onChange={(e) => handleInputChange('analystId', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="Enter Analyst ID (CERT-XXXX)"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Secure Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="Enter secure password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* MFA Token */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    MFA Token *
                  </label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      value={formData.mfaToken}
                      onChange={(e) => handleInputChange('mfaToken', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-slate-400"
                      placeholder="Enter 6-digit MFA token"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">
                    Use your authenticator app to generate the token
                  </div>
                </div>

                {/* CAPTCHA */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Security Verification *
                  </label>
                  <div className="bg-slate-700 border border-slate-600 rounded-lg p-4 mb-3">
                    <div className="flex items-center justify-center h-16 bg-slate-600 rounded text-white font-mono text-xl tracking-wider">
                      7K9M2X
                    </div>
                  </div>
                  <input
                    type="text"
                    value={formData.captcha}
                    onChange={(e) => handleInputChange('captcha', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-white placeholder-slate-400"
                    placeholder="Enter the code shown above"
                    required
                  />
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Access Secure Dashboard</span>
                    </>
                  )}
                </motion.button>

                {/* Additional Security Info */}
                <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-300">Security Notice</h4>
                      <ul className="text-xs text-slate-400 mt-2 space-y-1">
                        <li>• All login attempts are logged and monitored</li>
                        <li>• Session timeout: 30 minutes of inactivity</li>
                        <li>• Report any suspicious activity immediately</li>
                        <li>• Use only authorized devices for access</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>

          {/* System Status Sidebar */}
          <div className="space-y-6">
            {/* Real-time System Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 overflow-hidden"
            >
              <div className="bg-blue-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  System Status
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">System Health</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-slate-600 rounded-full">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${systemStatus.systemHealth}%` }}
                      />
                    </div>
                    <span className="text-sm text-green-400">{systemStatus.systemHealth.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Active Incidents</span>
                  <span className="text-lg font-bold text-orange-400">{systemStatus.activeIncidents}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Last Update</span>
                  <span className="text-sm text-slate-400">{systemStatus.lastUpdate}</span>
                </div>

                <div className="pt-3 border-t border-slate-600">
                  <div className="flex items-center space-x-2 mb-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-2 w-2 bg-green-400 rounded-full"
                    />
                    <span className="text-sm text-green-400 font-medium">All Systems Operational</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Threat Intelligence Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 overflow-hidden"
            >
              <div className="bg-red-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <Radar className="h-5 w-5 mr-2" />
                  Live Threat Feed
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Zap className="h-4 w-4 text-red-400" />
                    <span className="text-xs text-red-300 font-medium">CRITICAL</span>
                    <span className="text-xs text-slate-400">2m ago</span>
                  </div>
                  <p className="text-sm text-slate-300">APT group targeting defence contractors</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-3 bg-orange-500/20 border border-orange-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Target className="h-4 w-4 text-orange-400" />
                    <span className="text-xs text-orange-300 font-medium">HIGH</span>
                    <span className="text-xs text-slate-400">15m ago</span>
                  </div>
                  <p className="text-sm text-slate-300">Phishing campaign detected</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <Brain className="h-4 w-4 text-yellow-400" />
                    <span className="text-xs text-yellow-300 font-medium">MEDIUM</span>
                    <span className="text-xs text-slate-400">1h ago</span>
                  </div>
                  <p className="text-sm text-slate-300">Suspicious domain registered</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Access */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 overflow-hidden"
            >
              <div className="bg-green-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Quick Access
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-blue-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-300">Incident Database</div>
                      <div className="text-xs text-slate-400">Access threat reports</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-green-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-300">Threat Map</div>
                      <div className="text-xs text-slate-400">Geographic visualization</div>
                    </div>
                  </div>
                </button>

                <button className="w-full text-left p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-sm font-medium text-slate-300">AI Analytics</div>
                      <div className="text-xs text-slate-400">Predictive insights</div>
                    </div>
                  </div>
                </button>
              </div>
            </motion.div>

            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-slate-600 overflow-hidden"
            >
              <div className="bg-orange-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Emergency Contacts
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">CERT-In SOC</span>
                  <span className="text-sm text-orange-400">+91-11-2468-0000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Cyber Crime Cell</span>
                  <span className="text-sm text-orange-400">1930</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Technical Support</span>
                  <span className="text-sm text-orange-400">+91-11-2468-1111</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Classified Footer */}
      <footer className="bg-slate-900 border-t border-red-500/30 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-400">
              <p>CERT-Army Command Center | Ministry of Defence, Government of India</p>
              <p className="text-red-400">CLASSIFIED SYSTEM - AUTHORIZED ACCESS ONLY</p>
            </div>
            <div className="text-sm text-slate-400">
              <p>Last Security Update: {new Date().toLocaleDateString()}</p>
              <p>System Version: v2.4.1-secure</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentCertLogin;