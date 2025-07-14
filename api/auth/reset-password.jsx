import { api } from '../api';

/**
 * @typedef {Object} ResetPasswordParams
 * @property {string} token - The reset password token.
 * @property {string} newPassword - The new password to set.
 */

/**
 * @typedef {Object} ResetPasswordResponse
 * @property {boolean} success - Whether the reset password request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Resets the password using the provided token and new password.
 * @param {ResetPasswordParams} params - The parameters for resetting the password.
 * @returns {Promise<ResetPasswordResponse>} The result of the reset password request.
 */
export async function resetPassword({ token, newPassword }) {
  try {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    console.log('Reset password:', !!response.data.success, response.status, response.data);
    return { success: !!response.data.success, data: response.data };
  } catch (error) {
    console.error('Reset password error:', error);
    return { success: false, error: error.message || 'An error occurred' };
  }
}
