import React, { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
<<<<<<< HEAD
      // Simular llamada al backend (delay de 1 segundo)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validaciones básicas
      if (!email || !password) {
        throw new Error('El email y la contraseña son requeridos');
      }

      if (!email.includes('@')) {
        throw new Error('Por favor ingrese un email válido');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Simular respuesta del servidor
      const userData = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'admin',
        token: `token_${Date.now()}`
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
=======
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el login');
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
>>>>>>> origin/qa
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem('user');
  }, []);

  const register = useCallback(async (email, password, confirmPassword) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error en el registro');
      }

      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    isLoading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
