import { api } from '../api';

/**
 * @typedef {Object} SetCompanyRoleResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Sets the company role for a user.
 * @param {string} identifier - The identifier of the user (e.g., 'me', user ID, or email).
 * @returns {Promise<SetCompanyRoleResponse>} The result of the request.
 */
export async function setCompanyRole(identifier) {
  try {
    const response = await api.patch(`/users/${identifier}/set-company`);
    console.log('Set company role:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Set company role error:', error);
    return { success: false, error: error.message };
  }
}
