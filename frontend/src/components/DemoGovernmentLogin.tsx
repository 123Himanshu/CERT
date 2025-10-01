import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Smartphone, CheckCircle, Phone, Mail, MapPin, Calendar, Flag, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface DemoGovernmentLoginProps {
  onLogin: () => void;
}

const DemoGovernmentLogin: React.FC<DemoGovernmentLoginProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    serviceNumber: '',
    rank: '',
    unit: '',
    name: '',
    fatherName: '',
    dateOfBirth: '',
    phoneNumber: '',
    email: '',
    address: '',
    emergencyContact: '',
    password: '',
    otp: ''
  });

  const ranks = [
    'Field Marshal', 'General', 'Lieutenant General', 'Major General', 'Brigadier',
    'Colonel', 'Lieutenant Colonel', 'Major', 'Captain', 'Lieutenant',
    'Admiral', 'Vice Admiral', 'Rear Admiral', 'Commodore',
    'Air Chief Marshal', 'Air Marshal', 'Air Vice Marshal', 'Air Commodore',
    'Group Captain', 'Wing Commander', 'Squadron Leader', 'Flight Lieutenant',
    'Subedar Major', 'Subedar', 'Naib Subedar', 'Havildar', 'Naik', 'Lance Naik', 'Sepoy'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      alert(`✅ Registration Successful!\n\nWelcome ${formData.name || 'Defence Personnel'}!\n\nYour Defence Portal account has been created.\n\nService Number: ${formData.serviceNumber || 'DEMO123'}\nRank: ${formData.rank || 'Major'}\nUnit: ${formData.unit || 'Demo Unit'}\n\nYou can now access:\n• Report cyber incidents\n• Voice complaint system\n• Real-time threat alerts\n• AI-powered protection\n\nRedirecting to dashboard...`);
      onLogin();
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Government Header */}
      <header className="bg-white shadow-md border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                alt="Government of India"
                className="h-16 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">भारत सरकार | Government of India</h1>
                <p className="text-sm text-gray-600">रक्षा मंत्रालय | Ministry of Defence</p>
                <p className="text-xs text-blue-600 font-medium">Defence Personnel Cyber Safety Portal</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">Emergency Helpline</div>
                <div className="text-lg font-bold text-red-600">1930</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
            <div className="flex items-center space-x-4">
              <Shield className="h-12 w-12" />
              <div>
                <h2 className="text-2xl font-bold">Defence Personnel Registration</h2>
                <p className="text-blue-100">Demo Mode - Fill any details to proceed</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleLogin} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Personal Details */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.serviceNumber}
                    onChange={(e) => handleInputChange('serviceNumber', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter service number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rank</label>
                <select
                  value={formData.rank}
                  onChange={(e) => handleInputChange('rank', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Rank</option>
                  {ranks.map((rank) => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit/Formation</label>
                <div className="relative">
                  <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter unit/formation"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-green-900">Demo Mode Active</h4>
                  <p className="text-sm text-green-700 mt-1">
                    This is a demonstration. You can fill any details or leave fields empty.
                    Click "Complete Registration" to proceed to the dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-6 w-6" />
                  <span>Complete Registration</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoGovernmentLogin;