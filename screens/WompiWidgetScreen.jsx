import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WompiWidgetScreen({ route, navigation }) {
    const { amount } = route.params;
    const webViewRef = useRef(null);

    const WOMPI_URL = 'https://checkout.wompi.co/p/'; // URL base del widget de Wompi
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Reemplaza con tu llave pública de Wompi

    // Construir el URL con parámetros
    const paymentUrl = `${WOMPI_URL}?public-key=${PUBLIC_KEY}&currency=COP&amount-in-cents=${amount * 100}&reference=${Date.now()}`;

    const handleNavigationStateChange = (event) => {
        if (event.url.includes('success')) {
            Alert.alert('Pago Exitoso', 'Tu pago se ha completado correctamente.');
            navigation.goBack();
        } else if (event.url.includes('failure')) {
            Alert.alert('Pago Fallido', 'Hubo un problema con tu pago. Intenta nuevamente.');
            navigation.goBack();
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: paymentUrl }}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState
                renderLoading={() => <ActivityIndicator size="large" color="#0FAC39" />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
