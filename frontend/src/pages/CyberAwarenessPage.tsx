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
    AlertTriangle,
    Eye,
    Lock,
    Smartphone,
    Mail,
    Wifi,
    CreditCard,
    Users,
    FileText,
    Play,
    Download
} from 'lucide-react';

const CyberAwarenessPage: React.FC = () => {
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
                                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1 px-2"
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
                                    className="font-medium text-defence-blue-600"
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
                            Cyber Awareness
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-defence-blue-100 mb-8 max-w-3xl mx-auto"
                        >
                            Stay informed about the latest cyber threats and learn how to protect yourself and your family
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Current Threat Level */}
            <section className="py-8 bg-defence-red-50 border-l-4 border-defence-red-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="bg-defence-red-500 p-3 rounded-full">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-defence-red-800">Current Threat Level: HIGH</h3>
                                <p className="text-defence-red-700">Increased phishing attacks targeting defence personnel</p>
                            </div>
                        </div>
                        <div className="text-sm text-defence-red-600">
                            Last updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Security Alerts */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-defence-gray-900 mb-8">Latest Security Alerts</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                            {
                                id: 1,
                                title: "WhatsApp Honeytrap Scam Targeting Defence Families",
                                description: "Fraudsters are using fake profiles to target defence personnel families through WhatsApp. Be cautious of unknown contacts requesting personal information.",
                                severity: "High",
                                date: "2025-01-10",
                                category: "Social Engineering"
                            },
                            {
                                id: 2,
                                title: "Fake Defence Recruitment Websites",
                                description: "Multiple fake websites claiming to offer defence jobs are collecting personal data. Always verify through official channels.",
                                severity: "Medium",
                                date: "2025-01-08",
                                category: "Fraud"
                            },
                            {
                                id: 3,
                                title: "Malicious Email Attachments in Pension Updates",
                                description: "Emails claiming to be pension updates contain malware. Do not open attachments from unverified sources.",
                                severity: "Critical",
                                date: "2025-01-05",
                                category: "Malware"
                            },
                            {
                                id: 4,
                                title: "Fake Banking SMS Targeting Defence Personnel",
                                description: "SMS messages claiming to be from banks asking for account verification. Banks never ask for sensitive information via SMS.",
                                severity: "High",
                                date: "2025-01-03",
                                category: "Phishing"
                            }
                        ].map((alert) => (
                            <motion.div
                                key={alert.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: alert.id * 0.1 }}
                                className="bg-white border border-defence-gray-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alert.severity === 'Critical' ? 'bg-defence-red-100 text-defence-red-800' :
                                        alert.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                            'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {alert.severity}
                                    </span>
                                    <span className="text-sm text-defence-gray-500">{alert.date}</span>
                                </div>
                                <h3 className="text-lg font-semibold text-defence-gray-900 mb-2">{alert.title}</h3>
                                <p className="text-defence-gray-600 mb-4">{alert.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-defence-blue-600 font-medium">{alert.category}</span>
                                    <button className="text-defence-blue-600 hover:text-defence-blue-800 text-sm font-medium">
                                        Read More →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Security Tips */}
            <section className="py-16 bg-defence-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-defence-gray-900 mb-8 text-center">Essential Security Tips</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Smartphone className="w-8 h-8" />,
                                title: "Mobile Security",
                                tips: [
                                    "Use strong PINs and biometric locks",
                                    "Keep apps updated regularly",
                                    "Avoid public WiFi for sensitive tasks",
                                    "Enable remote wipe capabilities"
                                ]
                            },
                            {
                                icon: <Mail className="w-8 h-8" />,
                                title: "Email Safety",
                                tips: [
                                    "Verify sender before clicking links",
                                    "Don't download suspicious attachments",
                                    "Use official email for work communications",
                                    "Report phishing attempts immediately"
                                ]
                            },
                            {
                                icon: <Lock className="w-8 h-8" />,
                                title: "Password Security",
                                tips: [
                                    "Use unique passwords for each account",
                                    "Enable two-factor authentication",
                                    "Change passwords regularly",
                                    "Use password managers"
                                ]
                            },
                            {
                                icon: <Wifi className="w-8 h-8" />,
                                title: "Network Safety",
                                tips: [
                                    "Secure your home WiFi network",
                                    "Avoid public WiFi for sensitive data",
                                    "Use VPN when necessary",
                                    "Monitor network activity"
                                ]
                            },
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Social Media",
                                tips: [
                                    "Limit personal information sharing",
                                    "Review privacy settings regularly",
                                    "Be cautious of friend requests",
                                    "Avoid posting location details"
                                ]
                            },
                            {
                                icon: <CreditCard className="w-8 h-8" />,
                                title: "Financial Security",
                                tips: [
                                    "Monitor bank statements regularly",
                                    "Use secure payment methods",
                                    "Never share OTPs or PINs",
                                    "Report suspicious transactions"
                                ]
                            }
                        ].map((category, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg p-6 shadow-lg"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-defence-blue-100 p-3 rounded-lg mr-4">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-defence-gray-900">{category.title}</h3>
                                </div>
                                <ul className="space-y-2">
                                    {category.tips.map((tip, tipIndex) => (
                                        <li key={tipIndex} className="flex items-start">
                                            <div className="w-2 h-2 bg-defence-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                            <span className="text-sm text-defence-gray-600">{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive Quiz Section */}
            <section className="py-16 bg-defence-blue-900 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Test Your Cyber Awareness</h2>
                    <p className="text-xl text-defence-blue-100 mb-8">
                        Take our interactive quiz to assess your cybersecurity knowledge
                    </p>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-defence-red-400">15</div>
                                <div className="text-sm text-defence-blue-100">Questions</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-green-400">5</div>
                                <div className="text-sm text-defence-blue-100">Minutes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">Certificate</div>
                                <div className="text-sm text-defence-blue-100">On Completion</div>
                            </div>
                        </div>
                        <button className="bg-defence-red-600 hover:bg-defence-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </section>

            {/* Video Resources */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-defence-gray-900 mb-8 text-center">Educational Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Recognizing Phishing Emails",
                                duration: "5:30",
                                views: "12.5K",
                                thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
                            },
                            {
                                title: "Social Media Safety for Defence Families",
                                duration: "8:15",
                                views: "9.2K",
                                thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop"
                            },
                            {
                                title: "Mobile Device Security Best Practices",
                                duration: "6:45",
                                views: "15.8K",
                                thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
                            }
                        ].map((video, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                            >
                                <div className="relative">
                                    <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                        <Play className="w-16 h-16 text-white" />
                                    </div>
                                    <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                                        {video.duration}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-defence-gray-900 mb-2">{video.title}</h3>
                                    <div className="flex items-center text-sm text-defence-gray-500">
                                        <Eye className="w-4 h-4 mr-1" />
                                        <span>{video.views} views</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CyberAwarenessPage;