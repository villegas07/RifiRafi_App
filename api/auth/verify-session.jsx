import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authApi = axios.create({
  baseURL: 'https://rifi-rafi.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

authApi.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

/**
 * @typedef {Object} VerifySessionResponse
 * @property {boolean} success - Whether the session verification was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the verification fails.
 */

/**
 * Verifies the current user session.
 * @returns {Promise<VerifySessionResponse>} The result of the session verification.
 */
export async function verifySession() {
  try {
    const response = await authApi.get('/auth/verify-session');
    console.log('Verify session:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Verify session error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
