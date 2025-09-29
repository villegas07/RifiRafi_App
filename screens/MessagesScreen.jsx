import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import Backgrounfour from "../components/Backgrounfour";
import FloatingMenuBar from "../components/FloatingMenuBar";

const { width } = Dimensions.get("window");

const menuItems = [
    { screen: "Ideas", icon: require("../assets/test.png"), iconType: "image", color: "#4CAF50" },
    { screen: "Messages", icon: require("../assets/chat.png"), iconType: "image", color: "#FFC107" },
    { screen: "Home", icon: require("../assets/home.png"), iconType: "image", color: "#03A9F4" },
    { screen: "Brain", icon: require("../assets/gym.png"), iconType: "image", color: "#9C27B0" },
    { screen: "Favorites", icon: require("../assets/historia.png"), iconType: "image", color: "#E91E63" },
];

export default function MessagesScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Fondo */}
            <Backgrounfour />
            
            {/* Contenido principal */}
            <View style={styles.contentContainer}>
                <View style={styles.messageContainer}>
                    {/* Icono de chat */}
                    <Text style={styles.chatIcon}>💬</Text>
                    
                    {/* Mensaje principal con icono */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.messageEmoji}>💭</Text>
                        <Text style={styles.title}>Chat en Desarrollo</Text>
                    </View>
                    <Text style={styles.subtitle}>Función no disponible</Text>
                    
                    {/* Caja de mensaje */}
                    <View style={styles.messageBox}>
                        <Text style={styles.constructionIcon}>🚧</Text>
                        <Text style={styles.messageText}>
                            Estamos trabajando en una increíble funcionalidad de chat en tiempo real.
                        </Text>
                        <Text style={styles.subMessageText}>
                            Muy pronto podrás conectar con otros usuarios, compartir ideas, 
                            enviar fotos y disfrutar de conversaciones instantáneas.
                        </Text>
                        
                        {/* Indicador de progreso */}
                        <View style={styles.progressContainer}>
                            <View style={styles.progressBar}>
                                <View style={styles.progressFill} />
                            </View>
                            <Text style={styles.progressText}>75% Completado</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Menú flotante */}
            <View style={styles.menuContainer}>
                <FloatingMenuBar menuItems={menuItems} />
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
        paddingBottom: 100,
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
    chatIcon: {
        fontSize: 120,
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    messageEmoji: {
        fontSize: 32,
        marginRight: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#7b8794',
        marginBottom: 30,
        textAlign: 'center',
    },
    messageBox: {
        alignItems: 'center',
        paddingTop: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(123, 135, 148, 0.2)',
        width: '100%',
    },
    constructionIcon: {
        fontSize: 32,
        marginBottom: 15,
    },
    messageText: {
        fontSize: 16,
        color: '#5d6d7e',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 10,
        fontWeight: '600',
    },
    subMessageText: {
        fontSize: 14,
        color: '#7b8794',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    progressContainer: {
        alignItems: 'center',
        width: '100%',
    },
    progressBar: {
        width: width * 0.5,
        height: 8,
        backgroundColor: 'rgba(123, 135, 148, 0.2)',
        borderRadius: 4,
        overflow: 'hidden',
        marginBottom: 10,
    },
    progressFill: {
        width: '75%',
        height: '100%',
        backgroundColor: '#4CAF50',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: '600',
    },
    menuContainer: {
        position: "absolute",
        bottom: 10,
        width: "100%",
    },
});
