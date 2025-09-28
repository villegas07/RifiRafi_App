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
    console.log('Enviando comentario:', { id, content, rating });
    const response = await api.post(`/forms/${id}/comments`, { content, rating });
    
    console.log('Respuesta del servidor:', {
      status: response.status,
      success: response.status === 201,
      data: response.data
    });

    if (response.status === 201) {
      return { success: true, data: response.data };
    } else if (response.status === 409 || response.status === 400) {
      // Manejar el caso de comentario duplicado específicamente
      const errorMessage = response.data?.message || response.data?.error || 'Ya has comentado en este formulario';
      if (errorMessage.toLowerCase().includes('comentario') || errorMessage.toLowerCase().includes('comment')) {
        return { success: false, message: 'Ya has realizado un comentario para este formulario. Solo se permite un comentario por usuario.', isDuplicate: true };
      }
      return { success: false, message: errorMessage };
    } else {
      // Manejar otros errores del servidor
      const errorMessage = response.data?.message || response.data?.error || `Error del servidor: ${response.status}`;
      console.error('Error del servidor:', errorMessage, response.data);
      return { success: false, message: errorMessage };
    }
  } catch (error) {
    console.error('Error de red al crear comentario:', error);
    
    // Manejar diferentes tipos de errores
    let errorMessage = 'Error de conexión. Verifica tu internet.';
    
    if (error.response) {
      // Error de respuesta del servidor
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        errorMessage = 'No estás autorizado. Inicia sesión nuevamente.';
      } else if (status === 400) {
        errorMessage = data?.message || 'Datos inválidos. Verifica tu comentario.';
      } else if (status === 500) {
        errorMessage = 'Error interno del servidor. Inténtalo más tarde.';
      } else {
        errorMessage = data?.message || `Error del servidor (${status})`;
      }
    } else if (error.request) {
      // Error de red
      errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    }
    
    return { success: false, message: errorMessage };
  }
}
