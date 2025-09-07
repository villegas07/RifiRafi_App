import { api } from '../api';

/**
 * @typedef {'ASC'|'DESC'} SortOrder
 */

/**
 * @typedef {'id'|'rating'|'createdAt'|'updatedAt'} FormCommentOrderBy
 */

/**
 * @typedef {Object} GetAllFormCommentsParams
 * @property {SortOrder} [order='ASC'] - The order of the comments.
 * @property {FormCommentOrderBy} [orderBy='createdAt'] - The field to order by.
 * @property {number} [page=1] - Page number.
 * @property {number} [limit=10] - Comments per page.
 */

/**
 * @typedef {Object} GetAllFormCommentsResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 */

/**
 * Retrieves all comments for a form with optional pagination and ordering.
 * @param {string} id - The ID of the form to get comments for.
 * @param {GetAllFormCommentsParams} params - Parameters for retrieving form comments.
 * @returns {Promise<GetAllFormCommentsResponse>} The result of the request.
 */
export async function getAllFormComments(id, { order = 'ASC', orderBy = 'createdAt', page = 1, limit = 10 }) {
  try {
    const response = await api.get(`/forms/${id}/comments`, { params: { order, orderBy, page, limit } });
    console.log('Get all form comments:', response.status === 200, response.status, response.data);
    return { success: response.status === 200, data: response.data };
  } catch (error) {
    console.error('Get all form comments error:', error);
    return { success: false, error: error.message };
  }
}
