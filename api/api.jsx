import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // 1. Importar AsyncStorage
import { refresh } from './auth/refresh';
import { verifySession } from './auth/verify-session';

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onRefreshed(newToken) {
  refreshSubscribers.forEach((cb) => {
    try {
      cb(newToken);
    } catch (e) {
      console.error('callback error', e);
    }
  });
  refreshSubscribers = [];
}

export const api = axios.create({
  baseURL: 'https://rifi-rafi.onrender.com/api', // 2. Base URL corregida
  validateStatus: function (status) {
    return true;
  },
  headers: {
    'x-lang': 'es',
    'Content-Type': 'application/json',
  },
});

// 3. Interceptor de request con AsyncStorage
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

// 4. Interceptor de response con AsyncStorage
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Solo intentar refresh para errores 401 y si no es una ruta de auth
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/auth/')) {
      
      originalRequest._retry = true;

      try {
        // Si ya se está refrescando, esperar
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken) => {
              if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                resolve(api(originalRequest));
              } else {
                reject(error);
              }
            });
          });
        }

        isRefreshing = true;

        // Verificar si tenemos refresh token
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) {
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          return Promise.reject(error);
        }

        // Intentar refresh
        const refreshResult = await refresh();
        if (refreshResult.success) {
          const newAccessToken = await AsyncStorage.getItem('accessToken');
          onRefreshed(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          // Refresh falló, limpiar tokens
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          onRefreshed(null);
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Error en el proceso de refresh
        await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
        onRefreshed(null);
        console.error('Error during token refresh:', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);