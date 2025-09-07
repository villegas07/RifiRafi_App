import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api';

/**
 * @typedef {Object} LoginParams
 * @property {string} identifier - The user's identifier (e.g., email or username).
 * @property {string} password - The user's password.
 */

/**
 * @typedef {Object} LoginResponse
 * @property {boolean} success - Whether the login was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the login fails.
 */

/**
 * Logs in a user with the provided credentials.
 * @param {LoginParams} params - The login parameters containing identifier and password.
 * @returns {Promise<LoginResponse>} The result of the login attempt.
 */
export async function login({ identifier, password }) {
  try {
    const response = await api.post('/auth/login', { identifier, password });

    if (response.data.accessToken && response.data.refreshToken) {
      await AsyncStorage.setItem('accessToken', response.data.accessToken);
      await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
    }

    console.log('LLogin:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
