import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, X, Shield, AlertTriangle, CheckCircle, Info, Phone, Mail, 
  MessageSquare, Smartphone, Eye, Download, Share2, Clock, Zap,
  Volume2, VolumeX, Settings
} from 'lucide-react';

interface NotificationSystemProps {
  onClose?: () => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [filter, setFilter] = useState('all');

  // Enhanced notification types with detailed information
  const mockNotifications = [
    {
      id: 1,
      type: 'auto-detection',
      category: 'Security',
      title: 'Malicious Link Blocked',
      message: 'SMS link automatically blocked before you could click it',
      details: {
        source: 'SMS from +91-98765-43210',
        threat: 'Phishing - Army Pension Scam',
        url: 'hxxp://fake-army-pension[.]com/login',
        action: 'Link blocked and sender reported',
        riskLevel: 'High'
      },
      time: new Date(Date.now() - 2 * 60 * 1000),
      severity: 'high',
      status: 'resolved',
      icon: Shield,
      color: 'red'
    },
    {
      id: 2,
      type: 'collective',
      category: 'Community Alert',
      title: 'New Threat Detected',
      message: 'Phishing campaign reported by 23+ defence families',
      details: {
        source: 'Community Intelligence',
        threat: 'ECHS Portal Impersonation',
        description: 'Scammers asking for Aadhaar and bank details',
        affectedUsers: '1,247 users warned',
        action: 'Proactive alerts sent to all users'
      },
      time: new Date(Date.now() - 60 * 60 * 1000),
      severity: 'medium',
      status: 'active',
      icon: Bell,
      color: 'orange'
    },
    {
      id: 3,
      type: 'sandbox',
      category: 'File Analysis',
      title: 'Malware Detected in Email',
      message: 'Suspicious attachment safely analyzed and quarantined',
      details: {
        source: 'Email from defence-updates@fake-domain.com',
        fileName: 'Defence_Circular_2024.pdf',
        threat: 'Trojan.Win32.Agent.xyz',
        analysis: 'Data exfiltration capabilities detected',
        action: 'File quarantined, sender blocked'
      },
      time: new Date(Date.now() - 3 * 60 * 60 * 1000),
      severity: 'critical',
      status: 'resolved',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 4,
      type: 'voice-screening',
      category: 'Call Protection',
      title: 'Suspicious Call Blocked',
      message: 'Potential scam call automatically blocked',
      details: {
        source: 'Unknown number +91-99999-88888',
        threat: 'Social Engineering - Army Welfare Scam',
        description: 'Caller claimed to be from Army Welfare Fund',
        action: 'Call blocked, number added to blacklist',
        duration: 'Blocked before connection'
      },
      time: new Date(Date.now() - 5 * 60 * 60 * 1000),
      severity: 'high',
      status: 'resolved',
      icon: Phone,
      color: 'red'
    },
    {
      id: 5,
      type: 'whatsapp-bot',
      category: 'Bot Alert',
      title: 'Scam Message Forwarded',
      message: 'Message forwarded to WhatsApp bot for analysis',
      details: {
        source: 'WhatsApp message forwarded by user',
        threat: 'Fake lottery win notification',
        analysis: 'Classic advance fee fraud pattern detected',
        action: 'Message analyzed, user educated about scam',
        confidence: '94% scam probability'
      },
      time: new Date(Date.now() - 8 * 60 * 60 * 1000),
      severity: 'medium',
      status: 'resolved',
      icon: MessageSquare,
      color: 'green'
    },
    {
      id: 6,
      type: 'ai-prediction',
      category: 'AI Forecast',
      title: 'Threat Prediction Alert',
      message: 'AI predicts high probability of phishing campaign',
      details: {
        source: 'AI Threat Prediction System',
        prediction: 'Phishing campaign targeting defence personnel',
        probability: '87% likelihood in next 48 hours',
        target: 'Defence Pension Portal users',
        recommendation: 'Extra vigilance advised for pension-related communications'
      },
      time: new Date(Date.now() - 12 * 60 * 60 * 1000),
      severity: 'medium',
      status: 'active',
      icon: Zap,
      color: 'purple'
    }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const getTimeAgo = (time: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - time.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 border-red-500 text-red-800';
      case 'high': return 'bg-orange-100 border-orange-500 text-orange-800';
      case 'medium': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'low': return 'bg-blue-100 border-blue-500 text-blue-800';
      default: return 'bg-gray-100 border-gray-500 text-gray-800';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'red': return 'text-red-600';
      case 'orange': return 'text-orange-600';
      case 'yellow': return 'text-yellow-600';
      case 'green': return 'text-green-600';
      case 'blue': return 'text-blue-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'active') return notification.status === 'active';
    if (filter === 'resolved') return notification.status === 'resolved';
    return notification.severity === filter;
  });

  const playNotificationSound = () => {
    if (soundEnabled) {
      // In a real app, this would play an actual sound
      console.log('🔊 Notification sound played');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6" />
              <div>
                <h2 className="text-xl font-bold">Notification Center</h2>
                <p className="text-blue-100 text-sm">Real-time security alerts and updates</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
              >
                {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              </button>
              <button className="p-2 hover:bg-blue-600 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <div className="flex space-x-4">
            {[
              { id: 'all', label: 'All', count: notifications.length },
              { id: 'active', label: 'Active', count: notifications.filter(n => n.status === 'active').length },
              { id: 'critical', label: 'Critical', count: notifications.filter(n => n.severity === 'critical').length },
              { id: 'resolved', label: 'Resolved', count: notifications.filter(n => n.status === 'resolved').length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredNotifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 border-l-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${getSeverityColor(notification.severity)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-white ${getIconColor(notification.color)}`}>
                    <notification.icon className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          notification.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{getTimeAgo(notification.time)}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{notification.message}</p>
                    
                    <div className="bg-white rounded-lg p-4 mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Details:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        {Object.entries(notification.details).map(([key, value]) => (
                          <div key={key}>
                            <span className="font-medium text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="ml-2 text-gray-800">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        <Eye className="h-4 w-4" />
                        <span>View Full Report</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      {notification.status === 'active' && (
                        <button 
                          onClick={() => {
                            setNotifications(prev => 
                              prev.map(n => 
                                n.id === notification.id 
                                  ? { ...n, status: 'resolved' }
                                  : n
                              )
                            );
                          }}
                          className="flex items-center space-x-2 px-3 py-1 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark Resolved</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredNotifications.length} of {notifications.length} notifications
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={playNotificationSound}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Test Sound
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm">
                Mark All Read
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationSystem;