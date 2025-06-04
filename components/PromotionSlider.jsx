import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function PromotionSlider({ promotions, onPress }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
        }, 3000); // Cambia cada 3 segundos
        return () => clearInterval(interval);
    }, [promotions.length]);

    return (
        <View style={styles.container}>
            {/* Renderizar tarjetas promocionales */}
            {promotions.map((promo, index) => (
                <TouchableOpacity
                    key={promo.id}
                    style={[
                        styles.card,
                        { display: index === currentIndex ? 'flex' : 'none' }, // Muestra solo la tarjeta actual
                    ]}
                    onPress={() => onPress(promo)} // Llama al onPress con la promoción actual
                >
                    <View style={styles.cardContent}>
                        <Text style={styles.text}>{promo.text}</Text>
                        <Image source={promo.image} style={styles.image} />
                    </View>
                    <Text style={styles.validity}>{promo.validity}</Text>
                </TouchableOpacity>
            ))}

            {/* Indicador de paginación */}
            <View style={styles.pagination}>
                {promotions.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            currentIndex === index && styles.activeDot,
                        ]}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 20,
    },
    card: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        elevation: 5,
        width: width * 0.9,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 16,
        color: '#333',
        flex: 1,
        marginRight: 10,
        fontWeight: 'bold',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 10,
    },
    validity: {
        fontSize: 12,
        color: '#888',
        marginTop: 1,
        marginBottom: -8,
        alignSelf: 'flex-start',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        backgroundColor: '#CCC',
        borderRadius: 4,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: '#FFD700',
    },
});
