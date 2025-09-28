import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FavoriteCommentCard({ comment, onPress, style }) {
    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Fecha no disponible';
        }
    };

    const renderStarRating = (rating) => {
        return (
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= (rating || 5) ? 'star' : 'star-outline'}
                        size={14}
                        color="#FFD700"
                    />
                ))}
            </View>
        );
    };

    const truncateText = (text, maxLength = 150) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    return (
        <TouchableOpacity 
            style={[styles.container, style]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            {/* Header con usuario y calificación */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={20} color="#4CAF50" />
                    </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.userName}>
                            {comment.user?.name || comment.user?.firstName || 'Usuario'}
                        </Text>
                        <Text style={styles.formTitle}>
                            {comment.formTitle}
                        </Text>
                    </View>
                </View>
                {renderStarRating(comment.rating)}
            </View>

            {/* Contenido del comentario */}
            <Text style={styles.content}>
                {truncateText(comment.content)}
            </Text>

            {/* Footer con fecha y acción */}
            <View style={styles.footer}>
                <Text style={styles.date}>
                    {formatDate(comment.createdAt || comment.created_at)}
                </Text>
                <View style={styles.readMoreContainer}>
                    <Text style={styles.readMore}>Leer más</Text>
                    <Ionicons name="chevron-forward" size={14} color="#4CAF50" />
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    userDetails: {
        flex: 1,
    },
    userName: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        marginBottom: 2,
    },
    formTitle: {
        fontSize: 12,
        color: '#666',
        fontStyle: 'italic',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    content: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        marginBottom: 12,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 11,
        color: '#999',
    },
    readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    readMore: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
        marginRight: 2,
    },
});