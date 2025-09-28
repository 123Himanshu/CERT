"""
Defence Cyber Incident AI Classification Service
SIH2025 - AI-Enabled Threat Analysis and Classification
"""

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import asyncio
import logging
from datetime import datetime
import json
import numpy as np
from pathlib import Path

# Import our AI modules
from models.incident_classifier import IncidentClassifier
from models.threat_analyzer import ThreatAnalyzer
from models.evidence_processor import EvidenceProcessor
from models.mitigation_generator import MitigationGenerator
from utils.encryption import EncryptionUtils
from utils.logger import setup_logger

# Setup logging
logger = setup_logger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Defence Cyber Incident AI Service",
    description="AI-powered threat classification and analysis for defence cyber incidents",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize AI models
incident_classifier = IncidentClassifier()
threat_analyzer = ThreatAnalyzer()
evidence_processor = EvidenceProcessor()
mitigation_generator = MitigationGenerator()
encryption_utils = EncryptionUtils()

# Pydantic models
class IncidentData(BaseModel):
    title: str
    description: str
    incident_type: Optional[str] = None
    evidence_files: List[str] = []
    location: str
    incident_date: str
    user_id: str

class ClassificationResult(BaseModel):
    incident_id: str
    predicted_type: str
    confidence_score: float
    threat_level: str
    risk_score: float
    ai_explanation: str
    recommended_actions: List[str]
    mitigation_playbook: Dict[str, Any]
    processing_time: float

class ThreatAnalysisResult(BaseModel):
    incident_id: str
    threat_indicators: List[Dict[str, Any]]
    attack_vectors: List[str]
    potential_impact: str
    attribution_confidence: float
    ioc_indicators: List[Dict[str, str]]
    timeline_analysis: Dict[str, Any]

class EvidenceAnalysisResult(BaseModel):
    file_id: str
    file_type: str
    malicious_content: bool
    threat_indicators: List[str]
    extracted_text: Optional[str] = None
    metadata: Dict[str, Any]
    confidence_score: float

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "models_loaded": {
            "incident_classifier": incident_classifier.is_loaded(),
            "threat_analyzer": threat_analyzer.is_loaded(),
            "evidence_processor": evidence_processor.is_loaded(),
            "mitigation_generator": mitigation_generator.is_loaded()
        }
    }

# Classify incident
@app.post("/classify", response_model=ClassificationResult)
async def classify_incident(incident_data: IncidentData):
    """
    Classify a cyber incident using AI models
    """
    try:
        start_time = datetime.utcnow()
        
        # Encrypt sensitive data
        encrypted_description = encryption_utils.encrypt(incident_data.description)
        
        # Classify incident
        classification = await incident_classifier.classify(
            title=incident_data.title,
            description=incident_data.description,
            evidence_files=incident_data.evidence_files,
            location=incident_data.location,
            incident_date=incident_data.incident_date
        )
        
        # Generate threat analysis
        threat_analysis = await threat_analyzer.analyze_threat(
            incident_data=incident_data,
            classification=classification
        )
        
        # Generate mitigation playbook
        mitigation_playbook = await mitigation_generator.generate_playbook(
            incident_type=classification['predicted_type'],
            threat_level=classification['threat_level'],
            threat_analysis=threat_analysis
        )
        
        processing_time = (datetime.utcnow() - start_time).total_seconds()
        
        result = ClassificationResult(
            incident_id=incident_data.user_id,  # Using user_id as incident_id for now
            predicted_type=classification['predicted_type'],
            confidence_score=classification['confidence_score'],
            threat_level=classification['threat_level'],
            risk_score=classification['risk_score'],
            ai_explanation=classification['explanation'],
            recommended_actions=mitigation_playbook['immediate_actions'],
            mitigation_playbook=mitigation_playbook,
            processing_time=processing_time
        )
        
        logger.info(f"Incident classified successfully: {result.incident_id}")
        return result
        
    except Exception as e:
        logger.error(f"Error classifying incident: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Classification failed: {str(e)}")

# Analyze evidence files
@app.post("/analyze-evidence", response_model=List[EvidenceAnalysisResult])
async def analyze_evidence(
    files: List[UploadFile] = File(...),
    incident_id: str = Form(...)
):
    """
    Analyze uploaded evidence files for malicious content
    """
    try:
        results = []
        
        for file in files:
            # Read file content
            content = await file.read()
            
            # Process evidence
            analysis = await evidence_processor.process_file(
                file_name=file.filename,
                file_content=content,
                file_type=file.content_type
            )
            
            result = EvidenceAnalysisResult(
                file_id=f"{incident_id}_{file.filename}",
                file_type=file.content_type,
                malicious_content=analysis['is_malicious'],
                threat_indicators=analysis['threat_indicators'],
                extracted_text=analysis.get('extracted_text'),
                metadata=analysis['metadata'],
                confidence_score=analysis['confidence_score']
            )
            
            results.append(result)
        
        logger.info(f"Evidence analyzed for incident: {incident_id}")
        return results
        
    except Exception as e:
        logger.error(f"Error analyzing evidence: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Evidence analysis failed: {str(e)}")

