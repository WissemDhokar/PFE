import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import WelcomePage from './WelcomePage';
import InterviewForm from './InterviewForm';
import InterviewPage from './InterviewPage';
import AdminPage from './AdminPage';
import RegistrationPage from './RegistrationPage';
import DashboardPage from './DashboardPage';
import AdminDashboard from './AdminDashboard';

// Protected Route component
const ProtectedRoute = ({ children, requireAdmin }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!token || !user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [hasSubmittedInterview, setHasSubmittedInterview] = React.useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleInterviewSubmit = () => {
    setHasSubmittedInterview(true);
  };

  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/interview-form" element={<InterviewForm onSubmit={handleInterviewSubmit} />} />
      <Route path="/interview-session" element={<InterviewPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;