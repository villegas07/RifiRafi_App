import { api } from '../api';

/**
 * @typedef {Object} UpdateFormPictureResponse
 * @property {boolean} success - Whether the update was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the update fails.
 */

/**
 * Updates the form's picture.
 * @param {string} id - The identifier of the form whose picture is to be updated.
 * @param {File} pictureFile - The new picture file.
 * @returns {Promise<UpdateFormPictureResponse>} The result of the update request.
 */
export async function updateFormPicture(id, pictureFile) {
  try {
    const formData = new FormData();
    formData.append('picture', pictureFile);

    const response = await api.patch(`/forms/${id}/picture`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Update form picture:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Update form picture error:', error);
    return { success: false, error: error.message };
  }
}
