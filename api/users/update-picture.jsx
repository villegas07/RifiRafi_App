import { api } from '../api';

/**
 * @typedef {Object} UpdateUserPictureResponse
 * @property {boolean} success - Whether the deletion was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the deletion fails.
 */

/**
 * Deletes the user's profile picture.
 * @param {string} identifier - The identifier of the user whose picture is to be deleted.
 * @returns {Promise<UpdateUserPictureResponse>} The result of the deletion request.
 */
export async function updateUserPicture(identifier, pictureFile) {
  try {
    console.log('Updating picture for user:', identifier);
    console.log('Picture file:', pictureFile);
    
    const formData = new FormData();
    formData.append('picture', pictureFile);

    const response = await api.patch(`/users/${identifier}/picture`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Update user picture response:', {
      status: response.status,
      success: response.status === 200,
      data: response.data
    });
    
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { 
        success: false, 
        error: response.data?.message || `Error ${response.status}` 
      };
    }
  } catch (error) {
    console.error('Update user picture error:', error);
    console.error('Error response:', error.response?.data);
    return { 
      success: false, 
      error: error.response?.data?.message || error.message 
    };
  }
}
