import { api } from '../api';

/**
 * @typedef {Object} DeleteUserResponse
 * @property {boolean} success - Whether the deletion was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the deletion fails.
 */

/**
 * Deletes a user by their identifier.
 * @param {string} identifier - The identifier of the user to delete (e.g. me, user ID or email).
 * @returns {Promise<DeleteUserResponse>} The result of the deletion request.
 */
export async function deleteUser(identifier) {
  try {
    const response = await api.delete(`/users/${identifier}`);
    console.log('Delete user:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Delete user error:', error);
    return { success: false, error: error.message };
  }
}
