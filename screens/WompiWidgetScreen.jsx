import React from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WompiWidget from '../components/WompiWidget';

export default function WompiWidgetScreen({ route, navigation }) {
    const { amount } = route.params;

    const handlePaymentSuccess = (data) => {
        Alert.alert(
            'Pago Exitoso', 
            `Tu pago de $${amount.toLocaleString()} COP se ha completado correctamente.`,
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home')
                }
            ]
        );
    };

    const handlePaymentError = (data) => {
        Alert.alert(
            'Pago Fallido', 
            'Hubo un problema con tu pago. Intenta nuevamente.',
            [
                {
                    text: 'Reintentar',
                    onPress: () => navigation.goBack()
                }
            ]
        );
    };

    const handlePaymentPending = (data) => {
        Alert.alert(
            'Pago Pendiente', 
            'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Home')
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Pagar con Wompi</Text>
                <View style={styles.placeholder} />
            </View>

            <WompiWidget
                amount={amount}
                currency="COP"
                email="test@example.com"
                reference={`rifi_guest_${Date.now()}`}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                onPaymentPending={handlePaymentPending}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    placeholder: {
        width: 40,
    },
});
