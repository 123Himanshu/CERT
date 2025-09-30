export const translations = {
  en: {
    // Common
    login: 'Login',
    logout: 'Logout',
    submit: 'Submit',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    loading: 'Loading...',
    
    // Header
    portalTitle: 'Defence Cyber Portal',
    portalSubtitle: 'Cyber Incident & Safety Dashboard',
    emergency: 'Emergency',
    
    // Login
    serviceId: 'Service ID',
    enterServiceId: 'Enter Service ID',
    otp: 'OTP',
    enterOtp: 'Enter OTP',
    loginSecurely: 'Login Securely',
    authenticating: 'Authenticating...',
    securityNotice: 'Security Notice',
    securityMessage: 'This portal is exclusively for Defence Personnel, their families, and authorized personnel. Unauthorized access is prohibited.',
    
    // Dashboard
    welcome: 'Welcome, Defence Personnel',
    dashboardSubtitle: 'Report incidents, track complaints, and stay informed about cyber threats.',
    reportIncident: 'Report Incident',
    reportDescription: 'Quickly report cyber threats, scams, or suspicious activities',
    myComplaints: 'My Complaints',
    alertsWarnings: 'Alerts & Warnings',
    cyberSafetyTips: 'Cyber Safety Tips',
    
    // Status
    submitted: 'Submitted',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    
    // Priority
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    priority: 'Priority',
    
    // Threat Types
    phishing: 'Phishing',
    malware: 'Malware',
    scam: 'Scam',
    espionage: 'Espionage',
    opsecRisk: 'OPSEC Risk'
  },
  hi: {
    // Common
    login: 'लॉगिन',
    logout: 'लॉगआउट',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    save: 'सेव करें',
    close: 'बंद करें',
    loading: 'लोड हो रहा है...',
    
    // Header
    portalTitle: 'रक्षा साइबर पोर्टल',
    portalSubtitle: 'साइबर घटना और सुरक्षा डैशबोर्ड',
    emergency: 'आपातकाल',
    
    // Login
    serviceId: 'सेवा आईडी',
    enterServiceId: 'सेवा आईडी दर्ज करें',
    otp: 'ओटीपी',
    enterOtp: 'ओटीपी दर्ज करें',
    loginSecurely: 'सुरक्षित लॉगिन',
    authenticating: 'प्रमाणीकरण हो रहा है...',
    securityNotice: 'सुरक्षा सूचना',
    securityMessage: 'यह पोर्टल केवल रक्षा कर्मियों, उनके परिवारों और अधिकृत कर्मियों के लिए है। अनधिकृत पहुंच प्रतिबंधित है।',
    
    // Dashboard
    welcome: 'स्वागत है, रक्षा कर्मी',
    dashboardSubtitle: 'घटनाओं की रिपोर्ट करें, शिकायतों को ट्रैक करें, और साइबर खतरों के बारे में जानकारी रखें।',
    reportIncident: 'घटना की रिपोर्ट करें',
    reportDescription: 'साइबर खतरों, घोटालों या संदिग्ध गतिविधियों की तुरंत रिपोर्ट करें',
    myComplaints: 'मेरी शिकायतें',
    alertsWarnings: 'अलर्ट और चेतावनी',
    cyberSafetyTips: 'साइबर सुरक्षा टिप्स',
    
    // Status
    submitted: 'जमा किया गया',
    inProgress: 'प्रगति में',
    resolved: 'हल हो गया',
    
    // Priority
    high: 'उच्च',
    medium: 'मध्यम',
    low: 'कम',
    priority: 'प्राथमिकता',
    
    // Threat Types
    phishing: 'फिशिंग',
    malware: 'मैलवेयर',
    scam: 'घोटाला',
    espionage: 'जासूसी',
    opsecRisk: 'ऑपसेक जोखिम'
  }
};

