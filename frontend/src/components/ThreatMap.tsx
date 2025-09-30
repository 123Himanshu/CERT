import React, { useState, useEffect } from 'react';
import { Globe, AlertTriangle, Shield, Activity, MapPin, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreatMap: React.FC = () => {
  const [activeThreats, setActiveThreats] = useState(0);
  const [blockedAttacks, setBlockedAttacks] = useState(0);

  // Mock threat locations for overlay
  const threatLocations = [
    { id: 1, x: 25, y: 35, severity: 'high', city: 'New Delhi' },
    { id: 2, x: 45, y: 55, severity: 'critical', city: 'Mumbai' },
    { id: 3, x: 65, y: 45, severity: 'medium', city: 'Bangalore' },
    { id: 4, x: 55, y: 65, severity: 'high', city: 'Chennai' },
    { id: 5, x: 35, y: 25, severity: 'low', city: 'Kolkata' },
    { id: 6, x: 40, y: 40, severity: 'critical', city: 'Hyderabad' },
  ];

  useEffect(() => {
    // Simulate real-time threat updates
    const interval = setInterval(() => {
      setActiveThreats(prev => Math.max(0, prev + Math.floor(Math.random() * 3) - 1));
      setBlockedAttacks(prev => prev + Math.floor(Math.random() * 2));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 border-red-600';
      case 'high': return 'bg-orange-500 border-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      case 'low': return 'bg-blue-500 border-blue-600';
      default: return 'bg-gray-500 border-gray-600';
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
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Globe className="h-6 w-6 mr-2 text-blue-600" />
            Live Cyber Threat Map - India
          </h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-600">Active Threats: {activeThreats + 12}</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-gray-600">Blocked: {blockedAttacks + 847}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-gray-900">
        <img
          src="/images/Screenshot 2025-09-30 005304.png"
          alt="India Cyber Threat Map"
          className="w-full h-[400px] object-cover opacity-90"
        />

        {/* Animated overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Scanning effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-blue-500/10" />
        </motion.div>

        {/* Threat Location Markers */}
        {threatLocations.map((threat, index) => (
          <motion.div
            key={threat.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${threat.x}%`, top: `${threat.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            {/* Pulsing ring */}
            <motion.div
              className={`absolute inset-0 rounded-full border-2 ${getSeverityColor(threat.severity).split(' ')[1]}`}
              animate={{
                scale: [1, 2, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ width: '20px', height: '20px', marginLeft: '-10px', marginTop: '-10px' }}
            />

            {/* Main marker */}
            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white ${getSeverityColor(threat.severity).split(' ')[0]} relative z-10`}>
              {getSeverityIcon(threat.severity)}
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                <div className="font-semibold">{threat.city}</div>
                <div className="capitalize">{threat.severity} threat</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </motion.div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
          <h4 className="text-sm font-semibold mb-2">Threat Levels</h4>
          <div className="space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Low</span>
            </div>
          </div>
        </div>

        {/* Real-time status */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
          <div className="flex items-center text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <span>Live Monitoring</span>
          </div>
          <div className="text-xs text-gray-300 mt-1">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-red-600">{threatLocations.filter(t => t.severity === 'critical').length}</div>
            <div className="text-xs text-gray-600">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-600">{threatLocations.filter(t => t.severity === 'high').length}</div>
            <div className="text-xs text-gray-600">High</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-600">{threatLocations.filter(t => t.severity === 'medium').length}</div>
            <div className="text-xs text-gray-600">Medium</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600">{threatLocations.filter(t => t.severity === 'low').length}</div>
            <div className="text-xs text-gray-600">Low</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;