import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Shield,
  User,
  Lock,
  Eye,
  EyeOff,
  Phone,
  Mail,
  Globe,
  Clock,
  AlertTriangle,
  CheckCircle,
  Users,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Info,
  Building,
  CreditCard,
  FileText,
  Smartphone,
  Check
} from 'lucide-react';

const LoginPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userType, setUserType] = useState<'personnel' | 'family'>('personnel');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [captchaCode] = useState('7K9M2X');

  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    captcha: '',
    
    // Defence Personnel fields
    serviceNumber: '',
    rank: '',
    unit: '',
    mfaToken: '',
    
    // Family Member fields
    relationshipType: '',
    defencePersonnelId: '',
    defencePersonnelName: '',
    defencePersonnelUnit: '',
    familyMemberName: '',
    phoneNumber: '',
    aadhaarNumber: '',
    relationshipProof: null as File | null
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication - no validation required, use defaults for empty fields
    setTimeout(() => {
      if (userType === 'personnel') {
        // Use default values if fields are empty
        const rank = formData.rank || 'Officer';
        const serviceNumber = formData.serviceNumber || 'DEF001';
        const unit = formData.unit || 'Defence Unit';
        
        // Store authentication state in localStorage for persistence
        localStorage.setItem('defenceAuthenticated', 'true');
        localStorage.setItem('userType', 'personnel');
        localStorage.setItem('userInfo', JSON.stringify({
          rank: rank,
          serviceNumber: serviceNumber,
          unit: unit
        }));
        
        alert(`🛡️ Defence Personnel Login Successful!\n\nWelcome ${rank} ${serviceNumber}!\n\nUnit: ${unit}\nSecurity Clearance: Verified\n\nAccessing Defence Cyber Security Dashboard...`);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Use default values if fields are empty
        const name = formData.familyMemberName || 'Family Member';
        const relationship = formData.relationshipType || 'Dependent';
        const defencePersonnelName = formData.defencePersonnelName || 'Defence Personnel';
        
        // Store authentication state in localStorage for persistence
        localStorage.setItem('defenceAuthenticated', 'true');
        localStorage.setItem('userType', 'family');
        localStorage.setItem('userInfo', JSON.stringify({
          name: name,
          relationship: relationship,
          defencePersonnelName: defencePersonnelName
        }));
        
        alert(`👨‍👩‍👧‍👦 Family Member Login Successful!\n\nWelcome ${name}!\n\nRelation: ${relationship} of ${defencePersonnelName}\nVerification: Complete\n\nAccessing Family Portal...`);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 1000); // Reduced timeout for faster login
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleStepSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      nextStep();
    } else {
      handleLogin(e);
    }
  };

  const relationshipTypes = [
    { value: 'spouse', label: 'Spouse' },
    { value: 'child', label: 'Child' },
    { value: 'parent', label: 'Parent' },
    { value: 'sibling', label: 'Sibling' },
    { value: 'dependent', label: 'Dependent' }
  ];

  const ranks = [
    'Lieutenant', 'Captain', 'Major', 'Lieutenant Colonel', 'Colonel', 'Brigadier',
    'Major General', 'Lieutenant General', 'General', 'Field Marshal',
    'Sub Lieutenant', 'Lieutenant Commander', 'Commander', 'Captain (Navy)', 'Commodore',
    'Rear Admiral', 'Vice Admiral', 'Admiral', 'Admiral of the Fleet',
    'Flying Officer', 'Flight Lieutenant', 'Squadron Leader', 'Wing Commander', 'Group Captain',
    'Air Commodore', 'Air Vice Marshal', 'Air Marshal', 'Air Chief Marshal', 'Marshal of the Air Force'
  ];

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            step >= stepNumber 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-300 text-slate-600'
          }`}>
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`w-12 h-1 mx-2 ${
              step > stepNumber ? 'bg-blue-600' : 'bg-slate-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                alt="Government of India"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  {t('header.title')}
                </h1>
                <p className="text-sm text-slate-600">
                  {t('header.subtitle')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right text-slate-700">
                <div className="text-sm">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </div>
                <div className="text-xs text-red-600 font-semibold">
                  Emergency: 1930
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
          >
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
              <div className="flex items-center space-x-4">
                <Shield className="h-10 w-10" />
                <div>
                  <h2 className="text-2xl font-bold">Secure Login</h2>
                  <p className="text-blue-100">Defence Personnel & Family Portal</p>
                </div>
              </div>
            </div>

            {/* User Type Selection */}
            <div className="p-8 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Select Login Type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setUserType('personnel')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'personnel'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-slate-300 hover:border-slate-400 hover:shadow-sm'
                  }`}
                >
                  <UserCheck className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Defence Personnel</div>
                  <div className="text-sm text-slate-600">Active service members</div>
                </button>
                
                <button
                  onClick={() => setUserType('family')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'family'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md'
                      : 'border-slate-300 hover:border-slate-400 hover:shadow-sm'
                  }`}
                >
                  <Users className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-medium">Family Member</div>
                  <div className="text-sm text-slate-600">Spouse, children, dependents</div>
                </button>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="p-8 space-y-6">
              <AnimatePresence mode="wait">
                {userType === 'personnel' ? (
                  <motion.div
                    key="personnel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Service Number */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Service Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.serviceNumber}
                          onChange={(e) => handleInputChange('serviceNumber', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter your service number"
                        />
                      </div>
                    </div>

                    {/* Rank */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Rank *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <select
                          value={formData.rank}
                          onChange={(e) => handleInputChange('rank', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">Select your rank</option>
                          {ranks.map(rank => (
                            <option key={rank} value={rank}>{rank}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Unit */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Unit/Formation *
                      </label>
                      <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.unit}
                          onChange={(e) => handleInputChange('unit', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter your unit/formation"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Official Email *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="your.name@forces.gov.in"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    {/* MFA Token */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        MFA Token *
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.mfaToken}
                          onChange={(e) => handleInputChange('mfaToken', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter 6-digit MFA token"
                          maxLength={6}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Use your authenticator app to generate the token
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="family"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Family Member Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.familyMemberName}
                          onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Relationship Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Relationship with Defence Personnel *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <select
                          value={formData.relationshipType}
                          onChange={(e) => handleInputChange('relationshipType', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="">Select relationship</option>
                          {relationshipTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Defence Personnel Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Defence Personnel Name *
                        </label>
                        <input
                          type="text"
                          value={formData.defencePersonnelName}
                          onChange={(e) => handleInputChange('defencePersonnelName', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Service Number *
                        </label>
                        <input
                          type="text"
                          value={formData.defencePersonnelId}
                          onChange={(e) => handleInputChange('defencePersonnelId', e.target.value)}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Service number"
                        />
                      </div>
                    </div>

                    {/* Unit */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Unit/Formation *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.defencePersonnelUnit}
                          onChange={(e) => handleInputChange('defencePersonnelUnit', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Defence personnel's unit"
                        />
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Aadhaar Number */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Aadhaar Number *
                      </label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.aadhaarNumber}
                          onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="XXXX XXXX XXXX"
                          maxLength={12}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          placeholder="Enter your password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CAPTCHA */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Security Verification *
                </label>
                <div className="bg-slate-100 border border-slate-300 rounded-lg p-4 mb-3">
                  <div className="flex items-center justify-center h-12 bg-white rounded text-slate-900 font-mono text-xl tracking-wider border">
                    7K9M2X
                  </div>
                </div>
                <input
                  type="text"
                  value={formData.captcha}
                  onChange={(e) => handleInputChange('captcha', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  placeholder="Enter the code shown above"
                />
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-5 w-5" />
                    <span>Secure Login</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </motion.button>

              {/* Quick Access Button */}
              <div className="text-center mb-4">
                <button
                  onClick={() => {
                    // Set authentication and redirect immediately
                    localStorage.setItem('defenceAuthenticated', 'true');
                    localStorage.setItem('userType', 'personnel');
                    localStorage.setItem('userInfo', JSON.stringify({
                      rank: 'Officer',
                      serviceNumber: 'DEF001',
                      unit: 'Defence Unit'
                    }));
                    navigate('/dashboard');
                  }}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Shield className="h-5 w-5" />
                  <span>Quick Access to Dashboard</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>

              {/* Additional Links */}
              <div className="text-center space-y-2">
                <Link
                  to="/register"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Don't have an account? Register here
                </Link>
                <div className="text-sm text-slate-500">
                  <Link to="/forgot-password" className="hover:text-blue-600">
                    Forgot Password?
                  </Link>
                  {' | '}
                  <Link to="/help" className="hover:text-blue-600">
                    Need Help?
                  </Link>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Information Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Security Notice */}
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Security Notice</h3>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li>• This is a secure government system</li>
                    <li>• All access attempts are logged and monitored</li>
                    <li>• Unauthorized access is prohibited by law</li>
                    <li>• Report suspicious activity to 1930</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Login Benefits */}
            <div className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
                Portal Benefits
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>24/7 cybersecurity incident reporting</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>Real-time threat alerts and updates</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>Comprehensive security training resources</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>Family member protection guidance</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>Direct access to cyber experts</span>
                </li>
              </ul>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Phone className="h-6 w-6 mr-2" />
                Emergency Support
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold">1930</div>
                  <div className="text-sm text-red-100">24/7 Cyber Crime Helpline</div>
                </div>
                <div className="text-sm text-red-100">
                  For immediate assistance with cyber incidents, suspicious activities, or security concerns.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;