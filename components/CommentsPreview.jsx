import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator,
    FlatList 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CommentCard from './CommentCard';
import { getAllFormComments } from '../api/forms/get-comments';

export default function CommentsPreview({ 
    formId, 
    onViewAllPress, 
    maxComments = 3,
    showAddButton = true 
}) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalComments, setTotalComments] = useState(0);

    useEffect(() => {
        if (formId) {
            fetchComments();
        }
    }, [formId]);

    const fetchComments = async () => {
        try {
            setLoading(true);
            const response = await getAllFormComments(formId, {
                order: 'DESC',
                orderBy: 'createdAt',
                limit: maxComments,
                page: 1
            });

            if (response.success) {
                let commentsData = [];
                let total = 0;
                
                if (response.data?.comments) {
                    commentsData = response.data.comments;
                    total = response.data.total || response.data.count || commentsData.length;
                } else if (Array.isArray(response.data)) {
                    commentsData = response.data;
                    total = commentsData.length;
                } else if (response.data?.data) {
                    commentsData = response.data.data;
                    total = response.data.total || response.data.count || commentsData.length;
                }

                setComments(commentsData);
                setTotalComments(total);
            }
        } catch (error) {
            console.error('Error fetching comments preview:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderCommentItem = ({ item }) => (
        <CommentCard 
            comment={item} 
            onPress={() => onViewAllPress && onViewAllPress(formId)}
        />
    );

    const renderHeader = () => (
        <View style={styles.header}>
            <View style={styles.titleContainer}>
                <Ionicons name="chatbubbles" size={18} color="#4CAF50" />
                <Text style={styles.title}>
                    Comentarios {totalComments > 0 && `(${totalComments})`}
                </Text>
            </View>
            
            {showAddButton && (
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => onViewAllPress && onViewAllPress(formId, true)}
                >
                    <Ionicons name="add" size={16} color="#4CAF50" />
                    <Text style={styles.addButtonText}>Agregar</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    const renderFooter = () => {
        if (totalComments <= maxComments || !onViewAllPress) return null;
        
        return (
            <TouchableOpacity 
                style={styles.viewAllButton}
                onPress={() => onViewAllPress(formId)}
            >
                <Text style={styles.viewAllText}>
                    Ver todos los comentarios ({totalComments})
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#4CAF50" />
            </TouchableOpacity>
        );
    };

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={24} color="#ccc" />
            <Text style={styles.emptyText}>Aún no hay comentarios</Text>
            {showAddButton && (
                <TouchableOpacity 
                    style={styles.firstCommentButton}
                    onPress={() => onViewAllPress && onViewAllPress(formId, true)}
                >
                    <Text style={styles.firstCommentButtonText}>¡Sé el primero en comentar!</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.container}>
                {renderHeader()}
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="small" color="#4CAF50" />
                    <Text style={styles.loadingText}>Cargando comentarios...</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {renderHeader()}
            
            {comments.length > 0 ? (
                <>
                    <FlatList
                        data={comments}
                        renderItem={renderCommentItem}
                        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                    />
                    {renderFooter()}
                </>
            ) : (
                renderEmptyState()
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 6,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    addButtonText: {
        color: '#4CAF50',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 3,
    },
    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 5,
    },
    viewAllText: {
        color: '#4CAF50',
        fontSize: 13,
        fontWeight: '500',
        marginRight: 3,
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 13,
        color: '#999',
        marginTop: 5,
        marginBottom: 10,
    },
    firstCommentButton: {
        backgroundColor: '#4CAF50',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 15,
    },
    firstCommentButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
    },
    loadingText: {
        marginLeft: 8,
        fontSize: 13,
        color: '#666',
    },
});