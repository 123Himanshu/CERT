import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
  Shield,
  Clock,
  Globe,
  Phone,
  Menu,
  X,
  Download,
  FileText,
  Book,
  Video,
  ExternalLink,
  Search
} from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-defence-gray-50">
      {/* Header - Same as other pages */}
      <header className="bg-white border-b-4 border-defence-blue-600 shadow-sm sticky top-0 z-50">
        {/* Top Government Bar */}
        <div className="bg-defence-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <span>{t('header.government')}</span>
                <span className="hidden md:flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  {t('header.portal')}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </span>
                <span className="flex items-center bg-defence-red-600 px-2 py-1 rounded text-xs font-semibold">
                  <Phone className="w-3 h-3 mr-1" />
                  {t('header.emergency')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                alt="Government of India"
                className="h-14 w-auto"
              />
              <div>
                <h1 className="text-2xl font-bold text-defence-gray-900">
                  {t('header.title')}
                </h1>
                <p className="text-sm text-defence-gray-600 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {t('header.subtitle')}
                </p>
                <p className="text-xs text-defence-gray-500 mt-1">
                  {t('header.established')}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/cyber-awareness"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                {t('nav.awareness')}
              </Link>
              <Link
                to="/training"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                {t('nav.training')}
              </Link>
              <Link
                to="/resources"
                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1 px-2"
              >
                {t('nav.resources')}
              </Link>
              <Link
                to="/contact"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                {t('nav.contact')}
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-defence-blue-600 bg-defence-blue-50 border border-defence-blue-200 rounded hover:bg-defence-blue-100 transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-defence-blue-600 border border-defence-blue-600 rounded hover:bg-defence-blue-700 transition-colors"
                >
                  {t('nav.register')}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-defence-gray-700 hover:text-defence-blue-600"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-defence-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/cyber-awareness"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.awareness')}
                </Link>
                <Link
                  to="/training"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.training')}
                </Link>
                <Link
                  to="/resources"
                  className="font-medium text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.resources')}
                </Link>
                <Link
                  to="/contact"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.contact')}
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-defence-blue-900 via-defence-blue-800 to-defence-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold mb-6"
            >
              Resources
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-defence-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Access essential cybersecurity resources, documents, and tools for defence personnel
            </motion.p>
          </div>
        </div>
      </section>

      {/* Quick Access Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-defence-gray-900 mb-8 text-center">Quick Access Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Emergency Contacts",
                description: "Important phone numbers and contacts",
                icon: <Phone className="w-8 h-8" />,
                color: "bg-defence-red-600",
                items: ["Cyber Crime: 1930", "IT Helpdesk: 1800-XXX-XXXX", "Security Office: XXX-XXX-XXXX"]
              },
              {
                title: "Security Guidelines",
                description: "Official security policies and procedures",
                icon: <FileText className="w-8 h-8" />,
                color: "bg-defence-blue-600",
                items: ["Password Policy", "Email Security", "Device Management", "Data Protection"]
              },
              {
                title: "Software Tools",
                description: "Approved security software and tools",
                icon: <Download className="w-8 h-8" />,
                color: "bg-green-600",
                items: ["Antivirus Software", "VPN Client", "Password Manager", "Encryption Tools"]
              },
              {
                title: "Training Materials",
                description: "Educational resources and documentation",
                icon: <Book className="w-8 h-8" />,
                color: "bg-purple-600",
                items: ["User Manuals", "Video Tutorials", "Best Practices", "Case Studies"]
              }
            ].map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-defence-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${resource.color} p-3 rounded-lg w-fit mb-4`}>
                  <div className="text-white">{resource.icon}</div>
                </div>
                <h3 className="text-lg font-semibold text-defence-gray-900 mb-2">{resource.title}</h3>
                <p className="text-defence-gray-600 mb-4 text-sm">{resource.description}</p>
                <ul className="space-y-2">
                  {resource.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm text-defence-gray-700">
                      <div className="w-2 h-2 bg-defence-blue-600 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="mt-4 text-defence-blue-600 hover:text-defence-blue-800 text-sm font-medium flex items-center">
                  Access Resources <ExternalLink className="w-4 h-4 ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Library */}
      <section className="py-16 bg-defence-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-defence-gray-900 mb-8 text-center">Document Library</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                category: "Security Policies",
                documents: [
                  { name: "Cybersecurity Framework for Defence Personnel", size: "2.3 MB", type: "PDF", date: "2025-01-10" },
                  { name: "Mobile Device Security Policy", size: "1.8 MB", type: "PDF", date: "2025-01-08" },
                  { name: "Email Security Guidelines", size: "1.2 MB", type: "PDF", date: "2025-01-05" },
                  { name: "Social Media Usage Policy", size: "950 KB", type: "PDF", date: "2025-01-03" }
                ]
              },
              {
                category: "Technical Guides",
                documents: [
                  { name: "VPN Setup and Configuration Guide", size: "3.1 MB", type: "PDF", date: "2025-01-09" },
                  { name: "Secure Password Creation Guide", size: "1.5 MB", type: "PDF", date: "2025-01-07" },
                  { name: "Two-Factor Authentication Setup", size: "2.2 MB", type: "PDF", date: "2025-01-06" },
                  { name: "Incident Reporting Procedures", size: "1.7 MB", type: "PDF", date: "2025-01-04" }
                ]
              }
            ].map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, x: sectionIndex === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-semibold text-defence-gray-900 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-3 text-defence-blue-600" />
                  {section.category}
                </h3>
                <div className="space-y-4">
                  {section.documents.map((doc, docIndex) => (
                    <div key={docIndex} className="flex items-center justify-between p-4 border border-defence-gray-200 rounded-lg hover:bg-defence-gray-50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="bg-defence-red-100 p-2 rounded">
                          <FileText className="w-5 h-5 text-defence-red-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-defence-gray-900">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-sm text-defence-gray-500">
                            <span>{doc.size}</span>
                            <span>{doc.type}</span>
                            <span>{doc.date}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-defence-blue-600 hover:bg-defence-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Software Downloads */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-defence-gray-900 mb-8 text-center">Approved Security Software</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Defence Antivirus Suite",
                description: "Comprehensive antivirus protection approved for defence systems",
                version: "v12.5.3",
                size: "145 MB",
                compatibility: "Windows, macOS, Linux",
                features: ["Real-time protection", "Email scanning", "USB protection", "Firewall integration"]
              },
              {
                name: "Secure VPN Client",
                description: "Official VPN client for secure remote access to defence networks",
                version: "v8.2.1",
                size: "89 MB",
                compatibility: "Windows, macOS, Android, iOS",
                features: ["256-bit encryption", "Kill switch", "DNS leak protection", "Multi-device support"]
              },
              {
                name: "Password Manager Pro",
                description: "Enterprise-grade password manager for defence personnel",
                version: "v15.1.0",
                size: "67 MB",
                compatibility: "Windows, macOS, Android, iOS",
                features: ["Military-grade encryption", "Biometric unlock", "Secure sharing", "Breach monitoring"]
              }
            ].map((software, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-defence-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-defence-blue-100 p-3 rounded-lg mr-4">
                    <Download className="w-8 h-8 text-defence-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-defence-gray-900">{software.name}</h3>
                    <span className="text-sm text-defence-gray-500">{software.version}</span>
                  </div>
                </div>
                <p className="text-defence-gray-600 mb-4 text-sm">{software.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-defence-gray-500">Size:</span>
                    <span className="text-defence-gray-900">{software.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-defence-gray-500">Compatibility:</span>
                    <span className="text-defence-gray-900">{software.compatibility}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-defence-gray-900 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {software.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-defence-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full bg-defence-blue-600 hover:bg-defence-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <Download className="w-5 h-5" />
                  <span>Download Now</span>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Support */}
      <section className="py-16 bg-defence-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Help?</h2>
          <p className="text-xl text-defence-blue-100 mb-8">
            Our support team is available 24/7 to assist with any cybersecurity concerns
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Phone className="w-12 h-12 text-defence-red-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Emergency Hotline</h3>
              <p className="text-defence-blue-100 mb-2">24/7 Immediate Response</p>
              <p className="text-2xl font-bold text-white">1930</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Search className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Knowledge Base</h3>
              <p className="text-defence-blue-100 mb-4">Search our comprehensive FAQ</p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors">
                Browse FAQ
              </button>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <Video className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
              <p className="text-defence-blue-100 mb-4">Step-by-step guidance</p>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded transition-colors">
                Watch Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;