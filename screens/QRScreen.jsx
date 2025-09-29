import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Backgrounfour from '../components/Backgrounfour';

export default function QRScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Fondo */}
            <Backgrounfour />
            
            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <View style={styles.messageContainer}>
                    <Ionicons name="qr-code" size={120} color="#FF9800" />
                    <Text style={styles.title}>Código QR</Text>
                    <Text style={styles.subtitle}>Función no disponible</Text>
                    
                    <View style={styles.messageBox}>
                        <Ionicons name="construct" size={32} color="#FF9800" />
                        <Text style={styles.messageText}>
                            Estamos trabajando para activar esta función muy pronto.
                        </Text>
                        <Text style={styles.subMessageText}>
                            Te notificaremos cuando esté disponible para que puedas 
                            disfrutar de todas las ventajas del código QR.
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 60,
    },
    messageContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 20,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#7b8794',
        marginBottom: 30,
    },
    messageBox: {
        alignItems: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(123, 135, 148, 0.2)',
    },
    messageText: {
        fontSize: 16,
        color: '#5d6d7e',
        textAlign: 'center',
        lineHeight: 24,
        marginTop: 15,
        marginBottom: 10,
        fontWeight: '600',
    },
    subMessageText: {
        fontSize: 14,
        color: '#7b8794',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },
});
