import React, { createContext, useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login as apiLogin } from '../api/auth/login';
import { verifySession } from '../api/auth/verify-session';
import { refresh } from '../api/auth/refresh';
import { useTokenRefresh } from '../hooks/useTokenRefresh';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshIntervalRef = useRef(null);
  
  // Hook para manejar refresh automático
  const { forceRefresh } = useTokenRefresh(async () => {
    console.log('Sesión expirada, cerrando sesión automáticamente');
    await logout();
  });

  // Configurar refresh automático
  const setupAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
    }
    
    // Refresh cada 14 minutos (tokens suelen expirar en 15 min)
    refreshIntervalRef.current = setInterval(async () => {
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const result = await refresh();
          if (!result.success) {
            console.log('Auto-refresh falló, cerrando sesión');
            await logout();
          }
        }
      } catch (error) {
        console.error('Error en auto-refresh:', error);
      }
    }, 14 * 60 * 1000); // 14 minutos
  };

  // Limpiar refresh automático
  const clearAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };

  // Verificar sesión al iniciar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        
        if (accessToken && refreshToken) {
          const sessionResult = await verifySession();
          if (sessionResult.success) {
            setUser(sessionResult.data.user);
            setupAutoRefresh();
          } else {
            // Intentar refresh si la sesión no es válida
            const refreshResult = await refresh();
            if (refreshResult.success) {
              const newSessionResult = await verifySession();
              if (newSessionResult.success) {
                setUser(newSessionResult.data.user);
                setupAutoRefresh();
              }
            } else {
              // Limpiar tokens inválidos
              await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            }
          }
        }
      } catch (error) {
        console.log('No hay sesión activa:', error);
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
    
    return () => clearAutoRefresh();
  }, []);

  // Login
  const login = async (credentials) => {
    try {
      const result = await apiLogin(credentials);
      if (result.success) {
        setUser(result.data.user);
        setupAutoRefresh();
      }
      return result;
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al iniciar sesión' 
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      clearAutoRefresh();
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      setUser(null);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Error al cerrar sesión' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, forceRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};