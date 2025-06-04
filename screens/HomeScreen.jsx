import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FloatingMenuBar from '../components/FloatingMenuBar';
import BackgroundFirst from '../components/BackgroundFirst';
import RoundedImageBackground from '../components/RoundedImageBackground';
import PromotionSlider from '../components/PromotionSlider';
import { promotions } from '../utils/promotionsData'; // Importa las promociones compartidas

export default function HomeScreen({ navigation }) {
    const menuItems = [
        { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
        { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
        { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
        { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
        { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
    ];

    return (
        <View style={styles.container}>
            {/* Capa de fondo */}
            <View style={styles.backgroundLayer}>
                <BackgroundFirst />
            </View>
            {/* Contenido principal */}
            <View style={styles.contentLayer}>
                {/* Imagen con texto sobrepuesto */}
                <View style={styles.imageContainer}>
                    <RoundedImageBackground />
                    <View style={styles.textOverlay}>
                        <Text style={styles.title}>¡Gana una{"\n"}Aventura!</Text>
                    </View>
                </View>

                {/* Botón central */}
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => navigation.navigate("QuestionsScreen")}
                >
                    <Text style={styles.playButtonText}>Play</Text>
                </TouchableOpacity>

                {/* Componente de promoción */}
                <View style={styles.promotionContainer}>
                    <PromotionSlider
                        promotions={promotions}
                        onPress={(promo) => navigation.navigate(promo.screen)} // Navega a la pantalla especificada
                    />
                </View>

            </View>

            {/* Barra de navegación */}
            <View style={styles.topLayer}>
                <FloatingMenuBar menuItems={menuItems} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    backgroundLayer: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    contentLayer: {
        flex: 1,
        zIndex: 1,
        alignItems: 'center',
    },
    topLayer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
    },
    textOverlay: {
        position: 'absolute',
        top: '20%',
        alignItems: 'center',
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    playButton: {
        marginTop: -190,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 25,
        elevation: 5,
    },
    playButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    promotionContainer: {
        marginTop: 150,
        alignItems: 'center',
    },
});
