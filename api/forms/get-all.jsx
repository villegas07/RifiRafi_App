import { api } from '../api';

/**
 * @typedef {'ASC'|'DESC'} SortOrder
 */

/**
 * @typedef {'id'|'title'|'description'|'isEnabled'|'wasCreatedByCompany'|'createdAt'|'updatedAt'} FormOrderBy
 */

/**
 * @typedef {Object} GetAllFormsParams
 * @property {SortOrder} [order='ASC'] - The order of the forms.
 * @property {FormOrderBy} [orderBy='createdAt'] - The field to order by.
 * @property {number} [page=1] - Page number.
 * @property {number} [limit=10] - Forms per page.
 */

/**
 * @typedef {Object} GetAllFormsResponse
 * @property {boolean} success - Whether the request was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if the request fails.
 * @property {number} [status] - HTTP status code.
 */

/**
 * Retrieves all forms with optional pagination and ordering.
 * @param {GetAllFormsParams} params - Parameters for retrieving forms.
 * @returns {Promise<GetAllFormsResponse>} The result of the request.
 */
export async function getAllForms({ order = 'ASC', orderBy = 'createdAt', page = 1, limit = 10 }) {
  try {
    const response = await api.get('/forms', { 
      params: { order, orderBy, page, limit },
      timeout: 10000 // 10 segundos de timeout
    });
    
    console.log('Get all forms - Status:', response.status);
    console.log('Get all forms - Data structure:', JSON.stringify(response.data, null, 2));
    
    if (response.status === 200) {
      return { 
        success: true, 
        data: response.data,
        status: response.status
      };
    } else {
      console.warn('Get all forms - Non-200 status:', response.status, response.data);
      return { 
        success: false, 
        error: response.data?.message || `Error ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    console.error('Get all forms error:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.code === 'ECONNABORTED') {
      return { success: false, error: 'Tiempo de espera agotado. Verifica tu conexión.' };
    }
    
    if (error.response?.status === 401) {
      return { success: false, error: 'Sesión expirada. Inicia sesión nuevamente.' };
    }
    
    if (error.response?.status >= 500) {
      return { success: false, error: 'Error del servidor. Intenta más tarde.' };
    }
    
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || 'Error desconocido'
    };
  }
}
