import { api } from '../api';

/**
 * @typedef {Object} DeleteFormPictureResponse
 * @property {boolean} success - Whether the deletion was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the deletion fails.
 */

/**
 * Deletes the form's picture.
 * @param {string} id - The identifier of the form whose picture is to be deleted.
 * @returns {Promise<DeleteFormPictureResponse>} The result of the deletion request.
 */
export async function deleteFormPicture(id) {
  try {
    const response = await api.delete(`/forms/${id}/picture`);
    console.log('Delete form picture:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Delete form picture error:', error);
    return { success: false, error: error.message };
  }
}
