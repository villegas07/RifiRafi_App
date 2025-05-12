import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FloatingMenuBar from '../components/FloatingMenuBar';

export default function RegisterScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>¡Esta es la nueva pantalla!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
});
