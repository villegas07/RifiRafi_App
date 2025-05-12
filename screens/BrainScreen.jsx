import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon';
import FloatingMenuBar from '../components/FloatingMenuBar';
import ProfileButton from '../components/ProfileButton';
import PromotionSlider from '../components/PromotionSlider';
import { promotions } from '../utils/promotionsData'; 

export default function GymMentalScreen({ navigation }) {
    const menuItems = [
        { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
        { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
        { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
        { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
        { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
    ];

    return (
        <View style={styles.container}>
            <PuzzleBackground />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/gym.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Gym{"\n"}mental</Text>
                </View>
                <ProfileButton
                    imageSource={require('../assets/vacation.png')}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                    style={styles.profileButton}
                />
            </View>
            <Text style={styles.title}>¡Es tu momento de ganas!</Text>

            {/* Promotion Slider */}
            <PromotionSlider
                promotions={promotions} // Usa los datos centralizados
                onPress={(promo) => navigation.navigate(promo.screen)} // Navega a la pantalla especificada
            />

            {/* Línea de Refuerzo */}
            <View style={styles.reinforcementContainer}>
                <Text style={styles.reinforcementTitle}>Línea de refuerzo</Text>
                {['Cultura general', 'Cultura general', 'Cultura general'].map((item, index) => (
                    <View style={styles.reinforcementItem} key={index}>
                        <View style={styles.reinforcementLabel}>
                            {index === 0 && <View style={styles.activeIndicator} />}
                            <Text style={styles.reinforcementText}>{item}</Text>
                        </View>
                        <View style={styles.percentageContainer}>
                            <Text style={styles.reinforcementPercentage}>
                                {index === 0 ? '76%' : index === 1 ? '50%' : '20%'}
                            </Text>
                            <View
                                style={[
                                    styles.percentageCircle,
                                    { backgroundColor: index === 0 ? '#4CAF50' : index === 1 ? '#FFC107' : '#E91E63' },
                                ]}
                            />
                        </View>
                    </View>
                ))}
            </View>

            {/* Floating Menu Bar */}
            <View style={styles.menuContainer}>
                <FloatingMenuBar menuItems={menuItems} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        top: -59,
        width: 70,
        height: 70,
        marginRight: 10,
        left: 95,
    },
    logoText: {
        top: -59,
        fontSize: 18,
        fontWeight: 'bold',
        left: 90,
    },
    profileButton: {
        top: -59,
        right: 0,
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginLeft: 20,
        top: -45,
    },
    reinforcementContainer: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        height: '50%',
        width: '100%',
    },
    reinforcementTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    reinforcementItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    reinforcementLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    activeIndicator: {
        width: 10,
        height: 10,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        marginRight: 10,
    },
    reinforcementText: {
        fontSize: 16,
        color: '#333',
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reinforcementPercentage: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFD700',
        marginRight: 10,
    },
    percentageCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    menuContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
});
