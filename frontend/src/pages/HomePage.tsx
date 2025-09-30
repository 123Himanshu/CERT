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
  ShieldCheck
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMediaFilter, setSelectedMediaFilter] = useState<'all' | 'images' | 'videos'>('all');

  // Mock cyber threat data
  const cyberThreats = [
    {
      id: 1,
      title: 'Ransomware Attack on Defence Contractor',
      severity: 'Critical',
      location: 'New Delhi',
      time: '2024-01-15T10:30:00Z',
      summary: 'Sophisticated ransomware attack targeting defence contractor systems. Immediate action required.',
      link: '#'
    },
    {
      id: 2,
      title: 'Phishing Campaign Targeting Veterans',
      severity: 'High',
      location: 'Mumbai',
      time: '2024-01-15T08:15:00Z',
      summary: 'Massive phishing campaign impersonating defence pension services.',
      link: '#'
    },
    {
      id: 3,
      title: 'Suspected Espionage Activity',
      severity: 'Critical',
      location: 'Bangalore',
      time: '2024-01-15T06:45:00Z',
      summary: 'Potential foreign intelligence gathering through social media platforms.',
      link: '#'
    },
    {
      id: 4,
      title: 'DDoS Attack on Defence Portal',
      severity: 'Medium',
      location: 'Chennai',
      time: '2024-01-15T04:20:00Z',
      summary: 'Distributed denial of service attack affecting portal availability.',
      link: '#'
    },
    {
      id: 5,
      title: 'Malware in Defence Email System',
      severity: 'High',
      location: 'Kolkata',
      time: '2024-01-15T02:10:00Z',
      summary: 'Advanced persistent threat detected in defence email infrastructure.',
      link: '#'
    },
    {
      id: 6,
      title: 'Honeytrap Operation Exposed',
      severity: 'Critical',
      location: 'Hyderabad',
      time: '2024-01-14T23:30:00Z',
      summary: 'Social engineering operation targeting defence personnel through dating apps.',
      link: '#'
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
      thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
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

  return (
    <div className="min-h-screen bg-defence-gray-50">
      {/* Official Government Header */}
      <header className="bg-white border-b-4 border-defence-blue-600 shadow-sm sticky top-0 z-50">
        <div className="bg-defence-blue-900 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center text-sm">
              <span>Government of India | Ministry of Defence</span>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Phone className="w-4 h-4 mr-1" />
                  Emergency: 1930
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/120px-Emblem_of_India.svg.png"
                alt="Government of India"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold text-defence-gray-900">
                  Defence Personnel Network
                </h1>
                <p className="text-sm text-defence-gray-600">
                  Cyber Incident & Safety Portal
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1"
              >
                Home
              </Link>
              <Link
                to="/cyber-awareness"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors"
              >
                Cyber Awareness
              </Link>
              
              <Link
                to="/contact"
                className="font-medium text-defence-gray-700 hover:text-defence-blue-600 transition-colors"
              >
                Contact Us
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
      <section className="relative bg-gradient-to-br from-defence-blue-900 via-defence-blue-800 to-defence-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
          >
            One Force, One Family, One Network
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-defence-blue-100 mb-8 max-w-4xl mx-auto"
          >
            Report cybercrime incidents quickly and safely. Dedicated for Defence Personnel, Families, and Veterans.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center items-center"
          >
            <a
              href="tel:1930"
              className="bg-defence-red-600 hover:bg-defence-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center space-x-2 transition-colors shadow-lg"
            >
              <Phone className="w-6 h-6" />
              <span>🚨 Call 1930 for Immediate Help</span>
            </a>
          </motion.div>
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
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-defence-red-500 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3" /> AI Cyber Threat Updates
            </h2>
            <div className="flex items-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoRefresh}
                  onChange={() => setAutoRefresh(!autoRefresh)}
                />
                <div className="relative w-11 h-6 bg-defence-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-defence-red-300 dark:peer-focus:ring-defence-red-800 rounded-full peer dark:bg-defence-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-defence-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-defence-gray-600 peer-checked:bg-defence-red-600"></div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cyberThreats.map((threat) => (
              <motion.a
                key={threat.id}
                href={threat.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-defence-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-defence-gray-700 hover:border-defence-red-500"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 ${getSeverityColor(threat.severity)}`}>
                      {getSeverityIcon(threat.severity)}
                      <span>{threat.severity}</span>
                    </span>
                    <span className="text-xs text-defence-gray-400 flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> {getTimeAgo(threat.time)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{threat.title}</h3>
                  <p className="text-defence-gray-300 text-sm mb-4 line-clamp-3">{threat.summary}</p>
                  <div className="flex items-center text-sm text-defence-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{threat.location}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Media Gallery Section */}
      <section className="py-16 bg-defence-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-defence-gray-900 mb-4">Media Gallery (Training & Awareness)</h2>
            <p className="text-lg text-defence-gray-600">Explore our collection of images and videos related to cyber security training and awareness.</p>
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

      {/* Footer */}
      <footer className="bg-defence-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Emergency</h3>
              <p className="text-sm text-defence-gray-300">Defence National Cyber Crime Helpline</p>
              <p className="text-2xl font-bold mt-2">1930</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm text-defence-gray-300">cybercrime-helpline@gov.in</p>
              <p className="text-sm text-defence-gray-300">Ministry of Defence, Government of India</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-defence-gray-300">
                <li><a href="#" className="hover:text-white">Cyber Laws</a></li>
                <li><a href="#" className="hover:text-white">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-defence-gray-700 mt-8 pt-6 text-center text-sm text-defence-gray-400">
            <p>© 2024 Government of India. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
