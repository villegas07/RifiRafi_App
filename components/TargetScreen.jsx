import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TargetScreen({ route }) {
    const { qrData } = route.params || {}; // Recibe los datos del QR

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Datos del QR!</Text>
            <Text style={styles.qrData}>{qrData || "No hay datos disponibles."}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    qrData: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});
