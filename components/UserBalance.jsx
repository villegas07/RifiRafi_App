import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '../hooks/useUser';

/**
 * Componente para mostrar el balance de RF del usuario
 */
export default function UserBalance({ onPress, style }) {
    const { user, loading } = useUser();

    const getUserBalance = () => {
        // Posibles campos donde puede estar el balance
        return user?.balance || user?.rfCoins || user?.coins || 0;
    };

    const formatBalance = (balance) => {
        if (balance >= 1000) {
            return `${(balance / 1000).toFixed(1)}k`;
        }
        return balance.toString();
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loading, style]}>
                <View style={styles.loadingPlaceholder} />
                <Text style={styles.loadingText}>Cargando...</Text>
            </View>
        );
    }

    const balance = getUserBalance();

    return (
        <TouchableOpacity 
            style={[styles.container, style]} 
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={styles.header}>
                <Ionicons name="wallet" size={24} color="#4CAF50" />
                <Text style={styles.title}>Mi Monedero</Text>
            </View>
            
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceAmount}>
                    {formatBalance(balance)}
                </Text>
                <Text style={styles.balanceLabel}>RF</Text>
            </View>
            
            <Text style={styles.subtitle}>
                Toca para recargar
            </Text>
            
            <Ionicons 
                name="chevron-forward" 
                size={20} 
                color="#666" 
                style={styles.chevron}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
        position: 'relative',
    },
    loading: {
        backgroundColor: '#f5f5f5',
        borderLeftColor: '#ddd',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 8,
    },
    balanceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginRight: 8,
    },
    balanceLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4CAF50',
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
        marginBottom: 4,
    },
    chevron: {
        position: 'absolute',
        right: 16,
        top: '50%',
        marginTop: -10,
    },
    loadingPlaceholder: {
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 4,
        marginBottom: 8,
        width: '60%',
    },
    loadingText: {
        fontSize: 14,
        color: '#999',
    },
});