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
  Mail,
  MapPin,
  MessageSquare,
  Send,
  User,
  Building
} from 'lucide-react';

const ContactPage: React.FC = () => {
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
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                {t('nav.resources')}
              </Link>
              <Link
                to="/contact"
                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1 px-2"
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
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('nav.resources')}
                </Link>
                <Link
                  to="/contact"
                  className="font-medium text-defence-blue-600"
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
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-defence-blue-100 mb-8 max-w-3xl mx-auto"
            >
              Get in touch with our cybersecurity team for support and assistance
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-defence-gray-900 mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-defence-red-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-defence-red-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-defence-gray-900">Emergency Helpline</h3>
                    <p className="text-defence-gray-600">24/7 Cyber Crime Helpline</p>
                    <p className="text-defence-blue-600 font-semibold text-xl">1930</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-defence-blue-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-defence-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-defence-gray-900">Email Support</h3>
                    <p className="text-defence-gray-600">For non-urgent queries</p>
                    <p className="text-defence-blue-600">cybersecurity@mod.gov.in</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-defence-gray-900">Office Address</h3>
                    <p className="text-defence-gray-600">
                      Cyber Security Division<br />
                      Ministry of Defence<br />
                      South Block, New Delhi - 110011
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-defence-gray-900">Office Hours</h3>
                    <p className="text-defence-gray-600">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed (Emergency line available)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-defence-gray-900 mb-6">Send us a Message</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-defence-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 border border-defence-gray-300 rounded-lg focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-defence-blue-600 hover:bg-defence-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;