import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function TestimonialCard({ userImage, userName, userText }) {
    const [expanded, setExpanded] = useState(false); // Estado para expandir o contraer la tarjeta

    const handleToggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <View style={[styles.card, expanded && styles.expandedCard]}>
            {/* Foto de perfil */}
            <Image source={userImage} style={styles.profileImage} />

            {/* Contenido del texto */}
            <View style={styles.textContainer}>
                <Text style={styles.userName}>{userName}</Text>
                <Text
                    style={styles.userText}
                    numberOfLines={expanded ? 0 : 3} // Muestra todo el texto si está expandido, de lo contrario limita a 3 líneas
                    ellipsizeMode="tail" // Muestra puntos suspensivos si el texto es muy largo
                >
                    {userText}
                </Text>

                {/* Botón de leer más/ver menos */}
                <TouchableOpacity style={styles.readMoreButton} onPress={handleToggleExpand}>
                    <Text style={styles.readMoreText}>{expanded ? 'Ver menos' : 'Leer más...'}</Text>
                </TouchableOpacity>

                {/* Calificación con estrellas */}
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, index) => (
                        <Image
                            key={index}
                            source={require('../assets/star.png')} // Reemplaza con la imagen de estrella
                            style={styles.starImage}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 0.8,
        elevation: 3,
    },
    expandedCard: {
        // Estilo adicional para cuando la tarjeta está expandida
        minHeight: 150, // Asegura que sea más alta cuando está expandida
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 15,
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 5,
    },
    userText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10,
    },
    readMoreButton: {
        backgroundColor: '#FFD700',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    readMoreText: {
        fontSize: 14,
        color: '#FFF',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    starImage: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
});
