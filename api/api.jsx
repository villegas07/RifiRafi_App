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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              resolve(api(originalRequest));
            });
          });
        }

        isRefreshing = true;

        const isLoggedIn = await verifySession();
        if (isLoggedIn.success) return Promise.reject(error);

        const refreshResult = await refresh();
        if (refreshResult.success) {
          // 5. Usar AsyncStorage para obtener el token
          const newAccessToken = await AsyncStorage.getItem('accessToken');
          onRefreshed(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } else {
          // 6. Eliminar tokens con AsyncStorage
          await AsyncStorage.removeItem('accessToken');
          await AsyncStorage.removeItem('refreshToken');
        }
      } catch (refreshError) {
        // 7. Manejo de errores con AsyncStorage
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        console.error('Error during token refresh:', refreshError);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);