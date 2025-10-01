import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Lock, Eye, EyeOff, Smartphone, AlertTriangle, 
  CheckCircle, Clock, Activity, Globe, Radar, Brain, FileText,
  Phone, Mail, Info, Zap, Target, Database, Bell, X, 
  ExternalLink, Users, Server, Wifi
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
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    type: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    action?: string;
  }>>([]);
  const [showNotifications, setShowNotifications] = useState(false);
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

  // Real-time notification system
  useEffect(() => {
    // Initial notifications
    const initialNotifications = [
      {
        id: 1,
        type: 'critical' as const,
        title: 'Critical Threat Detected',
        message: 'Advanced Persistent Threat targeting defence infrastructure. Immediate action required.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false,
        action: 'View Details'
      },
      {
        id: 2,
        type: 'warning' as const,
        title: 'System Maintenance Scheduled',
        message: 'Scheduled maintenance window: 02:00 - 04:00 IST tomorrow.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        action: 'Acknowledge'
      },
      {
        id: 3,
        type: 'info' as const,
        title: 'New Threat Intelligence',
        message: 'Updated IOCs available for malware family "DarkHalo".',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: true,
        action: 'Download'
      },
      {
        id: 4,
        type: 'success' as const,
        title: 'Incident Resolved',
        message: 'Phishing campaign INC-2025-0930-001 successfully mitigated.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        read: true
      }
    ];
    
    setNotifications(initialNotifications);

    // Simulate real-time notifications
    const notificationInterval = setInterval(() => {
      const newNotifications = [
        {
          type: 'critical' as const,
          title: 'Zero-Day Exploit Detected',
          message: 'New zero-day vulnerability being exploited in the wild. CVE-2025-XXXX assigned.',
          action: 'Investigate'
        },
        {
          type: 'warning' as const,
          title: 'Unusual Network Activity',
          message: 'Anomalous traffic patterns detected from external IP ranges.',
          action: 'Monitor'
        },
        {
          type: 'info' as const,
          title: 'Threat Feed Update',
          message: 'New indicators of compromise added to threat intelligence database.',
          action: 'Review'
        },
        {
          type: 'success' as const,
          title: 'Security Patch Applied',
          message: 'Critical security updates successfully deployed across all systems.'
        },
        {
          type: 'critical' as const,
          title: 'Ransomware Activity',
          message: 'Ransomware group "DarkSide" targeting defence contractors globally.',
          action: 'Alert Teams'
        }
      ];

      if (Math.random() < 0.3) { // 30% chance every interval
        const randomNotification = newNotifications[Math.floor(Math.random() * newNotifications.length)];
        const newNotification = {
          id: Date.now(),
          ...randomNotification,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [newNotification, ...prev.slice(0, 9)]); // Keep only 10 notifications
      }
    }, 45000); // Every 45 seconds

    return () => clearInterval(notificationInterval);
  }, []);

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'critical': return <Zap className="w-5 h-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info': return <Info className="w-5 h-5 text-blue-400" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-400" />;
      default: return <Bell className="w-5 h-5 text-gray-400" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500/50 bg-red-500/10';
      case 'warning': return 'border-yellow-500/50 bg-yellow-500/10';
      case 'info': return 'border-blue-500/50 bg-blue-500/10';
      case 'success': return 'border-green-500/50 bg-green-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
              {/* Notification Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Bell className="w-6 h-6" />
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </motion.span>
                  )}
                </button>

                {/* Notification Dropdown */}
                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute right-0 top-full mt-2 w-96 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl z-50 max-h-96 overflow-hidden"
                    >
                      <div className="bg-slate-700 px-4 py-3 border-b border-slate-600">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-semibold">Notifications</h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        {unreadCount > 0 && (
                          <p className="text-sm text-slate-300 mt-1">
                            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>

                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-4 text-center text-slate-400">
                            <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>No notifications</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <motion.div
                              key={notification.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`p-4 border-b border-slate-700 hover:bg-slate-700/50 transition-colors ${
                                !notification.read ? 'bg-slate-700/30' : ''
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-1">
                                  {getNotificationIcon(notification.type)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className={`text-sm font-medium ${
                                      !notification.read ? 'text-white' : 'text-slate-300'
                                    }`}>
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                                    )}
                                  </div>
                                  <p className="text-sm text-slate-400 mb-2">
                                    {notification.message}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-slate-500">
                                      {notification.timestamp.toLocaleTimeString()}
                                    </span>
                                    <div className="flex items-center space-x-2">
                                      {notification.action && (
                                        <button
                                          onClick={() => markAsRead(notification.id)}
                                          className="text-xs text-blue-400 hover:text-blue-300 flex items-center"
                                        >
                                          {notification.action}
                                          <ExternalLink className="w-3 h-3 ml-1" />
                                        </button>
                                      )}
                                      {!notification.read && (
                                        <button
                                          onClick={() => markAsRead(notification.id)}
                                          className="text-xs text-slate-400 hover:text-slate-300"
                                        >
                                          Mark read
                                        </button>
                                      )}
                                      <button
                                        onClick={() => dismissNotification(notification.id)}
                                        className="text-xs text-slate-500 hover:text-slate-400"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))
                        )}
                      </div>

                      {notifications.length > 0 && (
                        <div className="bg-slate-700 px-4 py-3 border-t border-slate-600">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                              className="text-sm text-blue-400 hover:text-blue-300"
                            >
                              Mark all as read
                            </button>
                            <button
                              onClick={() => setNotifications([])}
                              className="text-sm text-slate-400 hover:text-slate-300"
                            >
                              Clear all
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

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