import { useState, useEffect } from 'react';
import { getAllForms } from '../api/forms/get-all';

export const useForms = (initialParams = {}) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const params = {
    limit: 50,
    page: 1,
    order: 'DESC',
    orderBy: 'createdAt',
    ...initialParams
  };

  const fetchForms = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);

      const response = await getAllForms(params);
      
      if (response.success) {
        let formsData = [];
        
        if (response.data?.forms) {
          formsData = response.data.forms;
        } else if (Array.isArray(response.data)) {
          formsData = response.data;
        } else if (response.data?.data) {
          formsData = response.data.data;
        }

        const validForms = formsData
          .filter(form => form && form.id && form.isEnabled !== false)
          .map(form => ({
            id: form.id.toString(),
            title: form.title || form.name || 'Trivia sin título',
            description: form.description || '',
            questions: typeof form.questions === 'object' ? (form.questions?.length || 5) : (form.questions || 5),
            startDate: form.startDate,
            expirationDate: form.expirationDate,
            endDate: form.endDate,
            category: typeof form.category === 'object' ? (form.category?.name || '') : (form.category || ''),
            difficulty: typeof form.difficulty === 'object' ? (form.difficulty?.name || '') : (form.difficulty || ''),
            rawData: form
          }));

        setForms(validForms);
        setError(null);
      } else {
        setError(response.error || 'Error al cargar los formularios');
        setForms([]);
      }
    } catch (error) {
      console.error('Error in useForms:', error);
      setError('Error de conexión. Verifica tu internet.');
      setForms([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refresh = () => fetchForms(true);
  const retry = () => fetchForms(false);

  useEffect(() => {
    fetchForms();
  }, []);

  return {
    forms,
    loading,
    refreshing,
    error,
    refresh,
    retry
  };
};