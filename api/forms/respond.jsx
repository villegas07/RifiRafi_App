import { api } from '../api';

/**
 * @typedef {Object} Answer
 * @property {string} questionId - The ID of the question being answered.
 * @property {string} optionId - The ID of the selected option.
 * @property {number} timeSpent - The time spent answering the question.
 */

/**
 * @typedef {Object} RespondFormParams
 * @property {string} formToken - The token for the form being responded to.
 * @property {Answer[]} answers - The list of answers provided by the respondent.
 */

/**
 * @typedef {Object} RespondFormResponse
 * @property {boolean} success - Whether the response was successfully submitted.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if submission fails.
 */

/**
 * Submits answers to a form.
 * @param {string} id - The ID of the form to respond to.
 * @param {RespondFormParams} params - Parameters for responding to the form.
 * @returns {Promise<RespondFormResponse>} The result of the form response submission.
 */
export async function respondForm(id, { formToken, answers }) {
  try {
    console.log('Enviando respuestas:', { id, formToken, answers });
    const response = await api.post(`/forms/${id}/respond`, { formToken, answers });
    console.log('Respond form - Status:', response.status, 'Data:', response.data);
    
    if (response.status === 201 || response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { 
        success: false, 
        error: response.data?.message || `Error ${response.status}`,
        status: response.status
      };
    }
  } catch (error) {
    console.error('Respond form error:', {
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
