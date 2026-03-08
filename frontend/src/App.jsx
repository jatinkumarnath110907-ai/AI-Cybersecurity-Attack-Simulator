import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layout & Context
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import NetworkScannerPage from './pages/NetworkScannerPage';
import AttackSimulatorPage from './pages/AttackSimulatorPage';
import SecurityReportsPage from './pages/SecurityReportsPage';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  return user ? (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/scanner" element={<PrivateRoute><NetworkScannerPage /></PrivateRoute>} />
          <Route path="/simulator" element={<PrivateRoute><AttackSimulatorPage /></PrivateRoute>} />
          <Route path="/reports" element={<PrivateRoute><SecurityReportsPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
