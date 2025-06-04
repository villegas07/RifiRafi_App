import React from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";

export default function PolicyModal({ visible, onClose }) {
    return (
        <Modal
            animationType="slide"
            transparent
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Políticas de la App</Text>
                    <ScrollView style={styles.policyContent}>
                        <Text style={styles.policyText}>
                            Bienvenido a nuestra aplicación. Al utilizarla, usted acepta los
                            siguientes términos y condiciones:
                        </Text>
                        <Text style={styles.policyText}>
                            1. Usted no debe utilizar la aplicación para fines ilegales.
                        </Text>
                        <Text style={styles.policyText}>
                            2. La información proporcionada debe ser precisa y veraz.
                        </Text>
                        <Text style={styles.policyText}>
                            3. El incumplimiento de las políticas puede resultar en la
                            suspensión de su cuenta.
                        </Text>
                        <Text style={styles.policyText}>
                            4. Nos reservamos el derecho de actualizar estas políticas en
                            cualquier momento.
                        </Text>
                    </ScrollView>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#333",
    },
    policyContent: {
        maxHeight: 200,
        marginBottom: 20,
    },
    policyText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 10,
        textAlign: "justify",
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: "#0FAC39",
        borderRadius: 5,
    },
    closeButtonText: {
        fontSize: 14,
        color: "#fff",
    },
});
