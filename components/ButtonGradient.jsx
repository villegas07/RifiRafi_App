// ButtonGradient.jsx (corregido)
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonGradient() {
    return (
        <LinearGradient
            colors={['#2CC364FF', '#D5C620FF']}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.button}>
            <Text style={styles.text}>Iniciar Sesión</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',  // Ocupa todo el ancho del contenedor padre
        height: 50,
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        color: '#fff',
        fontWeight: 'bold',
    },
});