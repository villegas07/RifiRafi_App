import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export default function WompiWidget({ amount, currency = 'COP', email, reference, onPaymentSuccess, onPaymentError }) {
    const publicKey = 'tu_public_key_de_wompi';
    const widgetUrl = 'https://checkout.wompi.co/p/';

    // Construye la URL con los parámetros necesarios
    const paymentUrl = `${widgetUrl}?public-key=${publicKey}&currency=${currency}&amount-in-cents=${amount * 100}&reference=${reference}&customer-data[email]=${email}`;

    return (
        <View style={styles.container}>
            <WebView
                source={{ uri: paymentUrl }}
                style={styles.webview}
                onNavigationStateChange={(event) => {
                    if (event.url.includes('success_url')) {
                        onPaymentSuccess(event.url);
                    } else if (event.url.includes('error_url')) {
                        onPaymentError(event.url);
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    webview: {
        flex: 1,
    },
});
