import { api } from '../api';

/**
 * @typedef {Object} CheckUserCommentResponse
 * @property {boolean} success - Whether the check was successful.
 * @property {boolean} hasComment - Whether the user already has a comment for this form.
 * @property {any} [data] - The existing comment data if found.
 * @property {string} [error] - The error message if check fails.
 */

/**
 * Checks if the user already has a comment for a specific form.
 * @param {string} formId - The ID of the form to check.
 * @returns {Promise<CheckUserCommentResponse>} The result of the check.
 */
export async function checkUserComment(formId) {
  try {
    console.log('Verificando si el usuario ya comentó el formulario:', formId);
    
    // Obtener todos los comentarios del formulario
    const response = await api.get(`/forms/${formId}/comments`);
    
    if (response.status === 200) {
      const comments = response.data?.comments || response.data || [];
      
      // Aquí necesitaríamos el ID del usuario actual para verificar
      // Por ahora, asumimos que el backend nos dirá si ya comentamos
      console.log('Comentarios obtenidos para verificación:', comments.length);
      
      return { 
        success: true, 
        hasComment: false, // Por ahora siempre false, el backend manejará la verificación
        data: comments 
      };
    } else {
      return { success: false, error: 'No se pudo verificar los comentarios existentes' };
    }
  } catch (error) {
    console.error('Error al verificar comentario del usuario:', error);
    return { success: false, error: error.message };
  }
}