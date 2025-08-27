import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import Backgrounfour from '../components/Backgrounfour';
import UserHeader from '../components/UserHeader';
import RechargeOption from '../components/RechargeOption';
import CustomRechargeOption from '../components/CustomRechargeOption';

export default function PaymentScreen({ navigation }) {
    const [selectedAmount, setSelectedAmount] = useState(null);  // Estado inicial sin selección
    const [customAmount, setCustomAmount] = useState(null);      // Monto personalizado

    const amounts = [
        { id: 1, points: 'RF 10', amount: 2000 },
        { id: 2, points: 'RF 50', amount: 10000 },
        { id: 3, points: 'RF 150', amount: 30000 },
        { id: 3, points: 'RF 200', amount: 40000 },
        { id: 3, points: 'RF 250', amount: 50000 },
        { id: 3, points: 'RF 300', amount: 60000 },
    ];

    const handlePayment = () => {
        const paymentAmount = customAmount || selectedAmount;
        if (paymentAmount) {
            navigation.navigate('WompiWidgetScreen', { amount: paymentAmount });
        }
    };

    return (
        <View style={styles.container}>
            {/* Fondo */}
            <Backgrounfour />

            {/* Header del usuario */}
            <View style={styles.headerContainer}>
                <UserHeader navigation={navigation} />
            </View>

            {/* Contenido principal */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Recargar tú RifiRafi</Text>

                {/* Opciones de recarga */}
                <View style={styles.rechargeContainer}>
                    <View style={styles.optionsGrid}>
                        {amounts.map((item) => (
                            <RechargeOption
                                key={item.id}
                                points={item.points}
                                amount={item.amount}
                                selected={selectedAmount === item.amount}
                                onPress={() => {
                                    setSelectedAmount(item.amount);
                                    setCustomAmount(null);  // Desmarcar recarga personalizada
                                }}
                            />
                        ))}
                    </View>

                    {/* Recarga personalizada */}
                    <CustomRechargeOption
                        onChange={(rfValue) => {
                            setSelectedAmount(null);     // Desmarcar opciones predefinidas
                            setCustomAmount(rfValue * 200);  // Asume 1 RF = 200 COP
                        }}
                    />
                </View>

                {/* Botón de pago */}
                <TouchableOpacity
                    style={[
                        styles.paymentButton,
                        !(customAmount || selectedAmount) && styles.paymentButtonDisabled, // Deshabilitar si no hay selección
                    ]}
                    onPress={handlePayment}
                    disabled={!(customAmount || selectedAmount)}  // Deshabilitar si no hay selección
                >
                    <Image
                        source={require('../assets/iconWompi.png')} // Icono oficial de Wompi
                        style={styles.wompiIcon}
                    />
                    <Text style={styles.paymentButtonText}>Paga con Wompi</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        marginTop: 20,
        marginHorizontal: 20,
        marginBottom: 20,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    rechargeContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        elevation: 5,
    },
    optionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    paymentButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#0FAC39',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 10,
    },
    paymentButtonDisabled: {
        backgroundColor: '#ccc',
    },
    paymentButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    wompiIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});
