import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WompiWidget from '../components/WompiWidget';
import { useTransactions } from '../hooks/useTransactions';

export default function WompiWidgetScreen({ route, navigation }) {
    const { amount } = route.params;
    const { processPayment, processPendingPayment, isProcessing, calculateRFCoins } = useTransactions();
    const [isUpdatingBalance, setIsUpdatingBalance] = useState(false);

    const handlePaymentSuccess = async (data) => {
        try {
            setIsUpdatingBalance(true);
            
            const paymentData = {
                amount,
                reference: data.reference,
                status: 'APPROVED',
                additionalData: data
            };

            const result = await processPayment(paymentData);
            
            if (result.success) {
                Alert.alert(
                    'Pago Exitoso', 
                    `¡Pago completado!\n\nMonto: $${amount.toLocaleString()} COP\nRF agregados: ${result.rfCoins} RF\n\nTu monedero ha sido actualizado correctamente.`,
                    [
                        {
                            text: 'Ver Monedero',
                            onPress: () => navigation.navigate('UserProfileScreen')
                        },
                        {
                            text: 'Ir a Inicio',
                            onPress: () => navigation.navigate('Home'),
                            style: 'cancel'
                        }
                    ]
                );
            } else {
                Alert.alert(
                    'Pago Procesado', 
                    `Tu pago fue exitoso pero hubo un problema actualizando tu monedero: ${result.message}\n\nContacta soporte si el problema persiste.`,
                    [
                        {
                            text: 'OK',
                            onPress: () => navigation.navigate('Home')
                        }
                    ]
                );
            }
        } catch (error) {
            console.error('Error handling payment success:', error);
            Alert.alert(
                'Pago Exitoso', 
                `Tu pago fue procesado pero hubo un problema técnico. Si no ves las RF en tu monedero, contacta soporte.\n\nMonto: $${amount.toLocaleString()} COP`,
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Home')
                    }
                ]
            );
        } finally {
            setIsUpdatingBalance(false);
        }
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

    const handlePaymentPending = async (data) => {
        try {
            setIsUpdatingBalance(true);
            
            const paymentData = {
                amount,
                reference: data.reference,
                status: 'PENDING',
                additionalData: data
            };

            const result = await processPendingPayment(paymentData);
            
            Alert.alert(
                'Pago Pendiente', 
                result.message || 'Tu pago está siendo procesado. Te notificaremos cuando se complete.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.navigate('Home')
                    }
                ]
            );
        } catch (error) {
            console.error('Error handling pending payment:', error);
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
        } finally {
            setIsUpdatingBalance(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    disabled={isUpdatingBalance}
                >
                    <Ionicons name="arrow-back" size={24} color={isUpdatingBalance ? "#ccc" : "#333"} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {isUpdatingBalance ? 'Procesando...' : 'Pagar con Wompi'}
                </Text>
                <View style={styles.placeholder}>
                    {isUpdatingBalance && (
                        <ActivityIndicator size="small" color="#4CAF50" />
                    )}
                </View>
            </View>

            {isUpdatingBalance && (
                <View style={styles.processingOverlay}>
                    <View style={styles.processingContainer}>
                        <ActivityIndicator size="large" color="#4CAF50" />
                        <Text style={styles.processingText}>
                            Actualizando tu monedero...
                        </Text>
                        <Text style={styles.processingSubtext}>
                            Por favor espera, no cierres la aplicación
                        </Text>
                    </View>
                </View>
            )}

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
        alignItems: 'center',
        justifyContent: 'center',
    },
    processingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    processingContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        minWidth: 250,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    processingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 15,
        textAlign: 'center',
    },
    processingSubtext: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
        textAlign: 'center',
        lineHeight: 20,
    },
});
