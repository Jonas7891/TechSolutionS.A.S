import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import './login.css';

export function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const { user } = useAuth();

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>TechSolutions</h1>
          <p className="subtitle">Gestión de Eventos Académicos</p>
        </div>

        {user ? (
          <div className="welcome-section">
            <div className="success-message">
              ✅ Sesión iniciada correctamente
            </div>
            <div className="user-info">
              <h2>Bienvenido, {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Rol: {user.role}</p>
            </div>
          </div>
        ) : (
          <>
            <div className="form-container">
              {isRegister ? (
                <>
                  <h2>Crear Cuenta</h2>
                  <RegisterForm
                    onSuccess={() => setIsRegister(false)}
                  />
                </>
              ) : (
                <>
                  <h2>Iniciar Sesión</h2>
                  <LoginForm
                    onSuccess={() => {
                      // La navegación se manejará desde el App
                    }}
                  />
                </>
              )}
            </div>

            <div className="toggle-form">
              <p>
                {isRegister
                  ? '¿Ya tienes cuenta?'
                  : '¿No tienes cuenta?'}
              </p>
              <button
                className="toggle-button"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Inicia Sesión' : 'Regístrate'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
