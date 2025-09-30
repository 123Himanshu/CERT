import React from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const ThreatMap: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Globe className="h-6 w-6 mr-2 text-blue-600" />
          Live Threat Map
        </h3>
      </div>
      <div className="relative">
        <img
          src="/images/Screenshot 2025-09-30 005304.png"
          alt="Cyber Threat Map"
          className="w-full h-[400px] object-cover"
        />
        {/* Animated overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="w-full h-full bg-blue-500/10" />
        </motion.div>
      </div>
    </div>
  );
};

export default ThreatMap;