import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Backgrounfour from '../components/Backgrounfour';


export default function SecurityScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Fondo */}
            <Backgrounfour />

            {/* Header del usuario */}

            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>Seguridad y Privacidad</Text>
                
                {/* Sección de Tratamiento de Datos */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
                        <Text style={styles.sectionTitle}>Tratamiento de Datos</Text>
                    </View>
                    
                    <Text style={styles.sectionContent}>
                        En RifiRafi nos comprometemos con la protección de tus datos personales. 
                        Cumplimos estrictamente con la Ley de Habeas Data (Ley 1581 de 2012) 
                        y el Decreto 1377 de 2013 de Colombia.
                    </Text>
                    
                    <Text style={styles.sectionSubtitle}>Transparencia en el uso de datos:</Text>
                    <Text style={styles.listItem}>• Recopilamos únicamente los datos necesarios para el funcionamiento de la aplicación</Text>
                    <Text style={styles.listItem}>• Tu información se utiliza exclusivamente para mejorar tu experiencia de usuario</Text>
                    <Text style={styles.listItem}>• No compartimos tus datos con terceros sin tu consentimiento expreso</Text>
                    <Text style={styles.listItem}>• Implementamos medidas de seguridad avanzadas para proteger tu información</Text>
                    <Text style={styles.listItem}>• Tienes derecho a conocer, actualizar, rectificar y suprimir tus datos</Text>
                </View>

                {/* Sección de Derechos del Usuario */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="person-circle" size={24} color="#2196F3" />
                        <Text style={styles.sectionTitle}>Tus Derechos</Text>
                    </View>
                    
                    <Text style={styles.sectionContent}>
                        Como titular de los datos, tienes los siguientes derechos:
                    </Text>
                    
                    <Text style={styles.listItem}>• <Text style={styles.bold}>Acceso:</Text> Conocer qué datos tenemos sobre ti</Text>
                    <Text style={styles.listItem}>• <Text style={styles.bold}>Actualización:</Text> Mantener tu información actualizada</Text>
                    <Text style={styles.listItem}>• <Text style={styles.bold}>Rectificación:</Text> Corregir datos inexactos</Text>
                    <Text style={styles.listItem}>• <Text style={styles.bold}>Supresión:</Text> Eliminar tus datos cuando sea procedente</Text>
                    <Text style={styles.listItem}>• <Text style={styles.bold}>Revocación:</Text> Retirar tu consentimiento en cualquier momento</Text>
                </View>

                {/* Contacto */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Ionicons name="mail" size={24} color="#9C27B0" />
                        <Text style={styles.sectionTitle}>¿Tienes preguntas?</Text>
                    </View>
                    
                    <Text style={styles.sectionContent}>
                        Si tienes dudas sobre el manejo de tus datos o deseas ejercer 
                        alguno de tus derechos, contáctanos a través de nuestros 
                        canales oficiales de soporte.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    headerContainer: {
        paddingTop: 60,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 45,
    },
    section: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
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
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginLeft: 12,
        flex: 1,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#34495e',
        marginTop: 15,
        marginBottom: 10,
    },
    sectionContent: {
        fontSize: 15,
        color: '#5d6d7e',
        lineHeight: 22,
        textAlign: 'justify',
    },
    listItem: {
        fontSize: 14,
        color: '#5d6d7e',
        lineHeight: 20,
        marginBottom: 8,
        paddingLeft: 5,
    },
    bold: {
        fontWeight: 'bold',
        color: '#2c3e50',
    },
});
