import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import FloatingMenuBar from '../components/FloatingMenuBar';
import BackgroundTop from '../components/BackgroundTop';
import ProfileButton from '../components/ProfileButton';
import { getFormScores } from '../api/forms/get-scores';

const { width } = Dimensions.get('window');

// Componente para manejar imágenes de perfil con fallback
const ProfileImage = ({ source, style, defaultImage }) => {
    const [imageError, setImageError] = useState(false);
    
    const imageSource = imageError || !source?.uri ? defaultImage : source;
    
    return (
        <Image 
            source={imageSource}
            style={style}
            onError={() => setImageError(true)}
        />
    );
};

const mockData = [
    { name: 'Brayan Villegas', time: '00:42:18', image: require('../assets/Vacaciones.jpg') },
    { name: 'Daniela Pérez', time: '00:45:23', image: require('../assets/Vacaciones.jpg') },
    { name: 'Luis Gómez', time: '00:50:12', image: require('../assets/Vacaciones.jpg') },
    { name: 'Andrea Martínez', time: '00:52:45', image: require('../assets/Vacaciones.jpg') },
    { name: 'Carlos López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Ana Montes', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Juan López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Sandra López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Jorge López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Luis Montes', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
    { name: 'Carlos López', time: '00:55:10', image: require('../assets/Vacaciones.jpg') },
];

const menuItems = [
    { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
    { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
    { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
    { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
    { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
];

export default function TopScreen({ navigation, route }) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Obtener formId de los parámetros de navegación o usar uno por defecto
    const formId = route?.params?.formId || 'default-form-id';
    
    useEffect(() => {
        fetchFormScores();
    }, [formId]);
    
    const fetchFormScores = async () => {
        try {
            setLoading(true);
            const response = await getFormScores(formId);
            
            if (response.success) {
                console.log('Datos recibidos del servidor:', response.data);
                
                // Formatear datos del servidor
                const formattedScores = response.data.scores?.map((score, index) => {
                    console.log(`Score ${index}:`, {
                        totalTime: score.totalTime,
                        timeSpent: score.timeSpent,
                        user: score.user?.displayName
                    });
                    
                    return {
                        name: score.user?.displayName || score.user?.username || `Usuario ${index + 1}`,
                        time: formatTime(score.totalTime || score.timeSpent || 0),
                        score: score.score || 0,
                        correctAnswers: score.correctAnswers || score.score || 0,
                        totalTime: score.totalTime || score.timeSpent || 0,
                        image: score.user?.picture ? { uri: score.user.picture } : require('../assets/Vacaciones.jpg'),
                        hasProfilePicture: !!score.user?.picture
                    };
                }) || [];
                
                // Ordenar por aciertos (descendente) y luego por tiempo (ascendente)
                formattedScores.sort((a, b) => {
                    // Primero por cantidad de aciertos (más aciertos = mejor posición)
                    if (b.correctAnswers !== a.correctAnswers) {
                        return b.correctAnswers - a.correctAnswers;
                    }
                    // Si tienen los mismos aciertos, ordenar por tiempo (menor tiempo = mejor posición)
                    return a.totalTime - b.totalTime;
                });
                
                setScores(formattedScores);
            } else {
                setError(response.error);
                // Usar datos mock como fallback
                setScores(mockData);
            }
        } catch (err) {
            console.error('Error fetching scores:', err);
            setError('Error al cargar puntajes');
            setScores(mockData);
        } finally {
            setLoading(false);
        }
    };
    
    const formatTime = (timeValue) => {
        // Manejar diferentes formatos de tiempo del servidor
        if (!timeValue || timeValue === 0) return '00:00:00';
        
        let totalMs = 0;
        
        // Si es un string, podría ser formato HH:MM:SS o timestamp
        if (typeof timeValue === 'string') {
            if (timeValue.includes(':')) {
                return timeValue; // Ya está formateado
            }
            totalMs = parseInt(timeValue);
        } else {
            totalMs = timeValue;
        }
        
        // Convertir a minutos, segundos y centésimas
        const minutes = Math.floor(totalMs / 60000);
        const seconds = Math.floor((totalMs % 60000) / 1000);
        const centiseconds = Math.floor((totalMs % 1000) / 10);
        
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${centiseconds.toString().padStart(2, '0')}`;
    };
    
    const topThree = scores.slice(0, 3);
    const remainingList = scores.slice(3);

    return (
        <View style={styles.container}>
            {/* Fondo */}
            <BackgroundTop />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Image source={require('../assets/test.png')} style={styles.headerIcon} />
                    <Text style={styles.headerText}>Top</Text>
                </View>
                <ProfileButton
                    onPress={() => navigation.navigate('UserProfileScreen')}
                    style={styles.profileButton}
                />
            </View>

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#4CAF50" />
                    <Text style={styles.loadingText}>Cargando puntajes...</Text>
                </View>
            ) : (
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Podio */}
                <View style={styles.podiumContainer}>
                    <View style={styles.secondPlace}>
                        <ProfileImage 
                            source={topThree[1].image} 
                            style={styles.podiumImage}
                            defaultImage={require('../assets/Vacaciones.jpg')}
                        />
                        <Text style={styles.podiumName}>{topThree[1].name}</Text>
                        <Image source={require('../assets/2.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[1].correctAnswers} aciertos</Text>
                        <Text style={styles.positionSubTime}>{topThree[1].time}</Text>
                    </View>
                    <View style={styles.firstPlace}>
                        <ProfileImage 
                            source={topThree[0].image} 
                            style={styles.podiumImage}
                            defaultImage={require('../assets/Vacaciones.jpg')}
                        />
                        <Text style={styles.podiumName}>{topThree[0].name}</Text>
                        <Image source={require('../assets/trofeo.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[0].correctAnswers} aciertos</Text>
                        <Text style={styles.positionSubTime}>{topThree[0].time}</Text>
                    </View>
                    <View style={styles.thirdPlace}>
                        <ProfileImage 
                            source={topThree[2].image} 
                            style={styles.podiumImage}
                            defaultImage={require('../assets/Vacaciones.jpg')}
                        />
                        <Text style={styles.podiumName}>{topThree[2].name}</Text>
                        <Image source={require('../assets/3.png')} style={styles.podiumTrophy} />
                        <Text style={styles.positionTime}>{topThree[2].correctAnswers} aciertos</Text>
                        <Text style={styles.positionSubTime}>{topThree[2].time}</Text>
                    </View>
                </View>

                {/* Lista de posiciones restantes */}
                <View style={styles.listContainer}>
                    {remainingList.map((item, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.listPosition}>{index + 4}</Text>
                            <ProfileImage 
                                source={item.image} 
                                style={styles.listImage}
                                defaultImage={require('../assets/Vacaciones.jpg')}
                            />
                            <View style={styles.listTextContainer}>
                                <Text style={styles.listText}>{item.name}</Text>
                                <Text style={styles.listScore}>{item.correctAnswers} aciertos</Text>
                            </View>
                            <Text style={styles.listTime}>{item.time}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>
            )}

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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        top: 17,
        marginLeft: 95,
    },
    headerIcon: {
        width: 70,
        height: 70,
        marginRight: 10,
    },
    headerText: {
        fontSize: 24,
        color: '#000',
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    podiumContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginVertical: 20,
    },
    firstPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 320,
        marginHorizontal: 5,
        backgroundColor: '#FFD700',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    secondPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 250,
        marginHorizontal: 5,
        backgroundColor: '#C0C0C0',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    thirdPlace: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: width * 0.26,
        height: 220,
        marginHorizontal: 5,
        backgroundColor: '#CD7F32',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
    },
    podiumTrophy: {
        width: 50,
        height: 50,
        marginTop: 10,
    },
    podiumImage: {
        width: 80,
        height: 80,
        marginTop: 10,
        borderRadius: 40,
        marginBottom: 10,
    },
    podiumName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFF',
    },
    positionTime: {
        fontSize: 12,
        color: '#FFF',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: 25,
    },
    positionSubTime: {
        fontSize: 10,
        color: '#FFF',
        position: 'absolute',
        bottom: 10,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    listPosition: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 10,
    },
    listImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    listTextContainer: {
        flex: 1,
    },
    listText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    listScore: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '600',
    },
    listTime: {
        fontSize: 14,
        color: '#666',
    },
    menuContainer: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
    },
    profileButton: {
        top: 25,
        right: -10,
        width: 50,
        height: 50,
        borderRadius: 30,
        marginLeft: 50,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 100,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
});
