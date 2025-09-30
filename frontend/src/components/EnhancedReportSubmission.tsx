import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Upload, FileText, Calendar, Clock, Shield, 
  AlertTriangle, Phone, Mail, Download, Share2, Eye, X,
  Zap, Brain, Activity, Bell, Target
} from 'lucide-react';

interface EnhancedReportSubmissionProps {
  onClose: () => void;
}

const EnhancedReportSubmission: React.FC<EnhancedReportSubmissionProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] = useState(false);
  const [reportId, setReportId] = useState('');
  const [formData, setFormData] = useState({
    threatType: '',
    description: '',
    dateTime: new Date().toISOString().slice(0, 16),
    location: '',
    evidenceFiles: [] as File[],
    urgency: 'medium',
    contactMethod: 'email'
  });

  const threatTypes = [
    'Phishing Email/SMS',
    'Malware/Virus',
    'Scam Call/Message', 
    'Fake Website/App',
    'Identity Theft',
    'Financial Fraud',
    'Social Engineering',
    'Espionage Attempt',
    'OPSEC Violation',
    'Other Cyber Threat'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Generate report ID
    const newReportId = `DCP-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    setReportId(newReportId);
    
    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionComplete(true);
    }, 3000);
  };

  if (submissionComplete) {
    return <ReportSubmissionSuccess reportId={reportId} formData={formData} onClose={onClose} />;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Report Cyber Incident</h2>
              <p className="text-sm text-gray-600 mt-1">Secure incident reporting with AI analysis</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Threat Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Threat Type *</label>
              <select
                value={formData.threatType}
                onChange={(e) => handleInputChange('threatType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select threat type</option>
                {threatTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
              <select
                value={formData.urgency}
                onChange={(e) => handleInputChange('urgency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical/Emergency</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe the incident in detail..."
            />
          </div>

          {/* Date/Time and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
              <input
                type="datetime-local"
                value={formData.dateTime}
                onChange={(e) => handleInputChange('dateTime', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Where did this occur?"
              />
            </div>
          </div>

          {/* Evidence Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Evidence</label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">Supports: Images, Videos, Audio, Documents</p>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting Report...</span>
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  <span>Submit Report</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// Report Submission Success Component
const ReportSubmissionSuccess: React.FC<{
  reportId: string;
  formData: any;
  onClose: () => void;
}> = ({ reportId, formData, onClose }) => {
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);

  React.useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      setAnalysisResults({
        threatLevel: formData.threatType.includes('Phishing') ? 'High' : 
                    formData.threatType.includes('Malware') ? 'Critical' : 'Medium',
        aiConfidence: Math.floor(Math.random() * 20) + 80,
        riskScore: Math.floor(Math.random() * 30) + 70,
        classification: formData.threatType.includes('Phishing') ? 'Phishing Campaign' :
                      formData.threatType.includes('Malware') ? 'Malware Infection' : 'Social Engineering',
        immediateActions: [
          'Report has been logged and assigned priority status',
          'AI analysis completed with high confidence',
          'Threat indicators shared with collective intelligence',
          'Automated protective measures activated'
        ],
        nextSteps: [
          'CERT-Army analysts will review within 2 hours',
          'You will receive SMS/Email updates on progress',
          'If urgent, call emergency helpline 1930',
          'Check dashboard for real-time status updates'
        ]
      });
    }, 2000);
  }, [formData]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Success Header */}
        <div className="px-8 py-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle className="h-12 w-12" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-bold">Report Submitted Successfully!</h2>
              <p className="text-green-100">Your cyber incident has been logged and is being analyzed</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Report Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Report Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-blue-700">Report ID:</span>
                <p className="text-lg font-mono text-blue-900">{reportId}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-700">Submission Time:</span>
                <p className="text-blue-900">{new Date().toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-700">Threat Type:</span>
                <p className="text-blue-900">{formData.threatType}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-blue-700">Priority Level:</span>
                <p className="text-blue-900 capitalize">{formData.urgency}</p>
              </div>
            </div>
          </div>

          {/* AI Analysis Results */}
          {analysisResults ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-50 border border-purple-200 rounded-xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Brain className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">AI Analysis Complete</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{analysisResults.aiConfidence}%</div>
                  <div className="text-sm text-purple-700">AI Confidence</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{analysisResults.riskScore}</div>
                  <div className="text-sm text-red-700">Risk Score</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className={`text-lg font-bold ${
                    analysisResults.threatLevel === 'Critical' ? 'text-red-600' :
                    analysisResults.threatLevel === 'High' ? 'text-orange-600' : 'text-yellow-600'
                  }`}>{analysisResults.threatLevel}</div>
                  <div className="text-sm text-gray-700">Threat Level</div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Classification: {analysisResults.classification}</h4>
                <p className="text-purple-700 text-sm">
                  Our AI system has analyzed your report and classified it as a {analysisResults.classification.toLowerCase()} 
                  with {analysisResults.aiConfidence}% confidence. Appropriate response protocols have been activated.
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-6 w-6 text-purple-600" />
                </motion.div>
                <span className="text-purple-900">AI Analysis in progress...</span>
              </div>
            </div>
          )}

          {/* Immediate Actions Taken */}
          {analysisResults && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">Immediate Actions Taken</h3>
              </div>
              <ul className="space-y-2">
                {analysisResults.immediateActions.map((action: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-green-800">{action}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Next Steps */}
          {analysisResults && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-900">What Happens Next</h3>
              </div>
              <ul className="space-y-2">
                {analysisResults.nextSteps.map((step: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-orange-800">{step}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-gray-200">
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Eye className="h-5 w-5" />
              <span>View Full Report</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Download className="h-5 w-5" />
              <span>Download Receipt</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Share2 className="h-5 w-5" />
              <span>Share Report ID</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Phone className="h-5 w-5" />
              <span>Call 1930 (Emergency)</span>
            </button>
            <button 
              onClick={onClose}
              className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Return to Dashboard</span>
            </button>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Emergency Helpline</div>
                  <div className="text-gray-600">1930 (24/7 Available)</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <div className="font-medium text-gray-900">Email Support</div>
                  <div className="text-gray-600">cyber-helpline@mod.gov.in</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedReportSubmission;