import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, ActivityIndicator, RefreshControl } from 'react-native';
import PuzzleBackground from '../components/BackgroundSecon'; // Fondo
import FloatingMenuBar from '../components/FloatingMenuBar'; // Menú flotante
import ExpandableCommentCard from '../components/ExpandableCommentCard'; // Tarjetas de comentarios expandibles
import ProfileButton from '../components/ProfileButton'; // Componente de botón de perfil
import { useAllComments } from '../hooks/useAllComments'; // Hook para obtener comentarios

const { width } = Dimensions.get('window');

const menuItems = [
    { screen: 'Ideas', icon: require('../assets/test.png'), iconType: 'image', color: '#4CAF50' },
    { screen: 'Messages', icon: require('../assets/chat.png'), iconType: 'image', color: '#FFC107' },
    { screen: 'Home', icon: require('../assets/home.png'), iconType: 'image', color: '#03A9F4' },
    { screen: 'Brain', icon: require('../assets/gym.png'), iconType: 'image', color: '#9C27B0' },
    { screen: 'Favorites', icon: require('../assets/historia.png'), iconType: 'image', color: '#E91E63' },
];

export default function FavoritesScreen({ navigation }) {
    const { 
        comments, 
        loading, 
        refreshing, 
        error, 
        refresh, 
        retry 
    } = useAllComments({ maxCommentsPerForm: 10, maxForms: 20 });

    const renderCommentItem = ({ item }) => (
        <ExpandableCommentCard
            comment={item}
            style={{ width: width * 0.9 }}
        />
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Image source={require('../assets/historia.png')} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>Aún no hay comentarios</Text>
            <Text style={styles.emptySubtitle}>
                Los comentarios de las trivias aparecerán aquí
            </Text>
        </View>
    );

    const renderLoadingState = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
            <Text style={styles.loadingText}>Cargando comentarios...</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Fondo */}
            <PuzzleBackground />

            {/* Encabezado fijo */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/historia.png')} style={styles.logo} />
                    <Text style={styles.logoText}>Comentarios</Text>
                </View>
                <ProfileButton
                    imageSource={require('../assets/Vacaciones.jpg')}
                    onPress={() => navigation.navigate('UserProfileScreen')}
                />
            </View>

            {/* Lista de comentarios */}
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={(item, index) => `${item.formId}-${item.id || index}`}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refresh}
                        colors={['#4CAF50']}
                        tintColor="#4CAF50"
                    />
                }
                ListEmptyComponent={
                    loading ? renderLoadingState() : renderEmptyState()
                }
            />

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
        marginTop: -345,
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
    listContainer: {
        paddingHorizontal: 20,
        paddingBottom: 100, // Espacio para el menú flotante
        paddingTop: 100, // Espacio desde el header
        alignItems: 'center', // Centrar las tarjetas
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyIcon: {
        width: 64,
        height: 64,
        opacity: 0.5,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 40,
        lineHeight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    menuContainer: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
    },
});
