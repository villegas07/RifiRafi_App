import { api } from '../api';

/**
 * @typedef {Object} DeleteUserPictureResponse
 * @property {boolean} success - Whether the deletion was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the deletion fails.
 */

/**
 * Deletes the user's profile picture.
 * @param {string} identifier - The identifier of the user whose picture is to be deleted.
 * @returns {Promise<DeleteUserPictureResponse>} The result of the deletion request.
 */
export async function deleteUserPicture(identifier) {
  try {
    const response = await api.delete(`/users/${identifier}/picture`);
    console.log('Delete user picture:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Delete user picture error:', error);
    return { success: false, error: error.message };
  }
}
