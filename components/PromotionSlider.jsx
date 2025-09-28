import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { getAllForms } from '../api/forms/get-all';

const { width } = Dimensions.get('window');

export default function PromotionSlider({ onPress }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPromotions();
    }, []);

    useEffect(() => {
        if (promotions.length > 0) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % promotions.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [promotions.length]);

    const formatDateRange = (startDate, endDate) => {
        const formatDate = (date) => {
            if (!date) return null;
            return new Date(date).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };
        
        const start = formatDate(startDate);
        const end = formatDate(endDate);
        
        if (start && end) {
            return `Válido del ${start} al ${end}`;
        } else if (end) {
            return `Válido hasta ${end}`;
        } else if (start) {
            return `Disponible desde ${start}`;
        }
        return 'Disponible ahora';
    };

    const fetchPromotions = async () => {
        try {
            const response = await getAllForms({ limit: 10 });
            if (response.success && response.data?.forms) {
                const now = new Date();
                
                // Filtrar formularios activos
                const activeForms = response.data.forms.filter(form => {
                    const startDate = form.startDate ? new Date(form.startDate) : null;
                    const endDate = form.expirationDate ? new Date(form.expirationDate) : (form.endDate ? new Date(form.endDate) : null);
                    
                    // Si hay fecha de inicio, debe haber comenzado
                    if (startDate && now < startDate) return false;
                    
                    // Si hay fecha de fin, no debe haber expirado
                    if (endDate && now > endDate) return false;
                    
                    return true;
                });
                
                const formattedPromotions = activeForms.map(form => ({
                    id: form.id,
                    text: form.title || 'Participa en esta trivia',
                    image: require('../assets/test.png'),
                    validity: formatDateRange(form.startDate, form.expirationDate || form.endDate),
                    formData: form
                }));
                setPromotions(formattedPromotions);
            }
        } catch (error) {
            console.error('Error fetching promotions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>Cargando promociones...</Text>
            </View>
        );
    }

    if (promotions.length === 0) {
        return (
            <View style={[styles.container, styles.emptyContainer]}>
                <Text style={styles.emptyText}>No hay promociones disponibles</Text>
            </View>
        );
    }

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
                    onPress={() => onPress && onPress(promo)} // Llama al onPress con la promoción actual
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
    loadingContainer: {
        justifyContent: 'center',
        height: 200,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    emptyContainer: {
        justifyContent: 'center',
        height: 200,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
});