# Get threat intelligence
@app.get("/threat-intelligence")
async def get_threat_intelligence(
    threat_type: Optional[str] = None,
    location: Optional[str] = None,
    time_range: Optional[int] = 30
):
    """
    Get threat intelligence data
    """
    try:
        intelligence = await threat_analyzer.get_threat_intelligence(
            threat_type=threat_type,
            location=location,
            time_range=time_range
        )
        
        return {
            "threat_intelligence": intelligence,
            "timestamp": datetime.utcnow().isoformat(),
            "parameters": {
                "threat_type": threat_type,
                "location": location,
                "time_range": time_range
            }
        }
        
    except Exception as e:
        logger.error(f"Error getting threat intelligence: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Threat intelligence retrieval failed: {str(e)}")

# Generate real-time alerts
@app.post("/generate-alerts")
async def generate_alerts(incident_data: IncidentData):
    """
    Generate real-time alerts based on incident analysis
    """
    try:
        # Classify incident
        classification = await incident_classifier.classify(
            title=incident_data.title,
            description=incident_data.description,
            evidence_files=incident_data.evidence_files,
            location=incident_data.location,
            incident_date=incident_data.incident_date
        )
        
        # Generate alerts based on threat level
        alerts = []
        
        if classification['threat_level'] in ['high', 'critical']:
            alerts.append({
                "type": "immediate_action_required",
                "priority": "high",
                "message": f"Critical threat detected: {classification['predicted_type']}",
                "actions": ["Contact CERT-Army immediately", "Isolate affected systems"]
            })
        
        if classification['risk_score'] > 0.8:
            alerts.append({
                "type": "high_risk_incident",
                "priority": "medium",
                "message": "High-risk incident requires immediate attention",
                "actions": ["Escalate to senior analyst", "Prepare incident response team"]
            })
        
        # Check for known attack patterns
        threat_analysis = await threat_analyzer.analyze_threat(
            incident_data=incident_data,
            classification=classification
        )
        
        if threat_analysis.get('known_attack_pattern'):
            alerts.append({
                "type": "known_attack_pattern",
                "priority": "high",
                "message": f"Known attack pattern detected: {threat_analysis['attack_pattern']}",
                "actions": ["Apply known mitigation strategies", "Update threat intelligence"]
            })
        
        return {
            "incident_id": incident_data.user_id,
            "alerts": alerts,
            "classification": classification,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error generating alerts: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Alert generation failed: {str(e)}")

# Get model performance metrics
@app.get("/metrics")
async def get_metrics():
    """
    Get AI model performance metrics
    """
    try:
        metrics = {
            "incident_classifier": await incident_classifier.get_metrics(),
            "threat_analyzer": await threat_analyzer.get_metrics(),
            "evidence_processor": await evidence_processor.get_metrics(),
            "mitigation_generator": await mitigation_generator.get_metrics(),
            "timestamp": datetime.utcnow().isoformat()
        }
        
        return metrics
        
    except Exception as e:
        logger.error(f"Error getting metrics: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Metrics retrieval failed: {str(e)}")

# Update model with new data
@app.post("/update-model")
async def update_model(
    model_type: str = Form(...),
    training_data: UploadFile = File(...)
):
    """
    Update AI model with new training data
    """
    try:
        if model_type not in ['classifier', 'analyzer', 'processor', 'generator']:
            raise HTTPException(status_code=400, detail="Invalid model type")
        
        # Read training data
        data = await training_data.read()
        training_data_json = json.loads(data.decode('utf-8'))
        
        # Update appropriate model
        if model_type == 'classifier':
            result = await incident_classifier.update_model(training_data_json)
        elif model_type == 'analyzer':
            result = await threat_analyzer.update_model(training_data_json)
        elif model_type == 'processor':
            result = await evidence_processor.update_model(training_data_json)
        elif model_type == 'generator':
            result = await mitigation_generator.update_model(training_data_json)
        
        return {
            "model_type": model_type,
            "update_status": "success",
            "result": result,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        logger.error(f"Error updating model: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Model update failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