export const extendedTranslations = {
  en: {
    ...translations.en,
    // Report Form
    threatType: 'Threat Type',
    selectThreatType: 'Select threat type',
    description: 'Description',
    descriptionPlaceholder: 'Describe the incident in detail...',
    dateTime: 'Date & Time',
    uploadEvidence: 'Upload Evidence',
    uploadDescription: 'Click to upload or drag and drop',
    supportedFormats: 'Supports: Images, Videos, Audio, Documents',
    saveDraft: 'Save Draft',
    submitReport: 'Submit Report',
    
    // Safety Tips
    safetyTip1: 'Never share your service credentials over phone or email',
    safetyTip2: 'Verify official communications through proper channels',
    safetyTip3: 'Use strong, unique passwords for all accounts',
    safetyTip4: 'Keep your devices updated with latest security patches',
    safetyTip5: 'Report suspicious activities immediately',
    
    // Alerts
    maliciousLink: '⚠️ Warning: The link in this SMS is malicious. Do not open.',
    phishingDetected: '🛡️ New phishing campaign detected targeting defence personnel',
    dismiss: 'Dismiss',
    reportAutomatically: 'Report Automatically',
    
    // Complaint Details
    complaintId: 'Complaint ID',
    status: 'Status',
    dateSubmitted: 'Date Submitted',
    viewDetails: 'View Details',
    complaintDetails: 'Complaint Details',
    
    // Footer
    emergencyHelpline: '24/7 Cyber Crime Helpline',
    callImmediately: 'Call immediately for urgent cyber threats',
    govIndia: 'Government of India',
    allRightsReserved: 'All rights reserved'
  },
  hi: {
    ...translations.hi,
    // Report Form
    threatType: 'खतरे का प्रकार',
    selectThreatType: 'खतरे का प्रकार चुनें',
    description: 'विवरण',
    descriptionPlaceholder: 'घटना का विस्तार से वर्णन करें...',
    dateTime: 'दिनांक और समय',
    uploadEvidence: 'सबूत अपलोड करें',
    uploadDescription: 'अपलोड करने के लिए क्लिक करें या ड्रैग एंड ड्रॉप करें',
    supportedFormats: 'समर्थित: चित्र, वीडियो, ऑडियो, दस्तावेज़',
    saveDraft: 'ड्राफ्ट सेव करें',
    submitReport: 'रिपोर्ट जमा करें',
    
    // Safety Tips
    safetyTip1: 'फोन या ईमेल पर कभी भी अपनी सेवा साख साझा न करें',
    safetyTip2: 'उचित चैनलों के माध्यम से आधिकारिक संचार की पुष्टि करें',
    safetyTip3: 'सभी खातों के लिए मजबूत, अनूठे पासवर्ड का उपयोग करें',
    safetyTip4: 'अपने उपकरणों को नवीनतम सुरक्षा पैच के साथ अपडेट रखें',
    safetyTip5: 'संदिग्ध गतिविधियों की तुरंत रिपोर्ट करें',
    
    // Alerts
    maliciousLink: '⚠️ चेतावनी: इस SMS में लिंक दुर्भावनापूर्ण है। न खोलें।',
    phishingDetected: '🛡️ रक्षा कर्मियों को लक्षित करने वाला नया फिशिंग अभियान का पता चला',
    dismiss: 'खारिज करें',
    reportAutomatically: 'स्वचालित रूप से रिपोर्ट करें',
    
    // Complaint Details
    complaintId: 'शिकायत आईडी',
    status: 'स्थिति',
    dateSubmitted: 'जमा करने की तारीख',
    viewDetails: 'विवरण देखें',
    complaintDetails: 'शिकायत विवरण',
    
    // Footer
    emergencyHelpline: '24/7 साइबर अपराध हेल्पलाइन',
    callImmediately: 'तत्काल साइबर खतरों के लिए तुरंत कॉल करें',
    govIndia: 'भारत सरकार',
    allRightsReserved: 'सभी अधिकार सुरक्षित'
  }
};

export type Language = 'en' | 'hi';
export type TranslationKey = keyof typeof extendedTranslations.en;