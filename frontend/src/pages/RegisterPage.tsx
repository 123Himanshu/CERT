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
  Upload,
  Calendar,
  MapPin,
  Check,
  X
} from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userType, setUserType] = useState<'personnel' | 'family'>('personnel');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    captcha: '',
    agreeToTerms: false,

    // Defence Personnel fields
    serviceNumber: '',
    rank: '',
    unit: '',
    joiningDate: '',
    postingLocation: '',
    emergencyContact: '',
    emergencyContactRelation: '',

    // Family Member fields
    relationshipType: '',
    defencePersonnelId: '',
    defencePersonnelName: '',
    defencePersonnelUnit: '',
    familyMemberName: '',
    aadhaarNumber: '',
    relationshipProof: null as File | null,
    identityProof: null as File | null,
    addressProof: null as File | null
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (field: string, value: string | boolean | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'password') {
      calculatePasswordStrength(value as string);
    }
  };

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Fair';
    if (passwordStrength <= 4) return 'Good';
    return 'Strong';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }

    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      if (userType === 'personnel') {
        // Store authentication state after successful registration
        localStorage.setItem('defenceAuthenticated', 'true');
        localStorage.setItem('userType', 'personnel');
        localStorage.setItem('userInfo', JSON.stringify({
          rank: formData.rank,
          serviceNumber: formData.serviceNumber,
          unit: formData.unit,
          postingLocation: formData.postingLocation
        }));
        
        alert(`🛡️ Defence Personnel Registration Successful!\n\nWelcome ${formData.rank} ${formData.serviceNumber}!\n\nYour account has been created and is pending verification.\nYou will receive a confirmation email within 24 hours.\n\nUnit: ${formData.unit}\nPosting: ${formData.postingLocation}\n\nPlease check your email for further instructions.\n\nRedirecting to dashboard...`);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Store authentication state after successful registration
        localStorage.setItem('defenceAuthenticated', 'true');
        localStorage.setItem('userType', 'family');
        localStorage.setItem('userInfo', JSON.stringify({
          name: formData.familyMemberName,
          relationship: formData.relationshipType,
          defencePersonnelName: formData.defencePersonnelName
        }));
        
        alert(`👨‍👩‍👧‍👦 Family Member Registration Successful!\n\nWelcome ${formData.familyMemberName}!\n\nYour account has been created and is pending verification.\nRelation: ${formData.relationshipType} of ${formData.defencePersonnelName}\n\nDocuments submitted for verification:\n• Relationship Proof\n• Identity Proof\n• Address Proof\n\nVerification typically takes 2-3 business days.\nYou will receive updates via email and SMS.\n\nRedirecting to dashboard...`);
        
        // Redirect to dashboard
        navigate('/dashboard');
      }
      setIsLoading(false);
    }, 3000);
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

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
    'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh'
  ];

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div key={stepNumber} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step >= stepNumber
            ? 'bg-blue-600 text-white'
            : 'bg-slate-300 text-slate-600'
            }`}>
            {step > stepNumber ? <Check className="w-5 h-5" /> : stepNumber}
          </div>
          {stepNumber < 3 && (
            <div className={`w-16 h-1 mx-2 ${step > stepNumber ? 'bg-blue-600' : 'bg-slate-300'
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/98 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
            <div className="flex items-center space-x-4">
              <UserCheck className="h-10 w-10" />
              <div>
                <h2 className="text-2xl font-bold">Create Account</h2>
                <p className="text-blue-100">Defence Personnel & Family Registration</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* User Type Selection - Step 1 */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-defence-gray-900 mb-2">Select Registration Type</h3>
                    <p className="text-defence-gray-600">Choose the appropriate registration category</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <button
                      onClick={() => setUserType('personnel')}
                      className={`p-8 rounded-xl border-2 transition-all ${userType === 'personnel'
                        ? 'border-defence-blue-500 bg-defence-blue-50 text-defence-blue-700 shadow-lg'
                        : 'border-defence-gray-300 hover:border-defence-gray-400 hover:shadow-md'
                        }`}
                    >
                      <UserCheck className="w-16 h-16 mx-auto mb-4" />
                      <div className="font-bold text-xl mb-2">Defence Personnel</div>
                      <div className="text-sm text-defence-gray-600">
                        Active service members of Indian Armed Forces
                      </div>
                      <ul className="text-xs text-defence-gray-500 mt-4 space-y-1">
                        <li>• Army, Navy, Air Force</li>
                        <li>• All ranks and positions</li>
                        <li>• Active duty personnel</li>
                      </ul>
                    </button>

                    <button
                      onClick={() => setUserType('family')}
                      className={`p-8 rounded-xl border-2 transition-all ${userType === 'family'
                        ? 'border-defence-blue-500 bg-defence-blue-50 text-defence-blue-700 shadow-lg'
                        : 'border-defence-gray-300 hover:border-defence-gray-400 hover:shadow-md'
                        }`}
                    >
                      <Users className="w-16 h-16 mx-auto mb-4" />
                      <div className="font-bold text-xl mb-2">Family Member</div>
                      <div className="text-sm text-defence-gray-600">
                        Family members of defence personnel
                      </div>
                      <ul className="text-xs text-defence-gray-500 mt-4 space-y-1">
                        <li>• Spouse and children</li>
                        <li>• Parents and dependents</li>
                        <li>• Requires verification</li>
                      </ul>
                    </button>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={nextStep}
                      className="px-8 py-3 bg-defence-blue-600 hover:bg-defence-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Personal Information - Step 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-defence-gray-900 mb-2">Personal Information</h3>
                    <p className="text-defence-gray-600">
                      {userType === 'personnel' ? 'Enter your service details' : 'Enter your personal and family details'}
                    </p>
                  </div>

                  <form className="space-y-6">
                    {userType === 'personnel' ? (
                      <>
                        {/* Service Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Service Number *
                            </label>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                              <input
                                type="text"
                                value={formData.serviceNumber}
                                onChange={(e) => handleInputChange('serviceNumber', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                                placeholder="Enter service number"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Rank *
                            </label>
                            <div className="relative">
                              <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                              <select
                                value={formData.rank}
                                onChange={(e) => handleInputChange('rank', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                                required
                              >
                                <option value="">Select rank</option>
                                {ranks.map(rank => (
                                  <option key={rank} value={rank}>{rank}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Unit/Formation *
                            </label>
                            <input
                              type="text"
                              value={formData.unit}
                              onChange={(e) => handleInputChange('unit', e.target.value)}
                              className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Enter unit/formation"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Posting Location *
                            </label>
                            <input
                              type="text"
                              value={formData.postingLocation}
                              onChange={(e) => handleInputChange('postingLocation', e.target.value)}
                              className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Current posting location"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Date of Joining *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="date"
                              value={formData.joiningDate}
                              onChange={(e) => handleInputChange('joiningDate', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Family Member Details */}
                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Your Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="text"
                              value={formData.familyMemberName}
                              onChange={(e) => handleInputChange('familyMemberName', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Relationship with Defence Personnel *
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <select
                              value={formData.relationshipType}
                              onChange={(e) => handleInputChange('relationshipType', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              required
                            >
                              <option value="">Select relationship</option>
                              {relationshipTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Defence Personnel Name *
                            </label>
                            <input
                              type="text"
                              value={formData.defencePersonnelName}
                              onChange={(e) => handleInputChange('defencePersonnelName', e.target.value)}
                              className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Full name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Service Number *
                            </label>
                            <input
                              type="text"
                              value={formData.defencePersonnelId}
                              onChange={(e) => handleInputChange('defencePersonnelId', e.target.value)}
                              className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Service number"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Unit/Formation *
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="text"
                              value={formData.defencePersonnelUnit}
                              onChange={(e) => handleInputChange('defencePersonnelUnit', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="Defence personnel's unit"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Aadhaar Number *
                          </label>
                          <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="text"
                              value={formData.aadhaarNumber}
                              onChange={(e) => handleInputChange('aadhaarNumber', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="XXXX XXXX XXXX"
                              maxLength={12}
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Common Contact Information */}
                    <div className="border-t border-defence-gray-200 pt-6">
                      <h4 className="text-lg font-semibold text-defence-gray-900 mb-4">Contact Information</h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="your.email@example.com"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                            <input
                              type="tel"
                              value={formData.phoneNumber}
                              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                              className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                              placeholder="+91 XXXXX XXXXX"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                          Date of Birth *
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                          <input
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </form>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={prevStep}
                      className="px-6 py-3 border border-defence-gray-300 text-defence-gray-700 rounded-lg font-medium hover:bg-defence-gray-50 transition-colors flex items-center space-x-2"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span>Back</span>
                    </button>
                    <button
                      onClick={nextStep}
                      className="px-8 py-3 bg-defence-blue-600 hover:bg-defence-blue-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Account Security & Verification - Step 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-defence-gray-900 mb-2">Account Security</h3>
                    <p className="text-defence-gray-600">Set up your password and complete verification</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-6">
                    {/* Password Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                          Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => handleInputChange('password', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                            placeholder="Create password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-defence-gray-400 hover:text-defence-gray-600"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-defence-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium text-defence-gray-600">
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                          Confirm Password *
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-defence-gray-400" />
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className="w-full pl-10 pr-12 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                            placeholder="Confirm password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-defence-gray-400 hover:text-defence-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                        {formData.confirmPassword && (
                          <div className="mt-2 flex items-center space-x-2">
                            {formData.password === formData.confirmPassword ? (
                              <>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-sm text-green-600">Passwords match</span>
                              </>
                            ) : (
                              <>
                                <X className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-600">Passwords don't match</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Document Upload for Family Members */}
                    {userType === 'family' && (
                      <div className="border-t border-defence-gray-200 pt-6">
                        <h4 className="text-lg font-semibold text-defence-gray-900 mb-4">Document Verification</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Relationship Proof *
                            </label>
                            <div className="border-2 border-dashed border-defence-gray-300 rounded-lg p-4 text-center hover:border-defence-blue-400 transition-colors">
                              <Upload className="w-8 h-8 text-defence-gray-400 mx-auto mb-2" />
                              <input
                                type="file"
                                onChange={(e) => handleInputChange('relationshipProof', e.target.files?.[0] || null)}
                                className="hidden"
                                id="relationshipProof"
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                              <label htmlFor="relationshipProof" className="cursor-pointer text-sm text-defence-blue-600 hover:text-defence-blue-800">
                                Upload Document
                              </label>
                              <p className="text-xs text-defence-gray-500 mt-1">Marriage certificate, birth certificate, etc.</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Identity Proof *
                            </label>
                            <div className="border-2 border-dashed border-defence-gray-300 rounded-lg p-4 text-center hover:border-defence-blue-400 transition-colors">
                              <Upload className="w-8 h-8 text-defence-gray-400 mx-auto mb-2" />
                              <input
                                type="file"
                                onChange={(e) => handleInputChange('identityProof', e.target.files?.[0] || null)}
                                className="hidden"
                                id="identityProof"
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                              <label htmlFor="identityProof" className="cursor-pointer text-sm text-defence-blue-600 hover:text-defence-blue-800">
                                Upload Document
                              </label>
                              <p className="text-xs text-defence-gray-500 mt-1">Aadhaar, PAN, Passport, etc.</p>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                              Address Proof *
                            </label>
                            <div className="border-2 border-dashed border-defence-gray-300 rounded-lg p-4 text-center hover:border-defence-blue-400 transition-colors">
                              <Upload className="w-8 h-8 text-defence-gray-400 mx-auto mb-2" />
                              <input
                                type="file"
                                onChange={(e) => handleInputChange('addressProof', e.target.files?.[0] || null)}
                                className="hidden"
                                id="addressProof"
                                accept=".pdf,.jpg,.jpeg,.png"
                              />
                              <label htmlFor="addressProof" className="cursor-pointer text-sm text-defence-blue-600 hover:text-defence-blue-800">
                                Upload Document
                              </label>
                              <p className="text-xs text-defence-gray-500 mt-1">Utility bill, bank statement, etc.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CAPTCHA */}
                    <div>
                      <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                        Security Verification *
                      </label>
                      <div className="bg-defence-gray-100 border border-defence-gray-300 rounded-lg p-4 mb-3">
                        <div className="relative flex items-center justify-center h-12 bg-white rounded text-defence-gray-900 font-mono text-xl tracking-wider border overflow-hidden">
                          {/* Background distraction lines */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 48" preserveAspectRatio="none">
                            {/* Diagonal lines */}
                            <line x1="0" y1="10" x2="200" y2="38" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
                            <line x1="0" y1="35" x2="200" y2="8" stroke="#cbd5e1" strokeWidth="1" opacity="0.5" />
                            <line x1="20" y1="0" x2="180" y2="48" stroke="#f1f5f9" strokeWidth="2" opacity="0.4" />
                            <line x1="50" y1="48" x2="150" y2="0" stroke="#e2e8f0" strokeWidth="1" opacity="0.7" />

                            {/* Horizontal lines */}
                            <line x1="0" y1="15" x2="200" y2="15" stroke="#f8fafc" strokeWidth="1" opacity="0.3" />
                            <line x1="0" y1="30" x2="200" y2="30" stroke="#e2e8f0" strokeWidth="1" opacity="0.4" />

                            {/* Curved lines */}
                            <path d="M0,20 Q50,5 100,25 T200,15" stroke="#cbd5e1" strokeWidth="1" fill="none" opacity="0.5" />
                            <path d="M0,35 Q75,20 150,40 T200,25" stroke="#f1f5f9" strokeWidth="1" fill="none" opacity="0.6" />

                            {/* Random dots for noise */}
                            <circle cx="25" cy="12" r="1" fill="#e2e8f0" opacity="0.4" />
                            <circle cx="75" cy="35" r="1" fill="#cbd5e1" opacity="0.5" />
                            <circle cx="125" cy="18" r="1" fill="#f1f5f9" opacity="0.3" />
                            <circle cx="175" cy="28" r="1" fill="#e2e8f0" opacity="0.6" />
                            <circle cx="45" cy="40" r="1" fill="#cbd5e1" opacity="0.4" />
                            <circle cx="95" cy="8" r="1" fill="#f8fafc" opacity="0.5" />
                            <circle cx="155" cy="42" r="1" fill="#e2e8f0" opacity="0.3" />
                          </svg>

                          {/* Captcha text with relative positioning to appear above lines */}
                          <span className="relative z-10 select-none">7K9M2X</span>
                        </div>
                      </div>
                      <input
                        type="text"
                        value={formData.captcha}
                        onChange={(e) => handleInputChange('captcha', e.target.value)}
                        className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                        placeholder="Enter the code shown above"
                        required
                      />
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 w-4 h-4 text-defence-blue-600 border-defence-gray-300 rounded focus:ring-defence-blue-500"
                        required
                      />
                      <label htmlFor="agreeToTerms" className="text-sm text-defence-gray-700">
                        I agree to the{' '}
                        <Link to="/terms" className="text-defence-blue-600 hover:text-defence-blue-800">
                          Terms and Conditions
                        </Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-defence-blue-600 hover:text-defence-blue-800">
                          Privacy Policy
                        </Link>
                        . I understand that providing false information is a punishable offense under Indian law.
                      </label>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors flex items-center space-x-2"
                      >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back</span>
                      </button>

                      <motion.button
                        type="submit"
                        disabled={isLoading || !formData.agreeToTerms}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 shadow-lg"
                      >
                        {isLoading ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <UserCheck className="h-5 w-5" />
                            <span>Create Account</span>
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Additional Information */}
            <div className="mt-8 pt-6 border-t border-defence-gray-200">
              <div className="text-center space-y-2">
                <p className="text-sm text-defence-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-defence-blue-600 hover:text-defence-blue-800 font-medium">
                    Sign in here
                  </Link>
                </p>
                <div className="text-xs text-defence-gray-500">
                  <Link to="/help" className="hover:text-defence-blue-600">
                    Need Help?
                  </Link>
                  {' | '}
                  <Link to="/contact" className="hover:text-defence-blue-600">
                    Contact Support
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;