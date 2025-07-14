import { api } from '../api';

/**
 * @typedef {Object} UpdateUserParams
 * @property {string} [username] - The new username for the user.
 * @property {string} [displayName] - The new display name for the user.
 */

/**
 * @typedef {Object} UpdateUserResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Updates a user's information.
 * @param {string} identifier - The identifier of the user (e.g., 'me', user ID, or email).
 * @param {UpdateUserParams} params - The parameters to update the user with.
 * @returns {Promise<UpdateUserResponse>} The result of the request.
 */
export async function updateUser(identifier, { username, displayName }) {
  try {
    const response = await api.put(`/users/${identifier}`, { username, displayName });
    console.log('Update user:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Update user error:', error);
    return { success: false, error: error.message };
  }
}
