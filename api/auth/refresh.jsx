import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const authApi = axios.create({
  baseURL: 'https://rifi-rafi.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

/**
 * @typedef {Object} RefreshResponse
 * @property {boolean} success - Whether the refresh was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the refresh fails.
 */

/**
 * Refreshes the authentication tokens using the stored refresh token.
 * @returns {Promise<RefreshResponse>} The result of the refresh attempt.
 */
export async function refresh() {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    if (!token) return { success: false, error: 'No refresh token found' };

    const response = await authApi.post('/auth/refresh', { token });

    if (response.data.accessToken && response.data.refreshToken) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }

    console.log('Refresh:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Refresh error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
