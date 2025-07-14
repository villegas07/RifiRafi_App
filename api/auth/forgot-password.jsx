import { api } from '../api';

/**
 * @typedef {Object} ForgotPasswordResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Sends a forgot password request for the specified email.
 * @param {string} email - The email address to send the forgot password request to.
 * @returns {Promise<ForgotPasswordResponse>} The result of the forgot password request.
 */
export async function forgotPassword(email) {
  try {
    const response = await api.post('/auth/forgot-password', { email });
    console.log('Forgot password:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Forgot password error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
