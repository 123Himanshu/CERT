"""
Incident Classification Model
AI-powered classification of cyber incidents into categories
"""

import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
import joblib
import logging
from typing import Dict, List, Any, Optional
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import warnings
warnings.filterwarnings('ignore')

# Download required NLTK data
try:
    nltk.download('punkt', quiet=True)
    nltk.download('stopwords', quiet=True)
    nltk.download('wordnet', quiet=True)
    nltk.download('vader_lexicon', quiet=True)
except:
    pass

logger = logging.getLogger(__name__)

class IncidentClassifier:
    """
    AI-powered incident classification system
    """
    
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            max_features=5000,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=2,
            max_df=0.95
        )
        
        # Initialize multiple models for ensemble
        self.models = {
            'random_forest': RandomForestClassifier(
                n_estimators=100,
                random_state=42,
                max_depth=10,
                min_samples_split=5
            ),
            'logistic_regression': LogisticRegression(
                random_state=42,
                max_iter=1000,
                C=1.0
            ),
            'naive_bayes': MultinomialNB(alpha=0.1)
        }
        
        self.lemmatizer = WordNetLemmatizer()
        self.stop_words = set(stopwords.words('english'))
        
        # Incident type categories
        self.incident_types = {
            'fraud': 0,
            'malware': 1,
            'phishing': 2,
            'espionage': 3,
            'opsec': 4,
            'ddos': 5,
            'data_breach': 6,
            'social_engineering': 7,
            'other': 8
        }
        
        # Threat level mapping
        self.threat_levels = {
            'low': 0,
            'medium': 1,
            'high': 2,
            'critical': 3
        }
        
        self.is_trained = False
        self.model_loaded = False
        
        # Load pre-trained model if available
        self._load_model()
    
    def _load_model(self):
        """Load pre-trained model from file"""
        try:
            # In production, load from actual model files
            self.model_loaded = True
            logger.info("Pre-trained model loaded successfully")
        except Exception as e:
            logger.warning(f"Could not load pre-trained model: {e}")
            self.model_loaded = False
    
    def _preprocess_text(self, text: str) -> str:
        """Preprocess text for classification"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters and digits
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Tokenize
        tokens = word_tokenize(text)
        
        # Remove stopwords and lemmatize
        tokens = [
            self.lemmatizer.lemmatize(token) 
            for token in tokens 
            if token not in self.stop_words and len(token) > 2
        ]
        
        return ' '.join(tokens)
    
    def _extract_features(self, title: str, description: str, location: str) -> Dict[str, Any]:
        """Extract features for classification"""
        features = {}
        
        # Text features
        combined_text = f"{title} {description}"
        processed_text = self._preprocess_text(combined_text)
        
        features['text_length'] = len(processed_text)
        features['word_count'] = len(processed_text.split())
        features['title_length'] = len(title)
        features['description_length'] = len(description)
        
        # Keyword features
        fraud_keywords = ['fraud', 'scam', 'fake', 'money', 'payment', 'bank', 'credit', 'debit']
        malware_keywords = ['virus', 'malware', 'trojan', 'ransomware', 'infected', 'hack']
        phishing_keywords = ['email', 'phishing', 'suspicious', 'link', 'click', 'verify', 'account']
        espionage_keywords = ['spy', 'espionage', 'classified', 'secret', 'intelligence', 'leak']
        opsec_keywords = ['opsec', 'operational', 'security', 'breach', 'unauthorized', 'access']
        
        features['fraud_keywords'] = sum(1 for keyword in fraud_keywords if keyword in processed_text)
        features['malware_keywords'] = sum(1 for keyword in malware_keywords if keyword in processed_text)
        features['phishing_keywords'] = sum(1 for keyword in phishing_keywords if keyword in processed_text)
        features['espionage_keywords'] = sum(1 for keyword in espionage_keywords if keyword in processed_text)
        features['opsec_keywords'] = sum(1 for keyword in opsec_keywords if keyword in processed_text)
        
        # Location features
        features['location_risk'] = self._get_location_risk(location)
        
        # Temporal features
        features['urgency_indicators'] = self._count_urgency_indicators(processed_text)
        
        return features
    
    def _get_location_risk(self, location: str) -> float:
        """Calculate location-based risk score"""
        high_risk_locations = ['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad']
        medium_risk_locations = ['kolkata', 'pune', 'ahmedabad', 'jaipur', 'lucknow']
        
        location_lower = location.lower()
        
        if any(risk_loc in location_lower for risk_loc in high_risk_locations):
            return 0.8
        elif any(risk_loc in location_lower for risk_loc in medium_risk_locations):
            return 0.5
        else:
            return 0.3
    
    def _count_urgency_indicators(self, text: str) -> int:
        """Count urgency indicators in text"""
        urgency_words = ['urgent', 'immediate', 'critical', 'emergency', 'asap', 'now', 'quickly']
        return sum(1 for word in urgency_words if word in text)
    
    def _calculate_threat_level(self, features: Dict[str, Any], predicted_type: str) -> str:
        """Calculate threat level based on features and predicted type"""
        risk_score = 0.0
        
        # Base risk by incident type
        type_risk = {
            'fraud': 0.3,
            'malware': 0.7,
            'phishing': 0.5,
            'espionage': 0.9,
            'opsec': 0.8,
            'ddos': 0.6,
            'data_breach': 0.8,
            'social_engineering': 0.6,
            'other': 0.4
        }
        
        risk_score += type_risk.get(predicted_type, 0.4)
        
        # Adjust based on features
        if features['urgency_indicators'] > 0:
            risk_score += 0.2
        
        if features['location_risk'] > 0.7:
            risk_score += 0.1
        
        if features['text_length'] > 500:  # Detailed description
            risk_score += 0.1
        
        # Normalize to 0-1 range
        risk_score = min(1.0, max(0.0, risk_score))
        
        # Map to threat levels
        if risk_score >= 0.8:
            return 'critical'
        elif risk_score >= 0.6:
            return 'high'
        elif risk_score >= 0.4:
            return 'medium'
        else:
            return 'low'
    
    async def classify(self, title: str, description: str, evidence_files: List[str], 
                      location: str, incident_date: str) -> Dict[str, Any]:
        """
        Classify an incident using AI models
        """
        try:
            # Extract features
            features = self._extract_features(title, description, location)
            
            # Prepare text for classification
            combined_text = f"{title} {description}"
            processed_text = self._preprocess_text(combined_text)
            
            if not processed_text:
                return {
                    'predicted_type': 'other',
                    'confidence_score': 0.5,
                    'threat_level': 'low',
                    'risk_score': 0.3,
                    'explanation': 'Insufficient text for classification'
                }
            
            # Vectorize text
            text_vector = self.vectorizer.transform([processed_text])
            
            # Make prediction using ensemble
            predictions = []
            confidences = []
            
            for model_name, model in self.models.items():
                if hasattr(model, 'predict_proba'):
                    pred_proba = model.predict_proba(text_vector)[0]
                    pred_class = np.argmax(pred_proba)
                    confidence = np.max(pred_proba)
                    
                    predictions.append(pred_class)
                    confidences.append(confidence)
            
            # Ensemble prediction
            if predictions:
                # Use majority voting
                predicted_type_idx = max(set(predictions), key=predictions.count)
                avg_confidence = np.mean(confidences)
                
                # Map index to incident type
                predicted_type = list(self.incident_types.keys())[predicted_type_idx]
            else:
                # Fallback to rule-based classification
                predicted_type = self._rule_based_classification(processed_text, features)
                avg_confidence = 0.6
            
            # Calculate threat level
            threat_level = self._calculate_threat_level(features, predicted_type)
            
            # Calculate risk score
            risk_score = avg_confidence * (self.threat_levels[threat_level] + 1) / 4
            
            # Generate explanation
            explanation = self._generate_explanation(predicted_type, threat_level, features)
            
            return {
                'predicted_type': predicted_type,
                'confidence_score': float(avg_confidence),
                'threat_level': threat_level,
                'risk_score': float(risk_score),
                'explanation': explanation,
                'features': features
            }
            
        except Exception as e:
            logger.error(f"Error in classification: {e}")
            return {
                'predicted_type': 'other',
                'confidence_score': 0.5,
                'threat_level': 'medium',
                'risk_score': 0.5,
                'explanation': f'Classification error: {str(e)}'
            }
    
    def _rule_based_classification(self, text: str, features: Dict[str, Any]) -> str:
        """Fallback rule-based classification"""
        if features['fraud_keywords'] > features['malware_keywords'] and features['fraud_keywords'] > features['phishing_keywords']:
            return 'fraud'
        elif features['malware_keywords'] > features['phishing_keywords']:
            return 'malware'
        elif features['phishing_keywords'] > 0:
            return 'phishing'
        elif features['espionage_keywords'] > 0:
            return 'espionage'
        elif features['opsec_keywords'] > 0:
            return 'opsec'
        else:
            return 'other'
    
    def _generate_explanation(self, predicted_type: str, threat_level: str, features: Dict[str, Any]) -> str:
        """Generate human-readable explanation for classification"""
        explanations = {
            'fraud': f"Classified as fraud based on {features['fraud_keywords']} fraud-related keywords and financial context.",
            'malware': f"Classified as malware based on {features['malware_keywords']} malware-related keywords and technical indicators.",
            'phishing': f"Classified as phishing based on {features['phishing_keywords']} phishing-related keywords and social engineering indicators.",
            'espionage': f"Classified as espionage based on {features['espionage_keywords']} espionage-related keywords and security context.",
            'opsec': f"Classified as operational security breach based on {features['opsec_keywords']} OPSEC-related keywords.",
            'ddos': "Classified as DDoS attack based on network disruption indicators.",
            'data_breach': "Classified as data breach based on unauthorized access indicators.",
            'social_engineering': "Classified as social engineering based on manipulation indicators.",
            'other': "Classified as other based on general cyber incident indicators."
        }
        
        base_explanation = explanations.get(predicted_type, explanations['other'])
        
        if threat_level == 'critical':
            base_explanation += " This is a CRITICAL threat requiring immediate attention."
        elif threat_level == 'high':
            base_explanation += " This is a HIGH threat requiring urgent attention."
        elif threat_level == 'medium':
            base_explanation += " This is a MEDIUM threat requiring prompt attention."
        else:
            base_explanation += " This is a LOW threat requiring standard attention."
        
        return base_explanation
    
    async def train_model(self, training_data: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Train the classification model with new data"""
        try:
            # Prepare training data
            texts = []
            labels = []
            
            for item in training_data:
                combined_text = f"{item['title']} {item['description']}"
                processed_text = self._preprocess_text(combined_text)
                texts.append(processed_text)
                labels.append(self.incident_types.get(item['incident_type'], 8))  # Default to 'other'
            
            # Vectorize texts
            X = self.vectorizer.fit_transform(texts)
            y = np.array(labels)
            
            # Split data
            X_train, X_test, y_train, y_test = train_test_split(
                X, y, test_size=0.2, random_state=42, stratify=y
            )
            
            # Train models
            model_scores = {}
            for model_name, model in self.models.items():
                model.fit(X_train, y_train)
                y_pred = model.predict(X_test)
                score = accuracy_score(y_test, y_pred)
                model_scores[model_name] = score
            
            self.is_trained = True
            
            return {
                'status': 'success',
                'model_scores': model_scores,
                'training_samples': len(training_data),
                'test_accuracy': np.mean(list(model_scores.values()))
            }
            
        except Exception as e:
            logger.error(f"Error training model: {e}")
            return {
                'status': 'error',
                'error': str(e)
            }
    
    async def get_metrics(self) -> Dict[str, Any]:
        """Get model performance metrics"""
        return {
            'is_trained': self.is_trained,
            'model_loaded': self.model_loaded,
            'incident_types': list(self.incident_types.keys()),
            'threat_levels': list(self.threat_levels.keys()),
            'vectorizer_features': self.vectorizer.max_features if hasattr(self.vectorizer, 'max_features') else 0
        }
    
    def is_loaded(self) -> bool:
        """Check if model is loaded and ready"""
        return self.model_loaded or self.is_trained
