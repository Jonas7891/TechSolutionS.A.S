import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LoginPage } from './features/login';
import { useAuth } from './hooks/useAuth';
import './styles/global.css';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1>TechSolutions - Gestión de Eventos Académicos</h1>
          <div className="header-user">
            <span>Usuario: {user?.name}</span>
            <button className="logout-button" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <main>
        <p>Bienvenido al panel de administración de eventos académicos.</p>
        <div className="dashboard-content">
          <h2>Próximas funcionalidades:</h2>
          <ul>
            <li>📅 Gestión de eventos académicos</li>
            <li>👥 Administración de usuarios</li>
            <li>📊 Reportes y estadísticas</li>
            <li>🎯 Asignación de recursos</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
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
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
