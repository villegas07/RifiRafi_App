import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Modal, 
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createFormComment } from '../api/forms/create-comment';
import { useUser } from '../hooks/useUser';

export default function CommentModal({ 
    visible, 
    onClose, 
    formId, 
    formTitle, 
    onCommentAdded,
    onNavigateToComments 
}) {
    const { user } = useUser();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        if (!comment.trim()) {
            Alert.alert('Error', 'Por favor escribe un comentario');
            return;
        }

        if (!user?.id) {
            Alert.alert('Error', 'Debes estar logueado para comentar');
            return;
        }

        try {
            setIsSubmitting(true);
            
            const result = await createFormComment(formId, {
                content: comment.trim(),
                rating
            });

            if (result.success) {
                Alert.alert(
                    'Éxito', 
                    '¡Tu comentario ha sido enviado correctamente!',
                    [{ text: 'OK', onPress: handleClose }]
                );
                
                // Notificar que se agregó un comentario
                if (onCommentAdded) {
                    onCommentAdded();
                }
            } else {
                // Manejar el caso específico de comentario duplicado
                if (result.isDuplicate) {
                    Alert.alert(
                        'Comentario ya existente', 
                        'Ya has realizado un comentario para este formulario. Solo se permite un comentario por usuario.\n\n¿Te gustaría ver tus comentarios en la sección de Favoritos?',
                        [
                            { text: 'Cancelar', style: 'cancel', onPress: handleClose },
                            { 
                                text: 'Ver mis comentarios', 
                                onPress: () => {
                                    handleClose();
                                    if (onNavigateToComments) {
                                        onNavigateToComments();
                                    }
                                }
                            }
                        ]
                    );
                } else {
                    throw new Error(result.message || result.error || 'Error al enviar comentario');
                }
            }
        } catch (error) {
            console.error('Error al enviar comentario:', error);
            Alert.alert(
                'Error', 
                error.message || 'No se pudo enviar el comentario. Inténtalo de nuevo.'
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setComment('');
        setRating(5);
        onClose();
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
                                size={28}
                                color="#FFD700"
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <Text style={styles.ratingText}>({rating}/5)</Text>
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView 
                style={styles.overlay}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableOpacity 
                    style={styles.backdrop} 
                    activeOpacity={1} 
                    onPress={handleClose}
                >
                    <ScrollView 
                        contentContainerStyle={styles.scrollContainer}
                        showsVerticalScrollIndicator={false}
                    >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={styles.modalContainer}
                        >
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={styles.headerContent}>
                                    <Ionicons name="chatbubbles" size={24} color="#4CAF50" />
                                    <Text style={styles.headerTitle}>Hacer Comentario</Text>
                                </View>
                                <TouchableOpacity 
                                    onPress={handleClose}
                                    style={styles.closeButton}
                                >
                                    <Ionicons name="close" size={24} color="#666" />
                                </TouchableOpacity>
                            </View>

                            {/* Form Title */}
                            <Text style={styles.formTitle}>{formTitle}</Text>

                            {/* Rating Section */}
                            {renderStarRating()}

                            {/* Comment Input */}
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Tu comentario:</Text>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Escribe tu comentario aquí..."
                                    placeholderTextColor="#999999"
                                    value={comment}
                                    onChangeText={setComment}
                                    multiline={true}
                                    maxLength={500}
                                    textAlignVertical="top"
                                />
                                <Text style={styles.characterCount}>
                                    {comment.length}/500 caracteres
                                </Text>
                            </View>

                            {/* Action Buttons */}
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={handleClose}
                                >
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[
                                        styles.submitButton,
                                        (!comment.trim() || isSubmitting) && styles.submitButtonDisabled
                                    ]}
                                    onPress={handleSubmit}
                                    disabled={!comment.trim() || isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <ActivityIndicator size="small" color="white" />
                                    ) : (
                                        <>
                                            <Ionicons name="send" size={16} color="white" />
                                            <Text style={styles.submitButtonText}>Enviar</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    backdrop: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollContainer: {
        justifyContent: 'flex-end',
        minHeight: '100%',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 8,
    },
    closeButton: {
        padding: 4,
    },
    formTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    ratingContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    ratingLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    starsContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    starButton: {
        padding: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    inputContainer: {
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 2,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 15,
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: 'top',
    },
    characterCount: {
        textAlign: 'right',
        marginTop: 8,
        fontSize: 12,
        color: '#999',
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    submitButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    submitButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    submitButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',
    },
});