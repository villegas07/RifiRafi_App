import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refresh } from '../api/auth/refresh';
import { verifySession } from '../api/auth/verify-session';

export const useTokenRefresh = (onSessionExpired) => {
  const appStateRef = useRef(AppState.currentState);
  const lastActiveRef = useRef(Date.now());

  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // App volvió al foreground
        const timeSinceLastActive = Date.now() - lastActiveRef.current;
        const fiveMinutes = 5 * 60 * 1000;

        if (timeSinceLastActive > fiveMinutes) {
          // Si estuvo inactivo más de 5 minutos, verificar sesión
          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
              const sessionResult = await verifySession();
              if (!sessionResult.success) {
                // Intentar refresh
                const refreshResult = await refresh();
                if (!refreshResult.success) {
                  onSessionExpired?.();
                }
              }
            }
          } catch (error) {
            console.error('Error verificando sesión:', error);
            onSessionExpired?.();
          }
        }
        lastActiveRef.current = Date.now();
      }
      
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        lastActiveRef.current = Date.now();
      }
      
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => subscription?.remove();
  }, [onSessionExpired]);

  // Función para forzar refresh manual
  const forceRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (refreshToken) {
        const result = await refresh();
        return result.success;
      }
      return false;
    } catch (error) {
      console.error('Error en refresh manual:', error);
      return false;
    }
  };

  return { forceRefresh };
};