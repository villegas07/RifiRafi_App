import { api } from '../api';

/**
 * @typedef {Object} CreateFormCommentParams
 * @property {string} content - The content of the form comment to create.
 * @property {1|2|3|4|5} rating - The rating of the form comment.
 */

/**
 * @typedef {Object} CreateFormCommentResponse
 * @property {boolean} success - Whether the creation was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if creation fails.
 */

/**
 * Creates a new form comment with the specified content.
 * @param {string} id - The ID of the form to create the comment for.
 * @param {CreateFormCommentParams} params - Parameters for creating the form comment.
 * @returns {Promise<CreateFormCommentResponse>} The result of the form comment creation.
 */
export async function createFormComment(id, { content, rating }) {
  try {
    const response = await api.post(`/forms/${id}/comments`, { content, rating });
    console.log('Create form comment:', response.status === 201, response.status, response.data);
    return { success: response.status === 201, data: response.data };
  } catch (error) {
    console.error('Create form comment error:', error);
    return { success: false, error: error.message };
  }
}
