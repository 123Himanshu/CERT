import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DemoGovernmentLogin from './components/DemoGovernmentLogin';
import GovernmentCertLogin from './components/GovernmentCertLogin';
import ComprehensiveDefenceDashboard from './components/ComprehensiveDefenceDashboard';
import EnhancedCertArmyDashboard from './components/EnhancedCertArmyDashboard';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TrainingPage from './pages/TrainingPage';
import CyberAwarenessPage from './pages/CyberAwarenessPage';
import ResourcesPage from './pages/ResourcesPage';
import ContactPage from './pages/ContactPage';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  const [defenceAuthenticated, setDefenceAuthenticated] = useState(() => {
    return localStorage.getItem('defenceAuthenticated') === 'true';
  });
  const [certArmyAuthenticated, setCertArmyAuthenticated] = useState(() => {
    return localStorage.getItem('certArmyAuthenticated') === 'true';
  });

  const handleDefenceLogin = () => {
    setDefenceAuthenticated(true);
    localStorage.setItem('defenceAuthenticated', 'true');
  };

  const handleCertArmyLogin = () => {
    setCertArmyAuthenticated(true);
    localStorage.setItem('certArmyAuthenticated', 'true');
  };

  const handleDefenceLogout = () => {
    setDefenceAuthenticated(false);
    localStorage.removeItem('defenceAuthenticated');
    localStorage.removeItem('userType');
    localStorage.removeItem('userInfo');
  };

  const handleCertArmyLogout = () => {
    setCertArmyAuthenticated(false);
    localStorage.removeItem('certArmyAuthenticated');
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/cyber-awareness" element={<CyberAwarenessPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Defence Personnel Routes */}
          <Route 
            path="/dashboard" 
            element={
              defenceAuthenticated ? (
                <ComprehensiveDefenceDashboard onLogout={handleDefenceLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          
          {/* Legacy Login Route */}
          <Route 
            path="/old-login" 
            element={
              defenceAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <DemoGovernmentLogin onLogin={handleDefenceLogin} />
              )
            } 
          />
          
          {/* CERT Army Routes */}
          <Route 
            path="/cert-army" 
            element={
              certArmyAuthenticated ? (
                <Navigate to="/cert-army/dashboard" replace />
              ) : (
                <GovernmentCertLogin onLogin={handleCertArmyLogin} />
              )
            } 
          />
          <Route 
            path="/cert-army/dashboard" 
            element={
              certArmyAuthenticated ? (
                <EnhancedCertArmyDashboard onLogout={handleCertArmyLogout} />
              ) : (
                <Navigate to="/cert-army" replace />
              )
            } 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;