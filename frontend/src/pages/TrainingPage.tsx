import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/LanguageSwitcher';
import {
    Shield,
    Clock,
    Users,
    Award,
    BookOpen,
    Play,
    CheckCircle,
    AlertTriangle,
    Globe,
    Phone,
    Menu,
    X,
    Filter,
    Search,
    Star,
    ArrowRight,
    Download,
    Video,
    FileText,
    Target,
    Lock,
    Eye,
    Zap
} from 'lucide-react';

const TrainingPage: React.FC = () => {
    const { t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'basic' | 'advanced' | 'incident' | 'awareness'>('all');
    const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
    const [currentTime, setCurrentTime] = useState(new Date());

    // Training courses data
    const trainingCourses = [
        {
            id: 1,
            title: 'Cyber Security Fundamentals',
            titleHi: 'साइबर सुरक्षा की बुनियादी बातें',
            description: 'Learn the basics of cybersecurity, common threats, and protection strategies.',
            descriptionHi: 'साइबर सुरक्षा की मूल बातें, सामान्य खतरे और सुरक्षा रणनीतियां सीखें।',
            category: 'basic',
            level: 'beginner',
            duration: '2 hours',
            durationHi: '2 घंटे',
            enrolled: 1250,
            rating: 4.8,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
            instructor: 'Dr. Rajesh Kumar',
            modules: 8
        },
        {
            id: 2,
            title: 'Advanced Threat Detection',
            titleHi: 'उन्नत खतरा पहचान',
            description: 'Advanced techniques for identifying and responding to sophisticated cyber threats.',
            descriptionHi: 'परिष्कृत साइबर खतरों की पहचान और प्रतिक्रिया के लिए उन्नत तकनीकें।',
            category: 'advanced',
            level: 'advanced',
            duration: '4 hours',
            durationHi: '4 घंटे',
            enrolled: 850,
            rating: 4.9,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
            instructor: 'Col. Priya Sharma',
            modules: 12
        },
        {
            id: 3,
            title: 'Incident Response Protocol',
            titleHi: 'घटना प्रतिक्रिया प्रोटोकॉल',
            description: 'Step-by-step guide to handling cybersecurity incidents effectively.',
            descriptionHi: 'साइबर सुरक्षा घटनाओं को प्रभावी रूप से संभालने के लिए चरणबद्ध गाइड।',
            category: 'incident',
            level: 'intermediate',
            duration: '3 hours',
            durationHi: '3 घंटे',
            enrolled: 950,
            rating: 4.7,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
            instructor: 'Maj. Anil Singh',
            modules: 10
        },
        {
            id: 4,
            title: 'Social Engineering Awareness',
            titleHi: 'सामाजिक इंजीनियरिंग जागरूकता',
            description: 'Recognize and defend against social engineering attacks and manipulation.',
            descriptionHi: 'सामाजिक इंजीनियरिंग हमलों और हेरफेर को पहचानें और उनसे बचाव करें।',
            category: 'awareness',
            level: 'beginner',
            duration: '1.5 hours',
            durationHi: '1.5 घंटे',
            enrolled: 1500,
            rating: 4.6,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
            instructor: 'Dr. Meera Patel',
            modules: 6
        },
        {
            id: 5,
            title: 'Mobile Device Security',
            titleHi: 'मोबाइल डिवाइस सुरक्षा',
            description: 'Secure your mobile devices and protect sensitive information on the go.',
            descriptionHi: 'अपने मोबाइल डिवाइस को सुरक्षित करें और चलते-फिरते संवेदनशील जानकारी की सुरक्षा करें।',
            category: 'basic',
            level: 'beginner',
            duration: '2.5 hours',
            durationHi: '2.5 घंटे',
            enrolled: 1100,
            rating: 4.5,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
            instructor: 'Capt. Rohit Verma',
            modules: 9
        },
        {
            id: 6,
            title: 'Network Security Essentials',
            titleHi: 'नेटवर्क सुरक्षा आवश्यकताएं',
            description: 'Understand network vulnerabilities and implement robust security measures.',
            descriptionHi: 'नेटवर्क कमजोरियों को समझें और मजबूत सुरक्षा उपाय लागू करें।',
            category: 'advanced',
            level: 'intermediate',
            duration: '5 hours',
            durationHi: '5 घंटे',
            enrolled: 750,
            rating: 4.8,
            status: 'available',
            thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
            instructor: 'Lt. Col. Sanjay Gupta',
            modules: 15
        }
    ];

    const filteredCourses = trainingCourses.filter(course => {
        const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
        const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
        return categoryMatch && levelMatch;
    });

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'beginner': return 'bg-green-100 text-green-800';
            case 'intermediate': return 'bg-yellow-100 text-yellow-800';
            case 'advanced': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'basic': return <Shield className="w-5 h-5" />;
            case 'advanced': return <Zap className="w-5 h-5" />;
            case 'incident': return <AlertTriangle className="w-5 h-5" />;
            case 'awareness': return <Eye className="w-5 h-5" />;
            default: return <BookOpen className="w-5 h-5" />;
        }
    };

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="min-h-screen bg-defence-gray-50">
            {/* Header */}
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
                                className="font-medium text-defence-blue-600 border-b-2 border-defence-blue-600 pb-1 px-2"
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
                                    className="font-medium text-defence-gray-700 hover:text-defence-blue-600"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {t('nav.awareness')}
                                </Link>
                                <Link
                                    to="/training"
                                    className="font-medium text-defence-blue-600"
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
                            {t('training.title')}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl text-defence-blue-100 mb-8 max-w-3xl mx-auto"
                        >
                            {t('training.subtitle')}
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-8 bg-white border-b border-defence-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <Filter className="w-5 h-5 text-defence-gray-600" />
                                <span className="font-medium text-defence-gray-900">Category:</span>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value as any)}
                                    className="border border-defence-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                                >
                                    <option value="all">{t('training.filter.all')}</option>
                                    <option value="basic">{t('training.categories.basic')}</option>
                                    <option value="advanced">{t('training.categories.advanced')}</option>
                                    <option value="incident">{t('training.categories.incident')}</option>
                                    <option value="awareness">{t('training.categories.awareness')}</option>
                                </select>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="font-medium text-defence-gray-900">Level:</span>
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value as any)}
                                    className="border border-defence-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-defence-blue-500 focus:border-defence-blue-500"
                                >
                                    <option value="all">{t('training.filter.all')}</option>
                                    <option value="beginner">{t('training.filter.beginner')}</option>
                                    <option value="intermediate">{t('training.filter.intermediate')}</option>
                                    <option value="advanced">{t('training.filter.advanced')}</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-sm text-defence-gray-600">
                            Showing {filteredCourses.length} of {trainingCourses.length} courses
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Courses */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.map((course, index) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative">
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
                                            {t(`training.filter.${course.level}`)}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                                        {getCategoryIcon(course.category)}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-defence-gray-900 mb-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-defence-gray-600 mb-4 line-clamp-2">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4 text-sm text-defence-gray-500">
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {course.duration}
                                            </span>
                                            <span className="flex items-center">
                                                <Users className="w-4 h-4 mr-1" />
                                                {course.enrolled}
                                            </span>
                                        </div>
                                        <div className="flex items-center">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span className="text-sm font-medium text-defence-gray-700 ml-1">
                                                {course.rating}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-defence-gray-500">
                                            {course.modules} modules
                                        </span>
                                        <button className="bg-defence-blue-600 hover:bg-defence-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                                            <span>{t('training.enroll')}</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
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

export default TrainingPage;