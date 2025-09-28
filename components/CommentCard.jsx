import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommentCard({ comment, onPress }) {
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

    const renderStarRating = (rating) => {
        return (
            <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                        key={star}
                        name={star <= (rating || 5) ? 'star' : 'star-outline'}
                        size={12}
                        color="#FFD700"
                    />
                ))}
            </View>
        );
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
        >
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Ionicons name="person-circle" size={20} color="#666" />
                    <Text style={styles.userName}>
                        {comment.user?.name || comment.user?.firstName || 'Usuario'}
                    </Text>
                </View>
                {renderStarRating(comment.rating)}
            </View>
            
            <Text style={styles.content} numberOfLines={3}>
                {comment.content}
            </Text>
            
            <Text style={styles.date}>
                {formatDate(comment.createdAt || comment.created_at)}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    userName: {
        marginLeft: 6,
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    content: {
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
        marginBottom: 4,
    },
    date: {
        fontSize: 11,
        color: '#999',
        alignSelf: 'flex-end',
    },
});