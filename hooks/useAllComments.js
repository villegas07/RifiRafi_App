import { useState, useEffect } from 'react';
import { getAllForms } from '../api/forms/get-all';
import { getAllFormComments } from '../api/forms/get-comments';

export const useAllComments = (params = {}) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState(null);

    const defaultParams = {
        maxCommentsPerForm: 50,
        maxForms: 20,
        ...params
    };

    const fetchAllComments = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            setError(null);

            // Primero obtener todos los formularios
            const formsResponse = await getAllForms({ 
                limit: defaultParams.maxForms,
                order: 'DESC',
                orderBy: 'createdAt'
            });

            if (!formsResponse.success) {
                throw new Error(formsResponse.error || 'Error al obtener formularios');
            }

            let formsData = [];
            if (formsResponse.data?.forms) {
                formsData = formsResponse.data.forms;
            } else if (Array.isArray(formsResponse.data)) {
                formsData = formsResponse.data;
            } else if (formsResponse.data?.data) {
                formsData = formsResponse.data.data;
            }

            // Obtener comentarios para cada formulario
            const allCommentsPromises = formsData
                .filter(form => form && form.id && form.isEnabled !== false)
                .map(async (form) => {
                    try {
                        const commentsResponse = await getAllFormComments(form.id, {
                            order: 'DESC',
                            orderBy: 'createdAt',
                            limit: defaultParams.maxCommentsPerForm
                        });

                        if (commentsResponse.success) {
                            let commentsData = [];
                            
                            if (commentsResponse.data?.comments) {
                                commentsData = commentsResponse.data.comments;
                            } else if (Array.isArray(commentsResponse.data)) {
                                commentsData = commentsResponse.data;
                            } else if (commentsResponse.data?.data) {
                                commentsData = commentsResponse.data.data;
                            }

                            return commentsData.map(comment => ({
                                ...comment,
                                formId: form.id,
                                formTitle: form.title || form.name || 'Trivia',
                                formData: form
                            }));
                        }
                        return [];
                    } catch (error) {
                        console.warn(`Error fetching comments for form ${form.id}:`, error);
                        return [];
                    }
                });

            const allCommentsArrays = await Promise.all(allCommentsPromises);
            const flatComments = allCommentsArrays.flat();
            
            // Ordenar todos los comentarios por fecha de creación (más recientes primero)
            flatComments.sort((a, b) => {
                const dateA = new Date(a.createdAt || a.created_at);
                const dateB = new Date(b.createdAt || b.created_at);
                return dateB - dateA;
            });

            setComments(flatComments);
            setError(null);

        } catch (error) {
            console.error('Error fetching all comments:', error);
            setError(error.message || 'Error de conexión');
            setComments([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const refresh = () => fetchAllComments(true);
    const retry = () => fetchAllComments(false);

    useEffect(() => {
        fetchAllComments();
    }, []);

    return {
        comments,
        loading,
        refreshing,
        error,
        refresh,
        retry
    };
};