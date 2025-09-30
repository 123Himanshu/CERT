import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DemoGovernmentLogin from './components/DemoGovernmentLogin';
import GovernmentCertLogin from './components/GovernmentCertLogin';
import ComprehensiveDefenceDashboard from './components/ComprehensiveDefenceDashboard';
import EnhancedCertArmyDashboard from './components/EnhancedCertArmyDashboard';
import HomePage from './pages/HomePage';
import { LanguageProvider } from './contexts/LanguageContext';
import './App.css';

function App() {
  const [defenceAuthenticated, setDefenceAuthenticated] = useState(false);
  const [certArmyAuthenticated, setCertArmyAuthenticated] = useState(false);

  const handleDefenceLogin = () => {
    setDefenceAuthenticated(true);
  };

  const handleCertArmyLogin = () => {
    setCertArmyAuthenticated(true);
  };

  const handleDefenceLogout = () => {
    setDefenceAuthenticated(false);
  };

  const handleCertArmyLogout = () => {
    setCertArmyAuthenticated(false);
  };

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          
          {/* Defence Personnel Routes */}
          <Route 
            path="/login" 
            element={
              defenceAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <DemoGovernmentLogin onLogin={handleDefenceLogin} />
              )
            } 
          />
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