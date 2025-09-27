import React, { useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { generateWompiPaymentUrl } from '../utils/wompiUtils';

export default function WompiWidget({ amount, currency = 'COP', email = 'test@example.com', reference, onPaymentSuccess, onPaymentError, onPaymentPending }) {
    const webViewRef = useRef(null);
    
    // Generar referencia única si no se proporciona
    const paymentReference = reference || `ref_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Generar URL con firma de integridad
    const widgetUrl = generateWompiPaymentUrl(amount, currency, email, paymentReference);
    
    if (!widgetUrl) {
        console.error('No se pudo generar la URL de pago');
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error al generar el enlace de pago</Text>
            </View>
        );
    }
    
    const handleNavigationStateChange = (navState) => {
        const { url } = navState;
        
        // Detectar estados de pago basados en la URL
        if (url.includes('transaction_status=APPROVED')) {
            onPaymentSuccess && onPaymentSuccess({ reference: paymentReference, url });
        } else if (url.includes('transaction_status=DECLINED') || url.includes('transaction_status=ERROR')) {
            onPaymentError && onPaymentError({ reference: paymentReference, url });
        } else if (url.includes('transaction_status=PENDING')) {
            onPaymentPending && onPaymentPending({ reference: paymentReference, url });
        }
    };

    return (
        <View style={styles.container}>
            <WebView
                ref={webViewRef}
                source={{ uri: widgetUrl }}
                style={styles.webview}
                onNavigationStateChange={handleNavigationStateChange}
                startInLoadingState
                renderLoading={() => (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color="#0FAC39" />
                    </View>
                )}
                javaScriptEnabled
                domStorageEnabled
                mixedContentMode="compatibility"
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
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    errorText: {
        fontSize: 16,
        color: '#ff0000',
        textAlign: 'center',
    },
});
