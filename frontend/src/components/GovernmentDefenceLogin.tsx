import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, User, Smartphone, Eye, EyeOff, Lock, AlertTriangle, CheckCircle, 
  Phone, Mail, MapPin, Calendar, Clock, Info, FileText, Globe, Flag
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

interface GovernmentDefenceLoginProps {
  onLogin: () => void;
}

const GovernmentDefenceLogin: React.FC<GovernmentDefenceLoginProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
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
    otp: '',
    captcha: '',
    termsAccepted: false
  });

  // Government ranks for dropdown
  const ranks = [
    'Field Marshal', 'General', 'Lieutenant General', 'Major General', 'Brigadier',
    'Colonel', 'Lieutenant Colonel', 'Major', 'Captain', 'Lieutenant',
    'Admiral', 'Vice Admiral', 'Rear Admiral', 'Commodore',
    'Air Chief Marshal', 'Air Marshal', 'Air Vice Marshal', 'Air Commodore',
    'Group Captain', 'Wing Commander', 'Squadron Leader', 'Flight Lieutenant',
    'Subedar Major', 'Subedar', 'Naib Subedar', 'Havildar', 'Naik', 'Lance Naik', 'Sepoy'
  ];

  // Mock notifications for demonstration
  useEffect(() => {
    const mockNotifications = [
      {
        id: 1,
        type: 'security',
        title: 'Security Alert',
        message: 'New phishing campaign targeting defence personnel detected. Stay vigilant.',
        time: '2 hours ago',
        priority: 'high'
      },
      {
        id: 2,
        type: 'system',
        title: 'System Maintenance',
        message: 'Scheduled maintenance on 25th Jan 2024, 2:00 AM - 4:00 AM IST',
        time: '1 day ago',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'update',
        title: 'New Features',
        message: 'Voice complaint feature now available in Hindi and regional languages',
        time: '3 days ago',
        priority: 'low'
      }
    ];
    setNotifications(mockNotifications);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration/authentication process
    setTimeout(() => {
      // Show success message
      alert(`✅ Registration Successful!\n\nWelcome ${formData.name}!\n\nYour Defence Portal account has been created successfully.\n\nService Number: ${formData.serviceNumber}\nRank: ${formData.rank}\nUnit: ${formData.unit}\n\nYou can now access all cyber safety features including:\n• Report cyber incidents\n• Voice complaint system\n• Real-time threat alerts\n• AI-powered protection\n\nRedirecting to your dashboard...`);
      onLogin();
      setIsLoading(false);
    }, 3000);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'security': return <Shield className="h-5 w-5 text-red-600" />;
      case 'system': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'update': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
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

      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-8 py-3">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Portal Home</span>
            </div>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Guidelines</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="text-sm">Contact Us</span>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <span className="text-sm">Help</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Login Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-6 text-white">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Shield className="h-12 w-12" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-bold">Defence Personnel Registration</h2>
                    <p className="text-blue-100">Secure access to cyber safety services</p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 px-8 py-4">
                <div className="flex items-center justify-between">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        currentStep >= step 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      <span className={`ml-2 text-sm ${
                        currentStep >= step ? 'text-blue-600 font-medium' : 'text-gray-500'
                      }`}>
                        {step === 1 ? 'Personal Details' : step === 2 ? 'Service Details' : 'Security Setup'}
                      </span>
                      {step < 3 && (
                        <div className={`w-16 h-1 mx-4 ${
                          currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLogin} className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name (As per service records) *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter full name (e.g., Rajesh Kumar Singh)"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Father's Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.fatherName}
                              onChange={(e) => handleInputChange('fatherName', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter father's name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mobile Number *
                          </label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="+91 XXXXX XXXXX"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Emergency Contact *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="tel"
                              value={formData.emergencyContact}
                              onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Emergency contact number"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Address *
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <textarea
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            rows={3}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter complete address"
                            required
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Service Details */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Service Number *
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.serviceNumber}
                              onChange={(e) => handleInputChange('serviceNumber', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter service number (e.g., 12345678)"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rank *
                          </label>
                          <select
                            value={formData.rank}
                            onChange={(e) => handleInputChange('rank', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select Rank</option>
                            {ranks.map((rank) => (
                              <option key={rank} value={rank}>{rank}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit/Formation *
                          </label>
                          <div className="relative">
                            <Flag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.unit}
                              onChange={(e) => handleInputChange('unit', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter unit/formation details"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-blue-900">Service Verification</h4>
                            <p className="text-sm text-blue-700 mt-1">
                              Your service details will be verified with official records. Please ensure all information is accurate.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Security Setup */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Create Password *
                          </label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              value={formData.password}
                              onChange={(e) => handleInputChange('password', e.target.value)}
                              className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Create strong password"
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          <div className="mt-2 text-xs text-gray-500">
                            Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            OTP Verification *
                          </label>
                          <div className="relative">
                            <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              value={formData.otp}
                              onChange={(e) => handleInputChange('otp', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Enter OTP"
                              required
                            />
                          </div>
                          <button
                            type="button"
                            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                          >
                            Send OTP to registered mobile
                          </button>
                        </div>
                      </div>

                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium text-red-900">Security Notice</h4>
                            <p className="text-sm text-red-700 mt-1">
                              This portal is exclusively for Defence Personnel, their families, and authorized personnel. 
                              Unauthorized access is prohibited and punishable under law.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={formData.termsAccepted}
                          onChange={(e) => handleInputChange('termsAccepted', e.target.checked.toString())}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="terms" className="text-sm text-gray-700">
                          I agree to the <a href="#" className="text-blue-600 hover:text-blue-800">Terms and Conditions</a> and 
                          <a href="#" className="text-blue-600 hover:text-blue-800 ml-1">Privacy Policy</a> of the Defence Cyber Safety Portal.
                        </label>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-8 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Next Step
                    </button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Registering...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          <span>Complete Registration</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>
              </form>
            </motion.div>
          </div>

          {/* Sidebar - Notifications & Information */}
          <div className="space-y-6">
            {/* Live Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            >
              <div className="bg-red-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Live Security Alerts
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-3 rounded-lg border-l-4 ${
                      notification.priority === 'high' ? 'border-red-500 bg-red-50' :
                      notification.priority === 'medium' ? 'border-orange-500 bg-orange-50' :
                      'border-green-500 bg-green-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <button className="text-xs text-blue-600 hover:text-blue-800">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Information */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Important Information
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Portal Hours</h4>
                    <p className="text-xs text-gray-600">Available 24/7 for emergency reporting</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Emergency Helpline</h4>
                    <p className="text-xs text-gray-600">Call 1930 for immediate cyber threat assistance</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Support Email</h4>
                    <p className="text-xs text-gray-600">cyber-helpline@mod.gov.in</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
              <div className="bg-green-600 px-4 py-3 text-white">
                <h3 className="font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Security Tips
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="text-xs text-gray-700">
                  • Never share your login credentials with anyone
                </div>
                <div className="text-xs text-gray-700">
                  • Always verify official communications through proper channels
                </div>
                <div className="text-xs text-gray-700">
                  • Report suspicious activities immediately
                </div>
                <div className="text-xs text-gray-700">
                  • Use strong, unique passwords for all accounts
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Government Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Ministry of Defence</h4>
              <p className="text-sm text-gray-300">Government of India</p>
              <p className="text-sm text-gray-300">South Block, New Delhi - 110011</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white">Cyber Laws</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
                <li><a href="#" className="hover:text-white">Downloads</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>Emergency: 1930</li>
                <li>Email: cyber-helpline@mod.gov.in</li>
                <li>Website: www.mod.gov.in</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-white">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
            <p>© 2024 Government of India. All rights reserved. | Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GovernmentDefenceLogin;