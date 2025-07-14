import { api } from '../api';

/**
 * @typedef {Object} QuestionOption
 * @property {string} content - The text of the option.
 * @property {boolean} isCorrect - Whether this option is correct.
 */

/**
 * @typedef {Object} Question
 * @property {string} content - The content of the question.
 * @property {string} categoryId - The category ID associated with the question.
 * @property {QuestionOption[]} options - List of options for this question.
 */

/**
 * @typedef {Object} CreateFormParams
 * @property {string} title - The title of the form.
 * @property {string} description - The description of the form.
 * @property {boolean} isEnabled - Indicates if the form is enabled.
 * @property {Question[]} questions - The list of questions to include in the form.
 */

/**
 * @typedef {Object} CreateFormResponse
 * @property {boolean} success - Whether the creation was successful.
 * @property {any} [data] - The data returned from the server if successful.
 * @property {string} [error] - The error message if creation fails.
 */

/**
 * Creates a new form with the specified details.
 * @param {CreateFormParams} params - Parameters for creating the form.
 * @returns {Promise<CreateFormResponse>} The result of the form creation.
 */
export async function createForm({ title, description, isEnabled, questions }) {
  try {
    const response = await api.post(`/forms`, { title, description, isEnabled, questions });
    console.log('Create form:', response.status === 201, response.status, response.data);
    return { success: response.status === 201, data: response.data };
  } catch (error) {
    console.error('Create form error:', error);
    return { success: false, error: error.message };
  }
}
