import { api } from '../api';

/**
 * @typedef {Object} VerifyEmailResponse
 * @property {boolean} success - Whether the email verification was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the verification fails.
 */

/**
 * Verifies the user's email using the provided token.
 * @param {string} token - The token used for email verification.
 * @returns {Promise<VerifyEmailResponse>} The result of the email verification.
 */
export async function verifyEmail(token) {
  try {
    const response = await api.post('/auth/verify-email', { token });
    console.log('Verify email:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Verify email error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
