import React, { useEffect, useState, useContext } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';

const SessionManager = () => {
  const { forceRefresh, logout } = useContext(AuthContext);
  const [sessionWarningShown, setSessionWarningShown] = useState(false);

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (accessToken) {
          // Decodificar JWT para obtener tiempo de expiración
          const payload = JSON.parse(atob(accessToken.split('.')[1]));
          const currentTime = Date.now() / 1000;
          const timeUntilExpiry = payload.exp - currentTime;

          // Si quedan menos de 2 minutos, mostrar advertencia
          if (timeUntilExpiry < 120 && timeUntilExpiry > 0 && !sessionWarningShown) {
            setSessionWarningShown(true);
            Alert.alert(
              'Sesión por expirar',
              '¿Deseas mantener tu sesión activa?',
              [
                {
                  text: 'Cerrar sesión',
                  onPress: () => logout(),
                  style: 'destructive'
                },
                {
                  text: 'Mantener activa',
                  onPress: async () => {
                    const success = await forceRefresh();
                    if (!success) {
                      Alert.alert('Error', 'No se pudo renovar la sesión');
                      logout();
                    }
                    setSessionWarningShown(false);
                  }
                }
              ]
            );
          }
        }
      } catch (error) {
        console.error('Error verificando expiración del token:', error);
      }
    };

    // Verificar cada minuto
    const interval = setInterval(checkTokenExpiration, 60000);
    
    return () => clearInterval(interval);
  }, [forceRefresh, logout, sessionWarningShown]);

  return null; // Componente invisible
};

export default SessionManager;