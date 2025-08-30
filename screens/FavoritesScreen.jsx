import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon'; // Fondo
import FloatingMenuBar from '../components/FloatingMenuBar'; // Menú flotante
import TestimonialCard from '../components/TestimonialCard'; // Tarjetas de testimonios
import ProfileButton from '../components/ProfileButton'; // Componente de botón de perfil

const { width } = Dimensions.get('window');

const mockTestimonials = [
    {
        id: 1,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Brayan V',
        userText: 'Nuestra aplicación redefine la comunicación y el entretenimiento a través de una experiencia intuitiva y vibrante. Diseñada con un enfoque centrado en el usuario, combina funcionalidad, creatividad y accesibilidad, permitiendo chatear, compartir momentos visuales y explorar nuevas posibilidades. El reconocimiento recibido destaca nuestra dedicación a la innovación tecnológica y a brindar herramientas que conecten a las personas de manera auténtica.',
    },
    {
        id: 2,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Daniela Pérez',
        userText: 'Me encanta la experiencia que ofrece este juego.',
    },
    {
        id: 3,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Luis Gómez',
        userText: 'Definitivamente lo recomiendo a todos mis amigos.',
    },
    {
        id: 4,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Luis Gómez',
        userText: 'Definitivamente lo recomiendo a todos mis amigos.',
    },
    {
        id: 5,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Luis Gómez',
        userText: 'Definitivamente lo recomiendo a todos mis amigos.',
    },
    {
        id: 6,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Luis Gómez',
        userText: 'Definitivamente lo recomiendo a todos mis amigos.',
    },
    {
        id: 7,
        userImage: require('../assets/Vacaciones.jpg'),
        userName: 'Luis Gómez',
        userText: 'Definitivamente lo recomiendo a todos mis amigos.',
    },
];

const menuItems = [
    { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
    { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
    { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
    { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
    { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
];

export default function TestimoniosScreen({ navigation }) {
    return (
        <View style={styles.container}>
            {/* Fondo */}
            <PuzzleBackground />

            {/* Encabezado fijo */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/historia.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Testimonios</Text>
                </View>
                <ProfileButton
                    imageSource={require('../assets/Vacaciones.jpg')}
                    onPress={() => navigation.navigate('UserProfileScreen')} // Navegar al perfil del usuario
                />
            </View>

            {/* Contenido desplazable */}
            <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {mockTestimonials.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        userImage={testimonial.userImage}
                        userName={testimonial.userName}
                        userText={testimonial.userText}
                        onReadMore={() => console.log('Leer más...')}
                        cardStyle={{ width: width * 0.9 }} // Ajuste de ancho para ocupar el 90% de la pantalla
                    />
                ))}
            </ScrollView>

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
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 49,
        backgroundColor: 'transparent',
        zIndex: 1,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 80,
    },
    logo: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    logoText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espacio para el menú flotante
        marginTop: 10, // Asegura un espacio entre el encabezado y el contenido desplazable
    },
    menuContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
    },
});
