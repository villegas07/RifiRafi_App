import React, { createContext, useState, useEffect } from 'react';
import { api } from '../api/axiosConfig';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión al iniciar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get('/api/auth/verify-session');
        if (response.status === 200) {
          setUser(response.data.user); // Ajusta según la respuesta real
        }
      } catch (error) {
        console.log('No hay sesión activa:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      const response = await api.post('/api/auth/login', credentials);
      setUser(response.data.user); // Ajusta según la respuesta real
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al iniciar sesión' 
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await api.post('/api/auth/logout');
      setUser(null);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al cerrar sesión' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};