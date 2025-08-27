import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FloatingMenuBar from '../components/FloatingMenuBar';
import BackgroundFirst from '../components/BackgroundFirst';
import RoundedImageBackground from '../components/RoundedImageBackground';
import PromotionSlider from '../components/PromotionSlider';
import ProfileButton from '../components/ProfileButton';
import PointsBar from '../components/PointsBar';
import UserName from '../components/UserName';
import { useUser } from '../hooks/useUser';

export default function HomeScreen({ navigation }) {
    const { user } = useUser();
    console.log('HomeScreen user:', user);
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
                        <Text style={styles.title}>¡Hola <UserName fallback="Usuario" />!</Text>
                        <Text style={styles.subtitle}>¡Gana una Aventura!</Text>
                    </View>
                    
                    {/* Barra superior con perfil y puntos */}
                    <View style={styles.topBar}>
                        <ProfileButton onPress={() => navigation.navigate('UserProfileScreen')} />
                        <PointsBar onPress={() => navigation.navigate('PaymentScreen')} />
                    </View>
                </View>

                {/* Botón central */}
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => navigation.navigate("PromotionsScreen")}
                >
                    <Text style={styles.playButtonText}>Play</Text>
                </TouchableOpacity>

                {/* Componente de promoción */}
                <View style={styles.promotionContainer}>
                    <PromotionSlider
                        onPress={() => navigation.navigate('PromotionsScreen')}
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    topBar: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
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
