import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BackgroundSecon from '../components/BackgroundSecon';
import { createFormComment } from '../api/forms/create-comment';
import { getAllFormComments } from '../api/forms/get-comments';
import { useUser } from '../hooks/useUser';

export default function CommentsScreen({ navigation, route }) {
    const { formId, formTitle } = route.params || {};
    const { user } = useUser();
    
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (formId) {
            fetchComments();
        }
    }, [formId]);

    const fetchComments = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }

            const response = await getAllFormComments(formId, {
                order: 'DESC',
                orderBy: 'createdAt',
                limit: 50
            });

            if (response.success) {
                let commentsData = [];
                
                if (response.data?.comments) {
                    commentsData = response.data.comments;
                } else if (Array.isArray(response.data)) {
                    commentsData = response.data;
                } else if (response.data?.data) {
                    commentsData = response.data.data;
                }

                setComments(commentsData);
            } else {
                Alert.alert('Error', response.error || 'No se pudieron cargar los comentarios');
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            Alert.alert('Error', 'Error de conexión al cargar comentarios');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleSubmitComment = async () => {
        if (!comment.trim()) {
            Alert.alert('Error', 'Por favor escribe un comentario');
            return;
        }

        setSubmitting(true);
        try {
            const response = await createFormComment(formId, {
                content: comment.trim(),
                rating: rating
            });

            if (response.success) {
                Alert.alert('¡Éxito!', 'Tu comentario ha sido publicado', [
                    {
                        text: 'OK',
                        onPress: () => {
                            setComment('');
                            setRating(5);
                            fetchComments();
                        }
                    }
                ]);
            } else {
                Alert.alert('Error', response.error || 'No se pudo publicar el comentario');
            }
        } catch (error) {
            console.error('Error submitting comment:', error);
            Alert.alert('Error', 'Error de conexión al enviar comentario');
        } finally {
            setSubmitting(false);
        }
    };

    const renderStarRating = () => {
        return (
            <View style={styles.ratingContainer}>
                <Text style={styles.ratingLabel}>Calificación:</Text>
                <View style={styles.starsContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <TouchableOpacity
                            key={star}
                            onPress={() => setRating(star)}
                            style={styles.starButton}
                        >
                            <Ionicons
                                name={star <= rating ? 'star' : 'star-outline'}
                                size={24}
                                color="#FFD700"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.ratingText}>{rating}/5</Text>
            </View>
        );
    };

    const renderCommentItem = ({ item }) => {
        const formatDate = (dateString) => {
            try {
                return new Date(dateString).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch {
                return 'Fecha no disponible';
            }
        };

        return (
            <View style={styles.commentItem}>
                <View style={styles.commentHeader}>
                    <View style={styles.userInfo}>
                        <Ionicons name="person-circle" size={24} color="#666" />
                        <Text style={styles.userName}>
                            {item.user?.name || item.user?.firstName || 'Usuario'}
                        </Text>
                    </View>
                    <View style={styles.commentRating}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Ionicons
                                key={star}
                                name={star <= (item.rating || 5) ? 'star' : 'star-outline'}
                                size={12}
                                color="#FFD700"
                            />
                        ))}
                    </View>
                </View>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentDate}>
                    {formatDate(item.createdAt || item.created_at)}
                </Text>
            </View>
        );
    };

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>Aún no hay comentarios</Text>
            <Text style={styles.emptySubtext}>¡Sé el primero en comentar!</Text>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <BackgroundSecon />
            
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Comentarios</Text>
                <View style={styles.placeholder} />
            </View>

            {formTitle && (
                <Text style={styles.formTitle}>{formTitle}</Text>
            )}

            {/* Lista de comentarios */}
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                style={styles.commentsList}
                contentContainerStyle={styles.commentsContent}
                ListEmptyComponent={!loading ? renderEmptyList : null}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => fetchComments(true)}
                        colors={['#4CAF50']}
                        tintColor="#4CAF50"
                    />
                }
                ListFooterComponent={
                    loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#4CAF50" />
                            <Text style={styles.loadingText}>Cargando comentarios...</Text>
                        </View>
                    ) : null
                }
            />

            {/* Formulario para nuevo comentario */}
            <View style={styles.commentForm}>
                {renderStarRating()}
                
                <TextInput
                    style={styles.commentInput}
                    placeholder="Escribe tu comentario aquí..."
                    placeholderTextColor="#999999"
                    value={comment}
                    onChangeText={setComment}
                    multiline
                    maxLength={500}
                />
                
                <View style={styles.formActions}>
                    <Text style={styles.characterCount}>{comment.length}/500</Text>
                    <TouchableOpacity
                        style={[
                            styles.submitButton,
                            (!comment.trim() || submitting) && styles.submitButtonDisabled
                        ]}
                        onPress={handleSubmitComment}
                        disabled={!comment.trim() || submitting}
                    >
                        {submitting ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <>
                                <Ionicons name="send" size={16} color="#fff" />
                                <Text style={styles.submitButtonText}>Enviar</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    placeholder: {
        width: 34,
    },
    formTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    commentsList: {
        flex: 1,
    },
    commentsContent: {
        padding: 15,
        paddingBottom: 20,
    },
    commentItem: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        marginLeft: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    commentRating: {
        flexDirection: 'row',
    },
    commentContent: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        color: '#999',
        alignSelf: 'flex-end',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 10,
        fontWeight: '500',
    },
    emptySubtext: {
        fontSize: 14,
        color: '#999',
        marginTop: 5,
    },
    loadingContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
    commentForm: {
        backgroundColor: '#fff',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ratingLabel: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
        marginRight: 10,
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 10,
    },
    starButton: {
        padding: 2,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '600',
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 14,
        color: '#333',
        minHeight: 80,
        textAlignVertical: 'top',
        backgroundColor: '#f9f9f9',
    },
    formActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    characterCount: {
        fontSize: 12,
        color: '#999',
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#ccc',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 5,
    },
});