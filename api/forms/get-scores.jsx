import { api } from '../api';

/**
 * Obtiene los puntajes de un formulario específico
 * @param {string} formId - ID del formulario
 * @returns {Promise<Object>} Respuesta con los puntajes del formulario
 */
export async function getFormScores(formId) {
  try {
    const response = await api.get(`/forms/form-scores/${formId}`);
    
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { 
        success: false, 
        error: response.data?.message || `Error ${response.status}`
      };
    }
  } catch (error) {
    console.error('Get form scores error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return { 
      success: false, 
      error: error.response?.data?.message || error.message || 'Error de conexión'
    };
  }
}