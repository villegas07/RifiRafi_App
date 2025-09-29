import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Avatar from './Avatar';

export default function ExpandableCommentCard({ comment, style }) {
    const [isExpanded, setIsExpanded] = useState(false);
    
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

    const shouldShowReadMore = comment.content && comment.content.length > 150;

    const getUserFullName = () => {
        const user = comment.user;
        if (!user) return 'Usuario Anónimo';
        
        if (user.firstName && user.lastName) {
            return `${user.firstName} ${user.lastName}`;
        }
        
        return user.name || user.firstName || user.username || 'Usuario';
    };

    const toggleExpansion = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    return (
        <TouchableOpacity 
            style={[styles.container, style]} 
            onPress={shouldShowReadMore ? toggleExpansion : undefined}
            activeOpacity={shouldShowReadMore ? 0.8 : 1}
        >
            {/* Header con usuario y calificación */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Avatar 
                        user={comment.user} 
                        size={44} 
                        style={styles.userAvatar}
                    />
                    <View style={styles.userDetails}>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.userName}>
                                {getUserFullName()}
                            </Text>
                            <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
                        </View>
                        <Text style={styles.formTitle}>
                            {comment.formTitle}
                        </Text>
                    </View>
                </View>
                {renderStarRating(comment.rating)}
            </View>

            {/* Contenido del comentario */}
            <Text style={styles.content}>
                {isExpanded ? comment.content : truncateText(comment.content)}
            </Text>

            {/* Footer con fecha y acción */}
            <View style={styles.footer}>
                <Text style={styles.date}>
                    {formatDate(comment.createdAt || comment.created_at)}
                </Text>
                {shouldShowReadMore && (
                    <TouchableOpacity 
                        style={styles.readMoreContainer}
                        onPress={toggleExpansion}
                    >
                        <Text style={styles.readMore}>
                            {isExpanded ? 'Ver menos' : 'Leer más'}
                        </Text>
                        <Ionicons 
                            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
                            size={14} 
                            color="#4CAF50" 
                        />
                    </TouchableOpacity>
                )}
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
    userAvatar: {
        marginRight: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    userDetails: {
        flex: 1,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    userName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 3,
        letterSpacing: 0.3,
    },
    formTitle: {
        fontSize: 12,
        color: '#7f8c8d',
        fontStyle: 'italic',
        fontWeight: '500',
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
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
    readMore: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
        marginRight: 4,
    },
});