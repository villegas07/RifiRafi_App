import { api } from '../api';

/**
 * @typedef {Object} ChangeFormStatusResponse
 * @property {boolean} success - Whether the status change was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the status change fails.
 */

/**
 * Changes the status of a form.
 * @param {string} id - The ID of the form to change the status of.
 * @returns {Promise<ChangeFormStatusResponse>} The result of the status change.
 */
export async function changeFormStatus(id) {
  try {
    const response = await api.patch(`/forms/${id}`);
    console.log('Change form status:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Change form status error:', error);
    return { success: false, error: error.message };
  }
}
