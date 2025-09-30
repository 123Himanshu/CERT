import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  Phone,
  FileText,
  Upload,
  Search,
  CheckCircle,
  Clock,
  MapPin,
  ExternalLink,
  RefreshCw,
  Play,
  Image as ImageIcon,
  Video,
  Download,
  Menu,
  X,
  Zap,
  Globe,
  Lock,
  Eye,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  Activity,
  Target,
  ShieldCheck,
  Bell,
  Calendar,
  BookOpen,
  Headphones,
  MessageSquare,
  Star,
  ArrowRight,
  Info,
  Wifi,
  Database,
  Server,
  Bug,
  UserCheck,
  Building,
  Briefcase,
  GraduationCap,
  Heart,
  Home,
  Car,
  Smartphone,
  CreditCard,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ChevronDown,
  ChevronUp,
  Filter,
  SortDesc,
  Calendar as CalendarIcon,
  MapIcon,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  FileCheck,
  Network,
  Cpu,
  HardDrive,
  MonitorSpeaker
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMediaFilter, setSelectedMediaFilter] = useState<'all' | 'images' | 'videos'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedThreatFilter, setSelectedThreatFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newsIndex, setNewsIndex] = useState(0);

  // Mock cyber threat data
  const cyberThreats = [
    {
      id: 1,
      title: 'Ransomware Attack on Defence Contractor',
      severity: 'Critical',
      location: 'New Delhi',
      time: '2025-09-30T10:30:00Z',
      summary: 'Sophisticated ransomware attack targeting defence contractor systems. Immediate action required.',
      link: '#',
      affectedSystems: 'Email, File Servers',
      reportedBy: 'DRDO Security Team'
    },
    {
      id: 2,
      title: 'Phishing Campaign Targeting Veterans',
      severity: 'High',
      location: 'Mumbai',
      time: '2025-09-30T08:15:00Z',
      summary: 'Massive phishing campaign impersonating defence pension services.',
      link: '#',
      affectedSystems: 'Email Communications',
      reportedBy: 'Cyber Crime Cell'
    },
    {
      id: 3,
      title: 'Suspected Espionage Activity',
      severity: 'Critical',
      location: 'Bangalore',
      time: '2025-09-30T06:45:00Z',
      summary: 'Potential foreign intelligence gathering through social media platforms.',
      link: '#',
      affectedSystems: 'Social Media, Personal Devices',
      reportedBy: 'Intelligence Bureau'
    },
    {
      id: 4,
      title: 'DDoS Attack on Defence Portal',
      severity: 'Medium',
      location: 'Chennai',
      time: '2025-09-30T04:20:00Z',
      summary: 'Distributed denial of service attack affecting portal availability.',
      link: '#',
      affectedSystems: 'Web Portal, Database',
      reportedBy: 'Network Operations Center'
    },
    {
      id: 5,
      title: 'Malware in Defence Email System',
      severity: 'High',
      location: 'Kolkata',
      time: '2025-09-30T02:10:00Z',
      summary: 'Advanced persistent threat detected in defence email infrastructure.',
      link: '#',
      affectedSystems: 'Email Infrastructure',
      reportedBy: 'IT Security Division'
    },
    {
      id: 6,
      title: 'Honeytrap Operation Exposed',
      severity: 'Critical',
      location: 'Hyderabad',
      time: '2025-09-29T23:30:00Z',
      summary: 'Social engineering operation targeting defence personnel through dating apps.',
      link: '#',
      affectedSystems: 'Mobile Applications',
      reportedBy: 'Counter Intelligence'
    },
    {
      id: 7,
      title: 'Suspicious USB Devices Detected',
      severity: 'Medium',
      location: 'Pune',
      time: '2025-09-29T20:15:00Z',
      summary: 'Multiple USB devices with unknown firmware detected at defence facilities.',
      link: '#',
      affectedSystems: 'Workstations, Servers',
      reportedBy: 'Physical Security Team'
    },
    {
      id: 8,
      title: 'Fake Defence Recruitment Scam',
      severity: 'High',
      location: 'Jaipur',
      time: '2025-09-29T18:45:00Z',
      summary: 'Fraudulent recruitment websites targeting defence job aspirants.',
      link: '#',
      affectedSystems: 'Web Platforms',
      reportedBy: 'Recruitment Division'
    }
  ];

  // Government News and Updates
  const governmentNews = [
    {
      id: 1,
      title: 'New Cyber Security Guidelines for Defence Personnel Released',
      date: '2025-09-30',
      category: 'Policy Update',
      summary: 'Ministry of Defence releases comprehensive cybersecurity guidelines for all defence personnel and their families.',
      priority: 'high'
    },
    {
      id: 2,
      title: 'Defence Cyber Agency Launches Advanced Training Program',
      date: '2025-09-29',
      category: 'Training',
      summary: 'New specialized training program for cyber threat detection and response launched across all defence establishments.',
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Annual Cyber Security Audit Results Published',
      date: '2025-09-28',
      category: 'Report',
      summary: 'Comprehensive audit reveals significant improvements in defence cyber infrastructure security.',
      priority: 'low'
    },
    {
      id: 4,
      title: 'Emergency Response Protocol Updated',
      date: '2025-09-27',
      category: 'Protocol',
      summary: 'Updated emergency response procedures for cyber incidents affecting defence operations.',
      priority: 'high'
    }
  ];

  // Statistics Data
  const securityStats = {
    totalReports: 15847,
    resolvedCases: 14203,
    activeInvestigations: 1644,
    preventedAttacks: 2891,
    trainedPersonnel: 45672,
    secureNetworks: 156
  };

  // FAQ Data
  const faqData = [
    {
      id: 1,
      question: 'How do I report a cybercrime incident?',
      answer: 'You can report cybercrime incidents through our secure online portal, by calling our 24/7 helpline at 1930, or by visiting the nearest cyber crime police station. Ensure you have all relevant evidence and documentation ready.'
    },
    {
      id: 2,
      question: 'What information should I provide when reporting?',
      answer: 'Include incident date/time, detailed description, screenshots, financial transaction details, suspect information, and any communication records. The more detailed information you provide, the better we can assist you.'
    },
    {
      id: 3,
      question: 'Is my personal information secure when reporting?',
      answer: 'Yes, all reports are handled with strict confidentiality. Our systems use military-grade encryption and follow government data protection protocols. Your information is only shared with authorized investigation teams.'
    },
    {
      id: 4,
      question: 'How long does the investigation process take?',
      answer: 'Investigation timelines vary based on case complexity. Simple cases may be resolved within 15-30 days, while complex cases involving multiple jurisdictions may take 60-90 days. You will receive regular updates on your case status.'
    },
    {
      id: 5,
      question: 'Can family members of defence personnel also report incidents?',
      answer: 'Yes, this portal is available for defence personnel, their families, and veterans. Family members can report incidents that affect them or their defence personnel relatives.'
    },
    {
      id: 6,
      question: 'What should I do immediately after discovering a cyber attack?',
      answer: 'Immediately disconnect from the internet, do not delete anything, take screenshots, change all passwords from a secure device, contact the helpline at 1930, and preserve all evidence for investigation.'
    }
  ];

  // Quick Action Cards Data
  const quickActions = [
    {
      id: 1,
      title: 'Report Cybercrime',
      description: 'File a new cybercrime complaint',
      icon: <FileText className="w-8 h-8" />,
      link: '/report',
      color: 'bg-defence-red-600 hover:bg-defence-red-700'
    },
    {
      id: 2,
      title: 'Track Your Case',
      description: 'Check status of existing reports',
      icon: <Search className="w-8 h-8" />,
      link: '/track',
      color: 'bg-defence-blue-600 hover:bg-defence-blue-700'
    },
    {
      id: 3,
      title: 'Emergency Helpline',
      description: 'Call 1930 for immediate assistance',
      icon: <Phone className="w-8 h-8" />,
      link: 'tel:1930',
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      id: 4,
      title: 'Cyber Awareness',
      description: 'Learn about cyber threats',
      icon: <Shield className="w-8 h-8" />,
      link: '/awareness',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      id: 5,
      title: 'Training Resources',
      description: 'Access training materials',
      icon: <GraduationCap className="w-8 h-8" />,
      link: '/training',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 6,
      title: 'Security Guidelines',
      description: 'Download security protocols',
      icon: <Download className="w-8 h-8" />,
      link: '/guidelines',
      color: 'bg-indigo-600 hover:bg-indigo-700'
    }
  ];

  // Mock media gallery data
  const mediaGallery = [
    {
      id: 1,
      title: 'Cybersecurity Training Session',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
      category: 'Training',
      date: '2024-01-10',
      size: '2.3 MB',
      description: 'Advanced cybersecurity training for defence personnel'
    },
    {
      id: 2,
      title: 'Phishing Awareness Demo',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      category: 'Awareness',
      date: '2024-01-08',
      size: '15.7 MB',
      description: 'Interactive demonstration of phishing attack techniques'
    },
    {
      id: 3,
      title: 'Digital Forensics Lab',
      type: 'image',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      category: 'Forensics',
      date: '2024-01-05',
      size: '3.1 MB',
      description: 'State-of-the-art digital forensics laboratory setup'
    },
    {
      id: 4,
      title: 'Incident Response Protocol',
      type: 'video',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      category: 'Protocol',
      date: '2024-01-03',
      size: '22.4 MB',
      description: 'Step-by-step incident response procedures'
    }
  ];

  const filteredMedia = mediaGallery.filter(item => {
    if (selectedMediaFilter === 'all') return true;
    if (selectedMediaFilter === 'images') return item.type === 'image';
    if (selectedMediaFilter === 'videos') return item.type === 'video';
    return false;
  });

  const filteredThreats = cyberThreats.filter(threat => {
    if (selectedThreatFilter === 'all') return true;
    return threat.severity.toLowerCase() === selectedThreatFilter;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-defence-red-600 text-white';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-yellow-400 text-defence-gray-900';
      case 'Low': return 'bg-defence-blue-500 text-white';
      default: return 'bg-defence-gray-500 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <Zap className="w-4 h-4" />;
      case 'High': return <AlertTriangle className="w-4 h-4" />;
      case 'Medium': return <Shield className="w-4 h-4" />;
      case 'Low': return <Clock className="w-4 h-4" />;
      default: return <Shield className="w-4 h-4" />;
    }
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffSeconds = Math.floor((now.getTime() - alertTime.getTime()) / 1000);

    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return `${Math.floor(diffSeconds / 86400)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Training': return 'bg-defence-blue-100 text-defence-blue-800';
      case 'Operations': return 'bg-green-100 text-green-800';
      case 'Awareness': return 'bg-purple-100 text-purple-800';
      case 'Forensics': return 'bg-orange-100 text-orange-800';
      case 'Protocol': return 'bg-defence-red-100 text-defence-red-800';
      case 'Infrastructure': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-defence-gray-100 text-defence-gray-800';
    }
  };

  const fetchThreats = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchThreats();
    let intervalId: NodeJS.Timeout;
    if (autoRefresh) {
      intervalId = setInterval(fetchThreats, 300000); // Refresh every 5 minutes
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % governmentNews.length);
    }, 5000);
    return () => clearInterval(newsTimer);
  }, []);

  return (
    <div className="min-h-screen bg-defence-gray-50">
      {/* Official Government Header */}
      <header className="bg-white border-b-4 border-defence-blue-600 shadow-sm sticky top-0 z-50">
        {/* Top Government Bar */}
        <div className="bg-defence-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center space-x-6">
                <span>Government of India | Ministry of Defence</span>
                <span className="hidden md:flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  National Cyber Security Portal
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {currentTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
                </span>
                <span className="flex items-center bg-defence-red-600 px-2 py-1 rounded text-xs font-semibold">
                  <Phone className="w-3 h-3 mr-1" />
                  Emergency: 1930
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="bg-defence-red-600 text-white py-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <span className="bg-white text-defence-red-600 px-2 py-1 text-xs font-bold rounded mr-4 flex-shrink-0">
                LATEST UPDATE
              </span>
              <div className="overflow-hidden">
                <motion.div
                  key={newsIndex}
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{ duration: 0.5 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {governmentNews[newsIndex]?.title} - {governmentNews[newsIndex]?.summary}
                </motion.div>
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
                  Defence Personnel Cyber Security Network
                </h1>
                <p className="text-sm text-defence-gray-600 flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  National Cyber Incident Response & Safety Portal
                </p>
                <p className="text-xs text-defence-gray-500 mt-1">
                  Established under Cyber Security Division, Ministry of Defence
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              <Link
                to="/"
                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1 px-2"
              >
                Home
              </Link>
              <Link
                to="/report-incident"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                Report Incident
              </Link>
              <Link
                to="/cyber-awareness"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                Cyber Awareness
              </Link>
              <Link
                to="/training"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                Training
              </Link>
              <Link
                to="/resources"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                Resources
              </Link>
              <Link
                to="/contact"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors px-2 py-1 rounded hover:bg-defence-blue-50"
              >
                Contact
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-defence-blue-600 bg-defence-blue-50 border border-defence-blue-200 rounded hover:bg-defence-blue-100 transition-colors"
                >
                  Defence Personnel Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-defence-blue-600 border border-defence-blue-600 rounded hover:bg-defence-blue-700 transition-colors"
                >
                  New Defence Personnel Registration
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
                  className="font-medium text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/cyber-awareness"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Cyber Awareness
                </Link>
                <Link
                  to="/contact"
                  className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact Us
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t border-defence-gray-200">
                  <Link
                    to="/login"
                    className="w-full text-left px-4 py-2 text-sm font-medium text-defence-blue-600 bg-defence-blue-50 border border-defence-blue-200 rounded hover:bg-defence-blue-100 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Defence Personnel Login
                  </Link>
                  <Link
                    to="/register"
                    className="w-full text-left px-4 py-2 text-sm font-medium text-white bg-defence-blue-600 border border-defence-blue-600 rounded hover:bg-defence-blue-700 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    New Defence Personnel Registration
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-defence-blue-900 via-defence-blue-800 to-defence-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-6"
              >
                <span className="bg-defence-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center w-fit">
                  <Shield className="w-4 h-4 mr-2" />
                  Secure • Confidential • 24/7 Available
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight"
              >
                One Force, One Family,
                <span className="text-defence-red-400"> One Secure Network</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-defence-blue-100 mb-8 leading-relaxed"
              >
                India's premier cybersecurity portal dedicated to protecting our defence personnel, their families, and veterans from cyber threats. Report incidents, access training, and stay secure.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="tel:1930"
                  className="bg-defence-red-600 hover:bg-defence-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  <span>🚨 Emergency: 1930</span>
                </a>
                <Link
                  to="/report"
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-defence-blue-900 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <FileText className="w-6 h-6" />
                  <span>Report Incident</span>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-center">Security Statistics</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-defence-red-400">{securityStats.totalReports.toLocaleString()}</div>
                    <div className="text-sm text-defence-blue-100">Total Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">{securityStats.resolvedCases.toLocaleString()}</div>
                    <div className="text-sm text-defence-blue-100">Cases Resolved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400">{securityStats.activeInvestigations.toLocaleString()}</div>
                    <div className="text-sm text-defence-blue-100">Active Cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">{securityStats.preventedAttacks.toLocaleString()}</div>
                    <div className="text-sm text-defence-blue-100">Attacks Prevented</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Abstract Cyber Security Design */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f66d0f00344?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}></div>
          <div className="absolute inset-0 bg-gradient-to-br from-defence-blue-900 via-defence-blue-800 to-defence-gray-900 opacity-80"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-defence-blue-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="w-96 h-96 bg-defence-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="w-96 h-96 bg-defence-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-4">Quick Actions</h2>
            <p className="text-lg text-defence-gray-600 max-w-3xl mx-auto">
              Access essential cybersecurity services and resources designed specifically for defence personnel and their families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link
                  to={action.link}
                  className={`block ${action.color} text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-lg">
                      {action.icon}
                    </div>
                    <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-white/90">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Reporting Works Section */}
      <section className="py-16 bg-defence-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-2">How Reporting Works</h2>
            <p className="text-lg text-defence-gray-600">A clear, step-by-step guide to filing a cybercrime report</p>
          </div>

          <ol className="relative border-s-2 border-defence-blue-200">
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-defence-blue-600 ring-8 ring-defence-gray-100">
                <FileText className="h-3.5 w-3.5 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-defence-gray-900">Prepare Details</h3>
              <p className="mt-1 text-defence-gray-600">Gather incident date/time, description, screenshots, bank records, and any suspect information.</p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-defence-blue-600 ring-8 ring-defence-gray-100">
                <Upload className="h-3.5 w-3.5 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-defence-gray-900">Upload Evidence</h3>
              <p className="mt-1 text-defence-gray-600">Attach documents and media supporting your case. Ensure files are clear and legible.</p>
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-defence-blue-600 ring-8 ring-defence-gray-100">
                <Search className="h-3.5 w-3.5 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-defence-gray-900">Review & Submit</h3>
              <p className="mt-1 text-defence-gray-600">Double-check all entries before submission to help speed up verification and action.</p>
            </li>
            <li className="ms-6">
              <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-defence-blue-600 ring-8 ring-defence-gray-100">
                <CheckCircle className="h-3.5 w-3.5 text-white" />
              </span>
              <h3 className="text-xl font-semibold text-defence-gray-900">Track Your Case</h3>
              <p className="mt-1 text-defence-gray-600">After submitting, you'll receive an acknowledgement. Tracking is available from your dashboard.</p>
            </li>
          </ol>
        </div>
      </section>

      {/* AI Cyber Threat Updates Section */}
      <section className="py-16 bg-defence-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-defence-red-500 flex items-center mb-2">
                <AlertTriangle className="w-8 h-8 mr-3" />
                Real-Time Cyber Threat Intelligence
              </h2>
              <p className="text-defence-gray-300">
                AI-powered threat detection and analysis for defence infrastructure
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Threat Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-defence-gray-400" />
                <select
                  value={selectedThreatFilter}
                  onChange={(e) => setSelectedThreatFilter(e.target.value as any)}
                  className="bg-defence-gray-800 border border-defence-gray-700 text-white rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-defence-red-500"
                >
                  <option value="all">All Threats ({cyberThreats.length})</option>
                  <option value="critical">Critical ({cyberThreats.filter(t => t.severity === 'Critical').length})</option>
                  <option value="high">High ({cyberThreats.filter(t => t.severity === 'High').length})</option>
                  <option value="medium">Medium ({cyberThreats.filter(t => t.severity === 'Medium').length})</option>
                </select>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={autoRefresh}
                    onChange={() => setAutoRefresh(!autoRefresh)}
                  />
                  <div className="relative w-11 h-6 bg-defence-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-defence-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-defence-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-defence-red-600"></div>
                  <span className="ms-3 text-sm font-medium text-defence-gray-300">Auto Refresh</span>
                </label>
                <button
                  onClick={fetchThreats}
                  disabled={loading}
                  className="px-4 py-2 bg-defence-red-700 text-white rounded-md hover:bg-defence-red-800 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Refreshing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" /> Refresh
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredThreats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-defence-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-defence-gray-700 hover:border-defence-red-500 group"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getSeverityColor(threat.severity)}`}>
                      {getSeverityIcon(threat.severity)}
                      <span>{threat.severity}</span>
                    </span>
                    <span className="text-xs text-defence-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {getTimeAgo(threat.time)}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-defence-red-400 transition-colors">
                    {threat.title}
                  </h3>

                  <p className="text-defence-gray-300 text-sm mb-4 line-clamp-3">
                    {threat.summary}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-defence-gray-400">
                      <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{threat.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-defence-gray-400">
                      <Server className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>{threat.affectedSystems}</span>
                    </div>
                    <div className="flex items-center text-sm text-defence-gray-400">
                      <UserCheck className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Reported by: {threat.reportedBy}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="text-defence-red-400 hover:text-defence-red-300 text-sm font-medium flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                    <button className="text-defence-gray-400 hover:text-white text-sm">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredThreats.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-defence-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-defence-gray-400 mb-2">No threats found</h3>
              <p className="text-defence-gray-500">No threats match the selected filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Government News Section */}
      <section className="py-16 bg-defence-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-4">Latest Government Updates</h2>
            <p className="text-lg text-defence-gray-600">Stay informed about the latest cybersecurity policies, guidelines, and initiatives.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {governmentNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-defence-gray-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${news.priority === 'high' ? 'bg-defence-red-100 text-defence-red-800' :
                        news.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-defence-blue-100 text-defence-blue-800'
                      }`}>
                      {news.category}
                    </span>
                    <span className="text-xs text-defence-gray-500">{news.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-defence-gray-900 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-defence-gray-600 line-clamp-3 mb-4">{news.summary}</p>
                  <button className="text-defence-blue-600 hover:text-defence-blue-700 text-sm font-medium flex items-center">
                    Read More <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-defence-gray-600">Get answers to common questions about cybersecurity and reporting procedures.</p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq) => (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="border border-defence-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full px-6 py-4 text-left bg-defence-gray-50 hover:bg-defence-gray-100 transition-colors flex justify-between items-center"
                >
                  <span className="font-semibold text-defence-gray-900">{faq.question}</span>
                  {expandedFaq === faq.id ? (
                    <ChevronUp className="w-5 h-5 text-defence-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-defence-gray-500" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-4 bg-white border-t border-defence-gray-200"
                  >
                    <p className="text-defence-gray-700 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section className="py-16 bg-defence-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-4">Training & Awareness Media Gallery</h2>
            <p className="text-lg text-defence-gray-600">Explore our comprehensive collection of cybersecurity training materials, awareness videos, and educational resources.</p>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedMediaFilter('all')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${selectedMediaFilter === 'all' ? 'bg-defence-blue-600 text-white' : 'bg-defence-gray-200 text-defence-gray-700 hover:bg-defence-gray-300'}`}
            >
              All ({mediaGallery.length})
            </button>
            <button
              onClick={() => setSelectedMediaFilter('images')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${selectedMediaFilter === 'images' ? 'bg-defence-blue-600 text-white' : 'bg-defence-gray-200 text-defence-gray-700 hover:bg-defence-gray-300'}`}
            >
              Images ({mediaGallery.filter(item => item.type === 'image').length})
            </button>
            <button
              onClick={() => setSelectedMediaFilter('videos')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${selectedMediaFilter === 'videos' ? 'bg-defence-blue-600 text-white' : 'bg-defence-gray-200 text-defence-gray-700 hover:bg-defence-gray-300'}`}
            >
              Videos ({mediaGallery.filter(item => item.type === 'video').length})
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map(item => (
              <motion.div
                key={item.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-lg transition-shadow duration-300 border border-defence-gray-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all">
                      <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2 ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                  <h3 className="text-lg font-semibold text-defence-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-defence-gray-600 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center text-xs text-defence-gray-500 mt-2">
                    <span>{item.date}</span>
                    <span>{item.size}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Support Section */}
      <section className="py-16 bg-defence-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">24/7 Support & Emergency Response</h2>
            <p className="text-xl text-defence-blue-100">We're here to help you stay secure around the clock</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-defence-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Helpline</h3>
              <p className="text-3xl font-bold text-defence-red-400 mb-2">1930</p>
              <p className="text-defence-blue-200 text-sm">Available 24/7 for immediate assistance</p>
            </div>

            <div className="text-center">
              <div className="bg-defence-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-lg font-semibold text-defence-blue-200 mb-2">cybercrime-helpline@gov.in</p>
              <p className="text-defence-blue-200 text-sm">Response within 2-4 hours</p>
            </div>

            <div className="text-center">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-lg font-semibold text-defence-blue-200 mb-2">Available Now</p>
              <p className="text-defence-blue-200 text-sm">Instant support for quick queries</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Help Center</h3>
              <p className="text-lg font-semibold text-defence-blue-200 mb-2">Self-Service</p>
              <p className="text-defence-blue-200 text-sm">Comprehensive guides and tutorials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-defence-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Government Info */}
            <div>
              <div className="flex items-center mb-4">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                  alt="Government of India"
                  className="h-8 w-auto mr-3"
                />
                <div>
                  <h3 className="text-lg font-semibold">Government of India</h3>
                  <p className="text-sm text-defence-gray-400">Ministry of Defence</p>
                </div>
              </div>
              <p className="text-sm text-defence-gray-300 leading-relaxed">
                Dedicated to protecting our defence personnel and their families from cyber threats through advanced security measures and comprehensive support services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-defence-gray-300">
                <li><Link to="/report" className="hover:text-white transition-colors">Report Cybercrime</Link></li>
                <li><Link to="/track" className="hover:text-white transition-colors">Track Your Case</Link></li>
                <li><Link to="/awareness" className="hover:text-white transition-colors">Cyber Awareness</Link></li>
                <li><Link to="/training" className="hover:text-white transition-colors">Training Programs</Link></li>
                <li><Link to="/guidelines" className="hover:text-white transition-colors">Security Guidelines</Link></li>
                <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              </ul>
            </div>

            {/* Legal & Policies */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal & Policies</h3>
              <ul className="space-y-2 text-sm text-defence-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Information Technology Act</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Data Protection</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Accessibility</a></li>
                <li><a href="#" className="hover:text-white transition-colors">RTI Guidelines</a></li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-defence-gray-300">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Emergency: 1930</span>
                </div>
                <div className="flex items-center text-sm text-defence-gray-300">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>cybercrime-helpline@gov.in</span>
                </div>
                <div className="flex items-center text-sm text-defence-gray-300">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>New Delhi, India</span>
                </div>
              </div>

              <div className="flex space-x-4">
                <a href="#" className="text-defence-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-defence-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-defence-gray-400 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-defence-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-defence-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-defence-gray-400 mb-4 md:mb-0">
                <p>© 2024 Government of India, Ministry of Defence. All rights reserved.</p>
                <p className="mt-1">Last updated: {new Date().toLocaleDateString('en-IN')} | Version 2.1.0</p>
              </div>
              <div className="flex items-center space-x-4 text-sm text-defence-gray-400">
                <span className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  Secured by SSL
                </span>
                <span className="flex items-center">
                  <Lock className="w-4 h-4 mr-1" />
                  ISO 27001 Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
